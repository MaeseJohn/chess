package main

import (
	"fmt"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/net/websocket"
)

type Game struct {
	Chanel1 chan ChessData
	Chanel2 chan ChessData
}

func (game *Game) closeGame() {
	close(game.Chanel1)
	close(game.Chanel2)
}

type ChessData struct {
	Castling          bool   `json:"castling"`
	Checkmate         bool   `json:"checkmate"`
	Promotion         bool   `json:"promotion"`
	Player2           bool   `json:"player2"`
	Disconect         bool   `json:"disconect"`
	Turn              string `json:"turn"`
	PieceSquare       string `json:"pieceSquare"`
	DestinationSquare string `json:"destinationSquare"`
	PromotionChoice   string `json:"promotionChoice"`
	PlayerColor       string `json:"playerColor"`
}

func createGame(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()

		game := &Game{
			Chanel1: make(chan ChessData),
			Chanel2: make(chan ChessData),
		}
		defer game.closeGame()

		defer func() {
			data := ChessData{
				Disconect: true,
			}
			game.Chanel1 <- data
		}()

		token := c.QueryParam("token")
		games[token] = game

		playerColor := ChessData{
			PlayerColor: "white",
		}

		err := websocket.JSON.Send(ws, &playerColor)
		if err != nil {
			c.Logger().Error(err)
			return
		}

		playGame(c, ws, game.Chanel1, game.Chanel2)

	}).ServeHTTP(c.Response(), c.Request())
	return nil
}

func joinGame(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()

		token := c.QueryParam("token")
		playerColor := ChessData{
			PlayerColor: "black",
			Player2:     true,
		}

		data := ChessData{
			Player2: true,
		}

		games[token].Chanel2 <- data
		defer func() {
			data := ChessData{
				Disconect: true,
			}
			games[token].Chanel2 <- data
		}()

		err := websocket.JSON.Send(ws, &playerColor)
		if err != nil {
			c.Logger().Error(err)
			return
		}
		playGame(c, ws, games[token].Chanel2, games[token].Chanel1)

	}).ServeHTTP(c.Response(), c.Request())
	return nil
}

func playGame(c echo.Context, ws *websocket.Conn, canal1 chan ChessData, canal2 chan ChessData) {
	for {

		go func() {
			for {
				data := <-canal2
				err := websocket.JSON.Send(ws, &data)
				if err != nil {
					c.Logger().Error(err)
					return
				}
			}
		}()

		data := ChessData{}
		err := websocket.JSON.Receive(ws, &data)
		if err != nil {
			c.Logger().Error(err)
			return
		}
		canal1 <- data
		if data.Checkmate {
			return
		}
	}
}

var games = make(map[string]*Game)

func main() {

	port := os.Getenv("PORT")

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Static("/", "static")
	e.GET("/createGame", createGame)
	e.GET("/joinGame", joinGame)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
