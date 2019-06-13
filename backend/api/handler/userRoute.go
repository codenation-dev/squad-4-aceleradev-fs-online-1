package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/messages"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"net/http"
)

type UserRoute struct {
	userService user.Service
}

func (h *UserRoute) BuildRoutes(router *gin.RouterGroup) {
	group := router.Group("/v1/user")
	{
		group.POST("/save", h.SaveUser)
	}
}


func (h *UserRoute) SaveUser(c *gin.Context) {
	var usuario user.User
	if err := c.ShouldBind(&usuario); err == nil {
		err := h.userService.SaveUser(&usuario)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		c.JSON(http.StatusOK, messages.UserRegistered)
	} else {
		c.JSON(http.StatusInternalServerError, err.Error())
	}
}

func NewUserRoute(userService user.Service) *UserRoute {
	return &UserRoute{
		userService: userService,
	}
}
