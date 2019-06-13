package client

import (
	"context"
	"fmt"
	"github.com/chromedp/chromedp"
)

func GetClientInformations(clientName string) (string, error) {

	ctx, cancel := chromedp.NewContext(context.Background())

	defer cancel()

	// run task list
	var cargo string
	var nome string
	var salario string
	var orgao string

	err := chromedp.Run(ctx,
		chromedp.Navigate("http://www.transparencia.sp.gov.br/PortalTransparencia-Report/Remuneracao.aspx"),
		chromedp.WaitVisible("#txtNome"),
		chromedp.SendKeys("#txtNome", clientName),
		chromedp.Click("#btnExibirRelatorio"),
		chromedp.WaitVisible("#grid"),
		chromedp.Text("#grid > tbody > tr:nth-child(2) > td:nth-child(1)", &nome),
		chromedp.Text("#grid > tbody > tr:nth-child(2) > td:nth-child(2)", &orgao),
		chromedp.Text("#grid > tbody > tr:nth-child(2) > td:nth-child(3)", &cargo),
		chromedp.Text("#grid > tbody > tr:nth-child(2) > td:nth-child(4)", &salario),


	)

	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Printf("Nome: %s \n", nome)
	fmt.Printf("Orgao: %s \n", orgao)
	fmt.Printf("Cargo: %s \n", cargo)
	fmt.Printf("Salario do Mês: %s \n", salario)
}
