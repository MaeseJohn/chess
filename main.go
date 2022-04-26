package main

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/net/websocket"
)

type ChessData struct {
	Castling          bool   `json:"castling"`
	Checkmate         bool   `json:"checkmate"`
	Promotion         bool   `json:"promotion"`
	Turn              string `json:"turn"`
	PieceSquare       string `json:"pieceSquare"`
	DestinationSquare string `json:"destinationSquare"`
}

func hello(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
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
					}

				}
			}()

			// Read
			msg := ChessData{}
			err := websocket.JSON.Receive(ws, &msg)
			fmt.Printf("hello read 1: %v\n", msg)
			if err != nil {
				c.Logger().Error(err)
			}
			canal <- msg
		}
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}

func hello2(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
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
					}
				}
			}()

			// Read
			msg := ChessData{}
			err := websocket.JSON.Receive(ws, &msg)
			fmt.Printf("hello read 2: %v\n", msg)
			if err != nil {
				c.Logger().Error(err)
			}
			canal2 <- msg
		}
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}

var canal chan ChessData = make(chan ChessData)
var canal2 chan ChessData = make(chan ChessData)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Static("/", "public")
	e.GET("/ws", hello)
	e.GET("/ws2", hello2)
	e.Logger.Fatal(e.Start(":8080"))

}
