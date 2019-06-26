package test

import (
	"database/sql"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/messages"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/test/mocks"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestSignIn(t *testing.T) {
	usuarioMock := &user.User{Email:"admin@admin.com", Password: "d42f0e5b5ae41ad2d552008ba647fbff63f66b18"}

	dbMock := mocks.Repository{}
	dbMock.On("FindByEmail", "admin@admin.com").Return(usuarioMock, nil)

	userService := user.NewUserService(&dbMock)
	token, err := userService.SignIn(user.Credentials{Email:"admin@admin.com", Password: "A1234*"})

	assert.NoError(t, err)
	assert.NotNil(t, token)
}

func TestSignInNotAuthorized(t *testing.T) {
	usuarioMock := &user.User{Email:"admin@admin.com", Password: "d42f0e5b5ae41ad2d552008ba647fbff63f66"}

	dbMock := mocks.Repository{}
	dbMock.On("FindByEmail", "admin@admin.com").Return(usuarioMock, nil)

	userService := user.NewUserService(&dbMock)
	token, err := userService.SignIn(user.Credentials{Email:"admin@admin.com", Password: "A1234*"})

	assert.Errorf(t, err, "Not Authorized")
	assert.Empty(t, token)
}

func TestFindUser(t *testing.T) {
	expected := &user.User{Username:"admin", Password: "d42f0e5b5ae41ad2d552008ba647fbff63f66b18"}

	dbMock := mocks.Repository{}
	dbMock.On("FindByUsername", "admin").Return(expected, nil)

	usuario, err := dbMock.FindByUsername("admin")

	assert.NoError(t, err)
	assert.Equal(t, expected, usuario)

	dbMock = mocks.Repository{}
	dbMock.On("FindByUsername", "usuario").Return(nil, sql.ErrNoRows)

	usuario, err = dbMock.FindByUsername("usuario")

	assert.Errorf(t, err, sql.ErrNoRows.Error())
	assert.Nil(t, usuario)
}

func TestValidateUsername(t *testing.T) {
	usuarioMock := &user.User{Username:"admin", Password: "d42f0e5b5ae41ad2d552008ba647fbff63f66b18"}
	dbMock := mocks.Repository{}
	dbMock.On("FindByUsername", "admin").Return(usuarioMock, nil)
	dbMock.On("FindByUsername", "fulano").Return(nil, sql.ErrNoRows)

	userService := user.NewUserService(&dbMock)
	err := userService.ValidateUsername("admin")
	assert.Errorf(t, err, "This username already exists")

	err = userService.ValidateUsername("fulano")
	assert.NoError(t, err)
}

func TestValidatePassword(t *testing.T) {
	validPasswords := []string{"F45214$$", "fagfa5AS*", "152hhhAAA$A"}
	invalidPasswords := []string{"ghgah112*", "AAAA165156aaaa", "AAAnmnmln***", "As1*"}

	for _, password := range validPasswords {
		err := user.ValidatePassword(password)
		assert.NoError(t, err)
	}

	for _, password := range invalidPasswords {
		err := user.ValidatePassword(password)
		assert.Errorf(t, err,messages.ErrInvalidPassword)
	}
}

func TestValidateEmail(t *testing.T) {
	validaEmails := []string{"teste@gmail.com", "teste@hotmail.com.br", "fulano.ciclano@uol.net"}
	invalidaEmails := []string{"testegmail.com", "@uol.net", "fulano", "cilcano@gmail"}

	for _, email := range validaEmails {
		err := user.ValidateEmail(email)
		assert.NoError(t, err)
	}

	for _, email := range invalidaEmails {
		err := user.ValidateEmail(email)
		assert.Errorf(t, err,messages.ErrInvalidEmail)
	}
}

func TestSaveUser(t *testing.T) {
	usuarioMock := &user.User{
		Username:"admin",
		Password: "A555fgfg***",
		Email:"admin@admin.com",
		Nome:"Admin",
		ReceiveAlert: 1,
	}

	dbMock := mocks.Repository{}
	dbMock.On("FindByUsername", usuarioMock.Username).Return(nil, nil)
	dbMock.On("Save", usuarioMock).Return(nil)

	userService := user.NewUserService(&dbMock)
	err := userService.SaveUser(usuarioMock)
	assert.NoError(t, err)
}