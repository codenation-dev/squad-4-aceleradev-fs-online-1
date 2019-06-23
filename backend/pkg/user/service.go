package user

import (
	"database/sql"
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/messages"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/util"
	"regexp"
	"time"
	"unicode"
)

var JwtKey = []byte("banco-uati")

type Service interface {
	SignIn(credentials Credentials) (*LoginResponse, error)
	ValidateUsername(username string) error
	SaveUser(*User) error
	FindUserToAlert() ([]User, error)
	FindUser(user User) ([]User, error)
	UpdateReceiveAlert(users []User) error
}

type UserService struct {
	UserRepo Repository
}

func (s *UserService) SignIn(credentials Credentials) (*LoginResponse, error) {
	user, err := s.UserRepo.FindByEmail(credentials.Email)
	if err != nil {
		if err.Error() == sql.ErrNoRows.Error() {
			return nil, errors.New("Not authorized")
		}
		return nil, err
	}

	encryptPassword := util.EncriptToSha1([]byte(credentials.Password))

	if encryptPassword != user.Password {
		return nil, errors.New("Not authorized")
	}

	expirationTime := time.Now().Add(1 * time.Hour)

	claims := &Claims{
		Username: user.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		return nil, err
	}

	response := &LoginResponse{Username: user.Username, Jwt: tokenString, Name: user.Nome}
	return response, nil
}

func (s *UserService) SaveUser(usuario *User) error {
	err := s.ValidateUsername(usuario.Username)
	if err != nil {
		return err
	}

	err = ValidateEmail(usuario.Email)
	if err != nil {
		return err
	}

	err = ValidatePassword(usuario.Password)
	if err != nil {
		return err
	}

	usuario.Password = util.EncriptToSha1([]byte(usuario.Password))

	err = s.UserRepo.Save(usuario)
	if err != nil {
		return err
	}

	return nil
}

func (s *UserService) ValidateUsername(username string) error {
	user, _ := s.UserRepo.FindByUsername(username)
	if user != nil {
		return errors.New("This username already exists")
	}

	return nil
}

func ValidateEmail(email string) error {
	emailRegex := "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
	r, err := regexp.Compile(emailRegex)
	if err != nil {
		return err
	}
	match := r.MatchString(email)
	if !match {
		return errors.New(messages.ErrInvalidEmail)
	}
	return nil
}
func ValidatePassword(password string) error {
	if len(password) < 6 {
		return errors.New(messages.ErrInvalidPassword)
	}
	var num, upper, spec bool
	for _, r := range password {
		switch {
		case unicode.IsDigit(r):
			num = true
		case unicode.IsUpper(r):
			upper = true
		case unicode.IsSymbol(r), unicode.IsPunct(r):
			spec = true
		}
	}
	if num && upper && spec {
		return nil
	}
	return errors.New(messages.ErrInvalidPassword)
}

func (s *UserService) FindUserToAlert() ([]User, error) {
	return s.UserRepo.FindUserToAlert()
}

func (s *UserService) FindUser(user User) ([]User, error) {
	return s.UserRepo.FindUser(user)
}

func (s *UserService) UpdateReceiveAlert(users []User) error {
	for _, user := range users {
		err := s.UserRepo.UpdateReceiveAlert(user.ReceiveAlert, user.Username)
		if err != nil {
			return err
		}
	}
	return nil
}


func NewUserService(repo Repository) *UserService{
	return &UserService{
		UserRepo: repo,
	}
}

