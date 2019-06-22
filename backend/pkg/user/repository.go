package user

type Repository interface {
	FindByUsername(email string) (*User, error)
	Save(usuario *User) error
	Update(usuario *User) error
	FindUserToAlert() ([]User, error)
	FindUser(user User) ([]User, error)
	FindByEmail(email string) (*User, error)
	UpdateReceiveAlert(receiveAlert int, username string) error
}
