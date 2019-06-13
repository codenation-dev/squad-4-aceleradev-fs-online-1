package user

import "database/sql"

type SqliteRepo struct {
	db *sql.DB
}

func (r *SqliteRepo) FindByUsername(username string) (*User, error) {
	sqlUser := "SELECT username, password, email FROM user WHERE username=$1"

	user := User{}
	rows := r.db.QueryRow(sqlUser, username)
	err := rows.Scan(&user.Username, &user.Password, &user.Email)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *SqliteRepo) Save(usuario *User) error {
	sqlUser := "INSERT INTO user (username, password, email, nome, receivealert) VALUES ($1, $2, $3, $4, $5)"

	statement, err := r.db.Prepare(sqlUser)
	if err != nil {
		return err
	}

	_, err = statement.Exec(usuario.Username, usuario.Password, usuario.Email, usuario.Nome, usuario.ReceiveAlert)
	if err != nil {
		return err
	}

	return nil
}

func (r *SqliteRepo) Update(usuario *User) error {
	sqlUser := "UPDATE user set username = $1, password = $2, email = $3, nome = $4 WHERE id  = $5)"
	_, err := r.db.Exec(sqlUser, usuario.Username, usuario.Password, usuario.Password, usuario.Nome, usuario.Id)
	if err != nil {
		return err
	}

	return nil
}

func NewSqliteRepo(db *sql.DB) *SqliteRepo {
	return &SqliteRepo{
		db: db,
	}
}






