package main

import (
	"fmt"
	"os"

	"github.com/labstack/echo/v4"
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
	Finish            bool   `json:"finish"`
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
		}

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
		// Write
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

		// Read
		data := ChessData{}
		err := websocket.JSON.Receive(ws, &data)
		if err != nil {
			c.Logger().Error(err)
			return
		}
		if data.Finish {
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
	//e.Use(middleware.Logger())
	//e.Use(middleware.Recover())
	e.Static("/", "public")
	e.GET("/ws", createGame)
	e.GET("/ws2", joinGame)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
