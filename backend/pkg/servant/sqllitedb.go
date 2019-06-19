package servant

import (
	"database/sql"
)

type ServantSqliteRepo struct {
	db *sql.DB
}

func NewServantSqliteRepo(db *sql.DB) *ServantSqliteRepo {
	return &ServantSqliteRepo{
		db: db,
	}
}

func (r *ServantSqliteRepo) InsertServant(servant Servant) error {
		sqlServant := "INSERT INTO servant (nome, cargo, orgao, salario, sentalert) VALUES ($1, $2, $3, $4, 0) ON CONFLICT (nome, cargo, orgao) DO UPDATE SET salario = $5, sentalert = 0"

		statement, err := r.db.Prepare(sqlServant)
		if err != nil {
			return err
		}
		defer statement.Close()

		_, err = statement.Exec(servant.Nome, servant.Cargo, servant.Orgao, servant.Salario, servant.Salario)
		if err != nil {
			return err
		}
	return nil
}

func (r *ServantSqliteRepo) IsServantExists(servant Servant) (bool, error) {
	sqlStatement := "SELECT * FROM servant WHERE nome = $1 AND cargo = $2 AND orgao = $3"

	statement, err := r.db.Prepare(sqlStatement)
	if err != nil {
		return  false, err
	}
	defer statement.Close()

	rows, err := statement.Query(&servant.Nome, &servant.Cargo, &servant.Orgao)
	if err != nil {
		return  false, err
	}

	if rows.Next() {
		return true, nil
	}

	return false, nil
}

func (r *ServantSqliteRepo) FindServantBySalary(salary float64) ([]Servant, error) {
	sqlStatement := "SELECT nome, cargo, orgao, salario FROM servant WHERE salario > $1 AND sentalert = 0"

	statement, err := r.db.Prepare(sqlStatement)
	if err != nil {
		return  nil, err
	}
	defer statement.Close()

	rows, err := statement.Query(salary)
	if err != nil {
		return nil,  err
	}

	servants := make([]Servant, 0)
	for rows.Next() {
		servant := Servant{}
		err = rows.Scan(&servant.Nome, &servant.Cargo, &servant.Orgao, &servant.Salario)
		if err != nil {
			return nil,  err
		}
		servants = append(servants, servant)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return servants, nil
}

func (r *ServantSqliteRepo) UpdateSendAlert(servant Servant) error{
	sqlStatement := "UPDATE servant set sentalert = 1 WHERE nome = $1 AND cargo = $2 AND orgao = $3"

	statement, err := r.db.Prepare(sqlStatement)
	if err != nil {
		return err
	}
	defer statement.Close()

	_, err = statement.Exec(servant.Nome, servant.Cargo, servant.Orgao)
	if err != nil {
		return err
	}

	return nil
}


func (r *ServantSqliteRepo) UpdateServant(servant Servant) error{
	sqlStatement := "UPDATE servant set sentalert = 0, nome = $1, cargo = $2, orgao = $3 WHERE nome = $4 AND cargo = $5 AND orgao = $6"

	statement, err := r.db.Prepare(sqlStatement)
	if err != nil {
		return err
	}
	defer statement.Close()

	_, err = statement.Exec(servant.Nome, servant.Cargo, servant.Orgao, servant.Nome, servant.Cargo, servant.Orgao)
	if err != nil {
		return err
	}

	return nil
}