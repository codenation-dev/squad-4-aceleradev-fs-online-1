package test

import (
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/email"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestSendEmail(t *testing.T) {
	err := email.SendEmail([]string{"rkorpalski@gmail.com"})
	assert.NoError(t, err)
}