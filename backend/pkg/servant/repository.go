package servant

type ServantRepository interface {
	InsertServant(servant Servant) error
	FindServantBySalary(salary float64) ([]Servant, error)
	UpdateSendAlert(servant Servant) error
	IsServantExists(servant Servant) (bool, error)
	UpdateServant(servant Servant) error
}
