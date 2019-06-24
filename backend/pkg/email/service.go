package email

import (
	"fmt"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/config/env"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/messages"
	"log"
	"net/smtp"
	"strings"
)

func SendEmail(receivers []string, clients []string) error {
	from := env.AppEmailSender()
	pass := env.AppEmailPassword()

	body := fmt.Sprintf("Bom dia, \n Detectamos %s como potenciais clientes.", strings.Join(clients, ", "))

	to := strings.Join(receivers, ", ")
	Subject := messages.EmailSubjet

	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: " + Subject + "\n\n" +
		body

	smtpUrl := env.AppEmailSmtpUrl() + ":" + env.AppEmailSmtpPort()
	err := smtp.SendMail(smtpUrl,
		smtp.PlainAuth("", from, pass, env.AppEmailSmtpUrl()),
		from, receivers, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return err
	}

	return nil
}