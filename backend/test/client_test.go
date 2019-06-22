package test

import (
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/servant"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestGetClientInformations(t *testing.T) {
	result, err := servant.GetClientInformations("alfonso")
	t.Log(result)
	assert.NoError(t, err)
}
