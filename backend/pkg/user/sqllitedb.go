package user

import (
	"database/sql"
)

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

func (r *SqliteRepo) FindByEmail(email string) (*User, error) {
	sqlUser := "SELECT username, password, email, nome FROM user WHERE email=$1"

	user := User{}
	rows := r.db.QueryRow(sqlUser, email)
	err := rows.Scan(&user.Username, &user.Password, &user.Email, &user.Nome)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *SqliteRepo) Save(usuario *User) error {
	sqlUser := "INSERT INTO user (username, password, email, nome, receivealert, isAdmin) VALUES ($1, $2, $3, $4, $5, $6)"

	statement, err := r.db.Prepare(sqlUser)
	if err != nil {
		return err
	}

	_, err = statement.Exec(usuario.Username, usuario.Password, usuario.Email, usuario.Nome, 1, 0)
	if err != nil {
		return err
	}

	return nil
}

func (r *SqliteRepo) Update(usuario *User) error {
	sqlUser := "UPDATE user set username = $1, password = $2, email = $3, nome = $4 WHERE id  = $5"
	_, err := r.db.Exec(sqlUser, usuario.Username, usuario.Password, usuario.Password, usuario.Nome, usuario.Id)
	if err != nil {
		return err
	}

	return nil
}

func (r *SqliteRepo) UpdateReceiveAlert(receiveAlert int, username string) error {
	sqlUser := "UPDATE user set receivealert = $1 WHERE username = $2"

	_, err := r.db.Exec(sqlUser, receiveAlert, username)
	if err != nil {
		return err
	}

	return nil
}

func (r *SqliteRepo) FindUserToAlert() ([]User, error) {
	sqlUser := "SELECT username, email FROM user WHERE receivealert= 1"

	users := make([]User, 0)
	rows, err := r.db.Query(sqlUser)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var  user User
		err := rows.Scan(&user.Nome, &user.Email)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *SqliteRepo) FindUser(user User) ([]User, error) {
	sqlUser := "SELECT id, username, email, nome, receivealert FROM user WHERE 1 = 1 "

	if user.Nome != "" {
		sqlUser += " AND nome =  " + "'" + user.Nome + "'"
	}

	if user.Email != "" {
		sqlUser += " AND email = " +  "'" + user.Email + "'"
	}

	if user.Username != "" {
		sqlUser += " AND username =  " + "'" + user.Username + "'"
	}

	if user.ReceiveAlert == 1 {
		sqlUser += " AND receivealert = 1"
	}

	sqlUser += " ORDER BY nome ASC"

	statement, err := r.db.Prepare(sqlUser)
	if err != nil {
		return  nil, err
	}
	defer statement.Close()

	rows, err := r.db.Query(sqlUser)
	if err != nil {
		return  nil, err
	}

	users := make([]User, 0)
	for rows.Next() {
		var  user User
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &user.Nome, &user.ReceiveAlert)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return users, nil

}

func NewSqliteRepo(db *sql.DB) *SqliteRepo {
	return &SqliteRepo{
		db: db,
	}
}






