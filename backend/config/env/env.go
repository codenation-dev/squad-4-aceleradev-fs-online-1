package env

import (
	"os"
	"strconv"
	"strings"
)

var properties = []*Property{
	{Key:"SQLITE_FILE_PATH", FallBackValue:"./sqlite.db"},
	{Key:"APP_BASE_URL", FallBackValue:"127.0.0.1:8080"},
	{Key:"APP_EMAIL_SENDER", FallBackValue:"codenation.squad3@gmail.com"},
	{Key:"APP_EMAIL_PASSWORD", FallBackValue:"a142536*"},
	{Key:"APP_EMAIL_PASSWORD", FallBackValue:"a142536*"},
	{Key:"APP_EMAIL_SMTP_URL", FallBackValue:"smtp.gmail.com"},
	{Key:"APP_EMAIL_SMTP_PORT", FallBackValue:"587"},
}

type Property struct {
	Key 			string
	FallBackValue 	string
}

type Properties struct {
	Properties []*Property
}

func envProperties() *Properties {
	objProperties := &Properties{}
	objProperties.Properties = properties
	return objProperties
}

func (e *Properties) getProperty(env string) *Property {
	for _, property := range properties {
		if strings.ToUpper(property.Key) == strings.ToUpper(env) {
			return property
		}
	}
	return nil
}

func (e *Properties) envInt(env string) int  {
	b, _ := strconv.Atoi(e.envString(env))
	return b
}

func (e * Properties) envString(env string) string {
	property := e.getProperty(env)
	if property != nil {
		value := os.Getenv(env)
		if value == "" {
			return property.FallBackValue
		}
		return value
	}
	return ""
}

func SqlLitePathUrl() string {
	return envProperties().envString("SQLITE_FILE_PATH")
}

func AppBaseUrl() string {
	return envProperties().envString("APP_BASE_URL")
}

func AppEmailSender() string {
	return envProperties().envString("APP_EMAIL_SENDER")
}

func AppEmailPassword() string {
	return envProperties().envString("APP_EMAIL_PASSWORD")
}

func AppEmailSmtpUrl() string {
	return envProperties().envString("APP_EMAIL_SMTP_URL")
}

func AppEmailSmtpPort() string {
	return envProperties().envString("APP_EMAIL_SMTP_PORT")
}


