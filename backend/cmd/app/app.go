package app

import (
	"github.com/gin-gonic/gin"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/api/handler"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/config/env"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/servant"
	"github.com/codenation-dev/squad-4-aceleradev-fs-online-1/backend/pkg/user"
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

	//Serviços
	userService := user.NewUserService(userRepo)
	servantService := servant.NewServantService(servantRepo)

	//Rotas
	loginRoute := handler.NewLoginRoute(userService)
	userRoute := handler.NewUserRoute(userService)
	servantRoute := handler.NewServantRoute(servantService)

	r := gin.Default()
	r.Use(handler.TokenAuthMIddleware())
	mainRouter := r.Group("/banco-uati")
	loginRoute.BuildRoutes(mainRouter)
	userRoute.BuildRoutes(mainRouter)
	servantRoute.BuildRoutes(mainRouter)
	err = r.Run(env.AppBaseUrl())
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
}