package handler

import (
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/alert"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AlertRoute struct {
	alertService alert.Service
}

func (h *AlertRoute) BuildRoutes(router *gin.RouterGroup) {
	group := router.Group("/v1/alert")
	{
		group.POST("/getAlerts", h.getAlerts)
	}
}

func (h *AlertRoute) getAlerts(c *gin.Context) {
	var alert alert.Alert
	if err := c.ShouldBind(&alert); err == nil{
		alerts, err := h.alertService.FindAlerts(alert)
		if err != nil{
			c.AbortWithStatusJSON(http.StatusInternalServerError, err.Error())
			return
		}
		c.JSON(http.StatusOK, alerts)
		return
	} else {
		c.AbortWithStatusJSON(http.StatusBadRequest, err.Error())
	}
}

func NewAlertRoute(alertService alert.Service) *AlertRoute {
	return &AlertRoute{
		alertService: alertService,
	}
}
