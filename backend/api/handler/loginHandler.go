package handler

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"net/http"
	"strings"
)

func TokenAuthMIddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if strings.Contains(c.Request.URL.String(), "login") {
			c.Next()
			return
		}
		tokenCookie := c.GetHeader("Authorization")
		if tokenCookie == "" {
			c.JSON(http.StatusUnauthorized, "Not Allowed")
			c.Abort()
			return
		}

		claims := &user.Claims{}

		jwtToken, err := jwt.ParseWithClaims(tokenCookie, claims, func(token *jwt.Token) (interface{}, error) {
			return user.JwtKey, nil
		})

		if !jwtToken.Valid {
			c.JSON(http.StatusUnauthorized, "Not Allowed")
			c.Abort()
			return
		}

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				c.JSON(http.StatusBadRequest, "Not Allowed")
				c.Abort()
				return
			}
			c.JSON(http.StatusBadRequest, "Not Allowed")
			c.Abort()
			return
		}
		c.Next()
	}
}
