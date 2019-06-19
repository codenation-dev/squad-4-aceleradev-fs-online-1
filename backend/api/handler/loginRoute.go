package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"net/http"
)

type LoginRoute struct {
	userService user.Service
}

func (h *LoginRoute) BuildRoutes(router *gin.RouterGroup) {
	group := router.Group("/v1/login")
	{
		group.POST("/signin", h.SignIn)
	}
}

func (h *LoginRoute) SignIn(c *gin.Context) {
	var creds user.Credentials
	if c.ShouldBind(&creds) ==  nil {
		token, err := h.userService.SignIn(creds)
		if err != nil {
			if err.Error() == "Not authorized" {
				c.JSON(http.StatusUnauthorized, "Not authorized")
				return
			}
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		c.JSON(http.StatusOK, gin.H{"jwt": token})
	}
}

func NewLoginRoute(userService user.Service) *LoginRoute {
	return &LoginRoute{
		userService: userService,
	}
}
