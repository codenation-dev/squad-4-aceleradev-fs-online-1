package handler

import (
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserRoute struct {
	userService user.Service
}

func (h *UserRoute) BuildRoutes(router *gin.RouterGroup) {
	group := router.Group("/v1/user")
	{
		group.POST("/getUsers", h.getUsers)
	}
}

func (h *UserRoute) getUsers(c *gin.Context) {
	var usuario user.User
	if err := c.ShouldBind(&usuario); err == nil {
		users, err := h.userService.FindUser(usuario)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		c.JSON(http.StatusOK, users)
	} else {
		c.JSON(http.StatusInternalServerError, err.Error())
	}
}

func NewUserRoute(userService user.Service) *UserRoute {
	return &UserRoute{
		userService: userService,
	}
}
