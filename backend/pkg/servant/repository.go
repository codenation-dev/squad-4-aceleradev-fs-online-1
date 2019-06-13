package servant

type ServantRepository interface {
	InsertServant(servant Servant) error
}
