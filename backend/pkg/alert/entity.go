package alert

type Alert struct {
	Id 				string		`json:"id"`
	UserName 		string		`json:"user_name"`
	UserEmail 		string		`json:"user_email"`
	ClientName 		string		`json:"client_name"`
	ClientSalary 	float64		`json:"client_salary"`
	SendDate 		string		`json:"send_date"`
}
