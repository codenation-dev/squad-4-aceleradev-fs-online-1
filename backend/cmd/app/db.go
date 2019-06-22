package app

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/config/env"
	"io/ioutil"
	"os"
)

func InitializeDB() (*sql.DB, error){
	db, err := sql.Open("sqlite3", env.SqlLitePathUrl())
	if err != nil{
		return nil, err
	}

	_, err = os.Stat(env.SqlLitePathUrl())
	if os.IsNotExist(err) {
		err = createDataBase(db)
		if err != nil{
			return nil, err
		}
	}

	return db, nil
}

func createDataBase(db *sql.DB) error {
	query, err := ioutil.ReadFile("./app/database.sql")
	if err != nil {
		return err
	}


	_, err = db.Exec(string(query))
	if err != nil {
		return err
	}

	return nil
}
