package servant

type ServantRepository interface {
	InsertServant(servant Servant) error
	FindServantBySalary(salary float64) ([]Servant, error)
	UpdateSendAlert(servant Servant) error
	IsServantExists(servant Servant) (bool, error)
	UpdateServant(servant Servant) error
	InsertClient(client Client) error
	UpdateClient(client string) error
	getPotentialClients() ([]Client, error)
	CountPotentialClients() (int, error)
	CountClients() (int, error)
}
