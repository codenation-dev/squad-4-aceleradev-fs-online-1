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
	Username string `json:"username"`
	Password string `json:"password"`
}


type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}