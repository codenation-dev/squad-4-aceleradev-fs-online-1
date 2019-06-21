package app

import (
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/api/handler"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/config/env"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/alert"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/servant"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
	"github.com/gin-gonic/gin"
	"github.com/robfig/cron"
	"log"
	"os"
)


func Init() {
	db , err := InitializeDB()
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}

	//Repositórios
	userRepo := user.NewSqliteRepo(db)
	servantRepo := servant.NewServantSqliteRepo(db)
	alertRepo := alert.NewAlertSqliteRepo(db)

	//Serviços
	userService := user.NewUserService(userRepo)
	alertService := alert.NewAlertService(alertRepo)
	servantService := servant.NewServantService(servantRepo, userService, alertService)

	//Rotas
	loginRoute := handler.NewLoginRoute(userService)
	userRoute := handler.NewUserRoute(userService)
	servantRoute := handler.NewServantRoute(servantService)
	alertRoute := handler.NewAlertRoute(alertService)

	r := gin.Default()
	r.Use(handler.TokenAuthMIddleware())
	mainRouter := r.Group("/banco-uati")
	loginRoute.BuildRoutes(mainRouter)
	userRoute.BuildRoutes(mainRouter)
	servantRoute.BuildRoutes(mainRouter)
	alertRoute.BuildRoutes(mainRouter)

	crono := cron.New()
	crono.AddFunc("@every 5m", servantService.VerifyPotentialClients)
	crono.Start()

	err = r.Run(env.AppBaseUrl())
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
}