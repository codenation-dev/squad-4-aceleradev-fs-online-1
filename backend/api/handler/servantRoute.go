package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/servant"
)

type ServantRoute struct {
	service *servant.ServantService
}

func (h *ServantRoute) BuildRoutes(router *gin.RouterGroup) {
	group := router.Group("/v1/servant")
	{
		group.GET("/import", h.importCsvServidores)
	}
}

func (h *ServantRoute) importCsvServidores(c *gin.Context) {
	h.service.ImportarCsvServidores()
}

func NewServantRoute(service *servant.ServantService) *ServantRoute {
	return &ServantRoute{
		service: service,
	}
}