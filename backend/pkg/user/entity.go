package user

import "github.com/dgrijalva/jwt-go"

type User struct {
	Id string `json:"id" bson:"_id"`
	Username string `json:"username"`
	Nome  string `json:"nome"`
	Email string `json:"email"`
	Password string `json:"password"`
	ReceiveAlert int `json:"receive_alert"`
	IsAdmin int `json:"is_admin"`
}

type Credentials struct {
	Email string `json:"email"`
	Password string `json:"password"`
}


type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}


type LoginResponse struct {
	Username 	string `json:"username"`
	Jwt 		string `json:"token"`
	Name 	string `json:"name"`
}
