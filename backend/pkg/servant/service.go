package servant

import (
	"bufio"
	"context"
	"database/sql"
	"encoding/csv"
	"github.com/PuerkitoBio/goquery"
	"github.com/chromedp/chromedp"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/email"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"io"
	"log"
	"mime/multipart"
	"strconv"
	"strings"
	"sync"
)

type Service interface {
	ImportarCsvServidores() error
}

type ServantService struct {
	servantRepo ServantRepository
	userService *user.UserService
}

const notifySalary = 20000.00

func (s *ServantService) createImportCsvWorker(id int, names <-chan string, results chan <- Servant, wg *sync.WaitGroup) {
	for name := range names {
		servants, err := getClientInformations(name)
		if err != nil {
			log.Fatal(err)
			return
		}
		for _, servant := range servants {
			results <- servant
		}
		wg.Done()
	}
}

func (s *ServantService) ImportarCsvServidores (file multipart.File) error {

	jobs := make(chan string, 5)
	servants := make(chan Servant, 20000)
	var wg sync.WaitGroup

	for w := 1; w <= 10; w++ {
		go s.createImportCsvWorker(w, jobs, servants, &wg)
	}

	reader := csv.NewReader(bufio.NewReader(file))
	for {
		line, err := reader.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			return err
		}

		servantName := line[0]
		jobs <- servantName
		wg.Add(1)
	}

	wg.Wait()
	close(jobs)
	close(servants)
	for servant := range servants {

		err := s.servantRepo.InsertServant(servant)
		if err != nil {
			return err
		}
	}

	err := s.sendNotifications(notifySalary)
	if err != nil {
		return err
	}

	return nil
}

func getClientInformations(name string) ([]Servant, error) {

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

	emails, err := s.userService.FindUserToAlert()
	if err != nil {
		return err
	}

	if len(emails) == 0 {
		return nil
	}

	err = email.SendEmail(emails)
	if err != nil {
		return err
	}

	for _, servant := range servants {
		err = s.servantRepo.UpdateSendAlert(servant)
		if err != nil {
			return err
		}
	}

	return nil

}

func NewServantService(repo ServantRepository, userService *user.UserService) *ServantService{
	return &ServantService{
		servantRepo: repo,
		userService: userService,
	}
}
