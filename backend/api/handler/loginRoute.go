package handler

import (
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/messages"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"github.com/gin-gonic/gin"
	"net/http"
)

type LoginRoute struct {
	userService user.Service
}

func (h *LoginRoute) BuildRoutes(router *gin.RouterGroup) {
	group := router.Group("/v1/login")
	{
		group.POST("/save", h.SaveUser)
		group.POST("/signin", h.SignIn)
	}
}

func (h *LoginRoute) SignIn(c *gin.Context) {
	var creds user.Credentials
	/*buf := make([]byte, 1024)
	num, _ := c.Request.Body.Read(buf)
	reqBody := string(buf[0:num])
	fmt.Println(reqBody)*/
	if err := c.ShouldBind(&creds); err == nil {
		response, err := h.userService.SignIn(creds)
		if err != nil {
			if err.Error() == "Not authorized" {
				c.JSON(http.StatusUnauthorized, "Not authorized")
				return
			}
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, response)
	} else {
		c.JSON(http.StatusInternalServerError, err.Error())
	}
}

func (h *LoginRoute) SaveUser(c *gin.Context) {
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

func NewLoginRoute(userService user.Service) *LoginRoute {
	return &LoginRoute{
		userService: userService,
	}
}
