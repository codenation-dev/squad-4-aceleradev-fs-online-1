package servant

type Servant struct {
	Nome string
	Cargo string
	Orgao string
	Salario float64
}

type Client struct{
	Nome string
	isPotentialClient int
}

type GroupServantSalary struct {
	Count int
	Salary float64
}

type SalaryChartResponse struct {
	Faixa string  `json:"faixa"`
	Count int	  `json:"count"` 	
}