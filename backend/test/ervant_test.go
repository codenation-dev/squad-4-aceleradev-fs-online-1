package test

import (
	"database/sql"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/servant"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/test/mocks"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestInsertServant(t *testing.T) {
	servantMock := servant.Servant{Nome: "Alberto Santos", Salario: 250000, Cargo: "Administrador", Orgao: "ADM"}

	dbMock := mocks.ServantRepository{}
	dbMock.On("InsertServant", servantMock).Return(nil)

	err := dbMock.InsertServant(servantMock)

	assert.NoError(t, err)

	servantMock2 := servant.Servant{Nome: "Paola Costa", Salario: 10000, Cargo: "Professora", Orgao: "EST"}
	dbMock.On("InsertServant", servantMock2).Return(sql.ErrNoRows)
	err = dbMock.InsertServant(servantMock2)

	assert.Errorf(t, err, sql.ErrNoRows.Error())

}

func TestInsertClient(t *testing.T) {
	servantMock := servant.Servant{Nome: "Alberto Santos", Salario: 250000, Cargo: "Administrador", Orgao: "ADM"}

	dbMock := mocks.ServantRepository{}
	dbMock.On("InsertServant", servantMock).Return(nil)

	err := dbMock.InsertServant(servantMock)

	assert.NoError(t, err)

	servantMock2 := servant.Servant{Nome: "Paola Costa", Salario: 10000, Cargo: "Professora", Orgao: "EST"}
	dbMock.On("InsertServant", servantMock2).Return(sql.ErrNoRows)
	err = dbMock.InsertServant(servantMock2)

	assert.Errorf(t, err, sql.ErrNoRows.Error())

}