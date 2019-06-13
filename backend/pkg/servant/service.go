package servant

import (
	"bufio"
	"encoding/csv"
	"io"
	"log"
	"os"
)

type Service interface {
	ImportarCsvServidores () error
}

type ServantService struct {
	servantRepo ServantRepository
}

func (s *ServantService) ImportarCsvServidores () error {
	csvFile, err := os.Open("/home/rodrigo/Documentos/remuneracao.txt")
	if err != nil {
		log.Fatal(err)
	}

	reader := csv.NewReader(bufio.NewReader(csvFile))
	for {
		line, err := reader.Read()
		if err != nil {
			if err == io.EOF {
				break
			}
			return err
		}

		newServant := Servant{
			Nome: 	 line[0],
			Cargo: 	 line[1],
			Orgao: 	 line[2],
			Salario: line[3],
		}

		err = s.servantRepo.InsertServant(newServant)
		if err != nil{
			return err
		}
	}

	return nil
}

func NewServantService(repo ServantRepository) *ServantService{
	return &ServantService{
		servantRepo: repo,
	}
}
