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
		group.GET("/countpotentialclients", h.countPotentialClients)
		group.GET("/countclients", h.countClients)
		group.GET("/getsalaryschartdata", h.getSalaryChartData)
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

func (h *ServantRoute) countPotentialClients(c *gin.Context) {
	count, err := h.service.CountPotentialClients()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, count)
}

func (h *ServantRoute) countClients(c *gin.Context) {
	count, err := h.service.CountClients()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, count)
}

func (h *ServantRoute) getSalaryChartData(c *gin.Context) {
	data, err := h.service.GetSalaryChartData()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
		return
	}
	if err != nil {
		fmt.Println(err)
	}
	c.JSON(http.StatusOK, data)
}

func NewServantRoute(service *servant.ServantService) *ServantRoute {
	return &ServantRoute{
		service: service,
	}
}