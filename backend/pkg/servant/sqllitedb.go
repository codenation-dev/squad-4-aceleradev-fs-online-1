package servant

import "database/sql"

type ServantSqliteRepo struct {
	db *sql.DB
}

func NewServantSqliteRepo(db *sql.DB) *ServantSqliteRepo {
	return &ServantSqliteRepo{
		db: db,
	}
}

func (r *ServantSqliteRepo) InsertServant(servant Servant) error {
	sqlServant := "INSERT INTO servant (nome, cargo, orgao, salario) VALUES ($1, $2, $3, $4, $5)"

	statement, err := r.db.Prepare(sqlServant)
	if err != nil {
		return err
	}

	_, err = statement.Exec(servant.Nome, servant.Cargo, servant.Orgao, servant.Salario)
	if err != nil {
		return err
	}

	return nil
}
