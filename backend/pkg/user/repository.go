package user

type Repository interface {
	FindByUsername(email string) (*User, error)
	Save(usuario *User) error
	Update(usuario *User) error
	FindUserToAlert() ([]string, error)
}
