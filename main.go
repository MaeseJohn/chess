package main

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/net/websocket"
)

type Game struct {
	Chanel1 chan ChessData
	Chanel2 chan ChessData
}

type ChessData struct {
	Castling          bool   `json:"castling"`
	Checkmate         bool   `json:"checkmate"`
	Promotion         bool   `json:"promotion"`
	Turn              string `json:"turn"`
	PieceSquare       string `json:"pieceSquare"`
	DestinationSquare string `json:"destinationSquare"`
	PromotionChoice   string `json:"promotionChoice"`
}

func hello(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		fmt.Println(c.ParamNames())
		fmt.Println(c.ParamValues())
		fmt.Println(c.FormValue("token"))
		var canal1 chan ChessData
		var canal2 chan ChessData
		token := c.FormValue("token")

		fmt.Println(token)

		if _, ok := games[token]; ok {
			fmt.Println(token)
			fmt.Println("haytoken")
			canal1 = games[token].Chanel1
			canal2 = games[token].Chanel2
		} else {
			fmt.Println("no hay token")
			canal1 = make(chan ChessData)
			canal2 = make(chan ChessData)
			game := &Game{
				Chanel1: canal2,
				Chanel2: canal1,
			}
			games[token] = *game
		}
		defer ws.Close()
		for {
			// Write
			go func() {
				for {
					data := <-canal2
					fmt.Printf("hello send 1: %v\n", data)
					err := websocket.JSON.Send(ws, &data)
					if err != nil {
						c.Logger().Error(err)
						return
					}
				}
			}()

			// Read
			msg := ChessData{}
			err := websocket.JSON.Receive(ws, &msg)
			fmt.Printf("hello read 1: %v\n", msg)
			if err != nil {
				c.Logger().Error(err)
				return
			}
			canal1 <- msg
		}
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}

/*func hello2(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		fmt.Println(c.ParamNames())
		fmt.Println(c.Param("token"))
		defer ws.Close()
		for {

			// Write
			go func() {
				for {
					data := <-canal
					fmt.Printf("hello write 2: %v\n", data)
					err := websocket.JSON.Send(ws, &data)
					if err != nil {
						c.Logger().Error(err)
						return
					}
				}
			}()

			// Read
			msg := ChessData{}
			err := websocket.JSON.Receive(ws, &msg)
			fmt.Printf("hello read 2: %v\n", msg)
			if err != nil {
				c.Logger().Error(err)
				return
			}
			canal2 <- msg
		}
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}*/

var games = make(map[string]Game)

func main() {

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Static("/", "public")
	e.GET("/ws:token", hello)
	e.Logger.Fatal(e.Start(":8080"))
}
