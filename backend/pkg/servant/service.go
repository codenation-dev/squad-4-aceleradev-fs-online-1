package servant

import (
	"bufio"
	"context"
	"database/sql"
	"encoding/csv"
	"github.com/PuerkitoBio/goquery"
	"github.com/chromedp/chromedp"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/alert"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/email"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"io"
	"log"
	"mime/multipart"
	"strconv"
	"strings"
	"sync"
	"time"
)

type Service interface {
	ImportarCsvServidores() error
	VerifyPotentialClients() error
	CountPotentialClients() (int, error)
	CountClients() (int, error)
	GetSalaryChartData() ([]SalaryChartResponse, error)
}

type ServantService struct {
	servantRepo ServantRepository
	userService *user.UserService
	alertService *alert.AlertService
}

const notifySalary = 20000.00

func (s *ServantService) createImportCsvWorker(id int, names <-chan string, wg *sync.WaitGroup) {
	for name := range names {
		servants, err := GetClientInformations(name)
		if err != nil {
			log.Fatal(err)
			return
		}
		for _, servant := range servants {
			err := s.servantRepo.InsertServant(servant)
			if err != nil {
				log.Fatal(err)
				return
			}
			if servant.Salario >= notifySalary {
				err = s.servantRepo.UpdateClient(servant.Nome)
				if err != nil {
					log.Fatal(err)
					return
				}
			}
		}
		wg.Done()
	}
}

func (s *ServantService) readClientCsv (file multipart.File) ([]Client, error) {
	reader := csv.NewReader(bufio.NewReader(file))
	clients := make([]Client, 0)
	for {
		line, err := reader.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			return nil, err
		}
		client := Client{Nome: line[0], isPotentialClient: 0}
		clients = append(clients, client)
		err = s.servantRepo.InsertClient(client)
		if err != nil {
			return nil, err
		}
	}
	return clients, nil
}

func (s *ServantService) ImportarCsvServidores (file multipart.File) error {
	clients, err := s.readClientCsv(file)
	if err != nil {
		return err
	}

	err = s.doSearchClients(clients)
	if err != nil {
		return err
	}

	return nil
}

func (s *ServantService) VerifyPotentialClients() {
	log.Println("Iniciando a verificação de clientes potenciais")
	clients, err := s.servantRepo.getPotentialClients()
	if err != nil {
		log.Fatal(err)
		return
	}

	err = s.doSearchClients(clients)
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Println("Finalizando a verificação de clientes potenciais")

	return
}

func (s *ServantService) doSearchClients (clients []Client) error {

	jobs := make(chan string, 5)
	var wg sync.WaitGroup

	for w := 1; w <= 5; w++ {
		go s.createImportCsvWorker(w, jobs, &wg)
	}

	for _, client := range clients {
		wg.Add(1)
		jobs <- client.Nome
	}

	wg.Wait()
	close(jobs)

	err := s.sendNotifications(notifySalary)
	if err != nil {
		return err
	}

	return nil
}

func GetClientInformations(name string) ([]Servant, error) {

	Results := make([]Servant, 0)
	var domHtml string

	//for debug add chromedp.WithDebugf(log.Printf) parameter to NewContest method
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	chromeDpTask := chromedp.Tasks{
		chromedp.Navigate("http://www.transparencia.sp.gov.br/PortalTransparencia-Report/Remuneracao.aspx"),
		chromedp.WaitVisible("#txtNome"),
		chromedp.SendKeys("#txtNome", name),
		chromedp.Click("#btnExibirRelatorio"),
		chromedp.WaitVisible("#panel"),
		chromedp.OuterHTML("#panel", &domHtml),
	}

	err := chromedp.Run(ctx, chromeDpTask)
	if err != nil {
		return nil, err
	}

	//Receive the HTML from panel element. This element has the result table
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(domHtml))
	if err != nil {
		return nil, err
	}

	// test if #grid element is present, instead the search has no results
	if doc.Find("#grid").Size() > 0 {

		doc.Find("#grid > tbody > tr").Each(func(i int, selection *goquery.Selection) {

			// For each employee found, get the Name, company, role and salary
			servant := Servant{}
			servant.Nome = selection.Find("td:nth-child(1)").Text()
			servant.Orgao = selection.Find("td:nth-child(2)").Text()
			servant.Cargo = selection.Find("td:nth-child(3)").Text()
			Salario := selection.Find("td:nth-child(4)").Text()

			// Handle salary string to float format. (1.500,00 -> 1500.00)
			Salario = strings.ReplaceAll(Salario, ".", "")
			Salario = strings.ReplaceAll(Salario, ",", ".")

			servant.Salario, _ = strconv.ParseFloat(Salario, 64)

			//the 1st row (header row) has empty fields, so is ignored
			if servant.Nome != "" {
				Results = append(Results, servant)
			}

		})
	}

	return Results, nil

}

func (s *ServantService) sendNotifications(salary float64) error {
	servants, err := s.servantRepo.FindServantBySalary(salary)
	if err != nil {
		if err.Error() == sql.ErrNoRows.Error(){
			return nil
		}
		return err
	}

	if len(servants) == 0 {
		return nil
	}

	users, err := s.userService.FindUserToAlert()
	if err != nil {
		return err
	}

	if len(users) == 0 {
		return nil
	}

	emails := make([]string, 0)
	alerts := make([]alert.Alert, 0)
	clients := make([]string, 0)
	now := time.Now()
	nowString := now.Format("02-01-2006 15:04:05")
	for _, servant := range servants {
		err = s.servantRepo.UpdateSendAlert(servant)
		if err != nil {
			return err
		}
		for _, user := range users {
			emails = append(emails, user.Email)
			alert := alert.Alert{
				UserName: user.Nome,
				UserEmail: user.Email,
				ClientName: servant.Nome,
				ClientSalary: servant.Salario,
				SendDate: nowString,
			}
			alerts = append(alerts, alert)
			clients = append(clients, servant.Nome)
		}
	}

	err = email.SendEmail(emails, clients)
	if err != nil {
		return err
	}

	s.alertService.SaveAlerts(alerts)

	return nil

}

func (s *ServantService) CountPotentialClients() (int, error) {
	return s.servantRepo.CountPotentialClients()
}

func (s *ServantService) CountClients() (int, error) {
	return s.servantRepo.CountClients()
}

func (s *ServantService) GetSalaryChartData() ([]SalaryChartResponse, error) {
	groupsalarys, err := s.servantRepo.GetServantsSalary()
	if err != nil {
		return nil, err
	}

	salaryChartData := make(map[string]int)
	salaryChartData["2500"] = 0
	salaryChartData["5000"] = 0
	salaryChartData["7500"] = 0
	salaryChartData["10000"] = 0
	salaryChartData["12500"] = 0
	salaryChartData["15000"] = 0
	salaryChartData["20000"] = 0
	salaryChartData["20001"] = 0

	for _, gs := range groupsalarys {
		if gs.Salary < 2500 {
			salaryChartData["2500"] = salaryChartData["2500"] + gs.Count
		} else if gs.Salary < 5000 {
			salaryChartData["5000"] = salaryChartData["5000"] + gs.Count
		} else if gs.Salary < 7500 {
			salaryChartData["7500"] = salaryChartData["7500"] + gs.Count
		} else if gs.Salary < 10000 {
			salaryChartData["10000"] = salaryChartData["10000"] + gs.Count
		} else if gs.Salary < 12500 {
			salaryChartData["12500"] = salaryChartData["12500"] + gs.Count
		} else if gs.Salary < 15000 {
			salaryChartData["15000"] = salaryChartData["15000"] + gs.Count
		} else if gs.Salary < 20000 {
			salaryChartData["20000"] = salaryChartData["20000"] + gs.Count
		} else {
			salaryChartData["20001"] = salaryChartData["20001"] + gs.Count
		}
	}

	data := make([]SalaryChartResponse, 0)
	for chave, valor := range salaryChartData {
		d := SalaryChartResponse{Faixa:chave, Count:valor}
		data = append(data, d)
	}

	return data, nil
}

func NewServantService(repo ServantRepository, userService *user.UserService, alertService *alert.AlertService) *ServantService{
	return &ServantService{
		servantRepo: repo,
		userService: userService,
		alertService: alertService,
	}
}
