package alert

import (
	"database/sql"
	"fmt"
)

type AlertSqliteRepo struct {
	db *sql.DB
}

func NewAlertSqliteRepo(db *sql.DB) *AlertSqliteRepo {
	return &AlertSqliteRepo{
		db: db,
	}
}

func(r *AlertSqliteRepo) SaveAlert(alert Alert) error {
	sqlAlert := "INSERT INTO alert (username, useremail, clientname, clientsalary, sendDate) VALUES ($1, $2, $3, $4, $5)"

	statement, err := r.db.Prepare(sqlAlert)
	if err != nil {
		return err
	}
	defer statement.Close()

	_, err = statement.Exec(alert.UserName, alert.UserEmail, alert.ClientName, alert.ClientSalary, alert.SendDate)
	if err != nil {
		return err
	}
	return nil
}

func (r * AlertSqliteRepo) CountAlerts() (int, error) {
	sqlStatement := "SELECT COUNT(*) FROM alert"

	statement, err := r.db.Prepare(sqlStatement)
	if err != nil {
		return 0, err
	}
	defer statement.Close()

	rows, err := statement.Query()
	if err != nil {
		return 0, err
	}

	var count int
	for rows.Next() {
		err = rows.Scan(&count)
		if err != nil {
			return 0, err
		}
	}

	err = rows.Err()
	if err != nil {
		return 0, err
	}

	return count, nil
}

func (r *AlertSqliteRepo) FindAlerts(alert Alert) ([]Alert, error) {
	sqlStatement := "SELECT id, username, useremail, clientname, clientsalary, sendDate FROM alert WHERE 1 = 1"

	if alert.UserName != "" {
		sqlStatement += " AND username =  " + "'" + alert.UserName + "'"
	}

	if alert.ClientName != "" {
		sqlStatement += " AND clientname = " +  "'" + alert.ClientName + "'"
	}

	if alert.ClientSalary != 0.0 {
		sqlStatement += " AND clientsalary =  " + "'" + fmt.Sprintf("%f", alert.ClientSalary) + "'"
	}

	if alert.SendDate != "" {
		sqlStatement += " AND sendDate = " + "'" + alert.SendDate + "'"
	}

	sqlStatement += " ORDER BY sendDate DESC"

	statement, err := r.db.Prepare(sqlStatement)
	if err != nil {
		return  nil, err
	}
	defer statement.Close()

	rows, err := statement.Query()
	if err != nil {
		return nil,  err
	}

	alerts := make([]Alert, 0)
	for rows.Next() {
		alert := Alert{}
		err = rows.Scan(&alert.Id, &alert.UserName, &alert.UserEmail, &alert.ClientName, &alert.ClientSalary, &alert.SendDate)
		if err != nil {
			return nil,  err
		}
		alerts = append(alerts, alert)
	}

	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return alerts, nil
}
