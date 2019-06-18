package handler

import (
	"fmt"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/servant"
	"github.com/gin-gonic/gin"
	"net/http"
)

type ServantRoute struct {
	service *servant.ServantService
}

func (h *ServantRoute) BuildRoutes(router *gin.RouterGroup) {
	group := router.Group("/v1/servant")
	{
		group.POST("/import", h.importCsvServidores)
	}
}

func (h *ServantRoute) importCsvServidores(c *gin.Context) {
	multiPartFile, err := c.FormFile("file")
	if err!= nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "Error getting form file: " + err.Error())
		return
	}

	file, err := multiPartFile.Open()
	if err!= nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, "Error openning file: " + err.Error())
		return
	}

	err = h.service.ImportarCsvServidores(file)
	if err!= nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
}

func NewServantRoute(service *servant.ServantService) *ServantRoute {
	return &ServantRoute{
		service: service,
	}
}