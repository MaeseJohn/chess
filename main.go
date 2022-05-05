package main

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/net/websocket"
)

type Game struct {
	Chanel1     chan ChessData
	Chanel2     chan ChessData
	PlayerColor string
}

func (game *Game) closeGame() {
	close(game.Chanel1)
	close(game.Chanel2)
}

type ChessData struct {
	Castling          bool   `json:"castling"`
	Checkmate         bool   `json:"checkmate"`
	Promotion         bool   `json:"promotion"`
	Turn              string `json:"turn"`
	PieceSquare       string `json:"pieceSquare"`
	DestinationSquare string `json:"destinationSquare"`
	PromotionChoice   string `json:"promotionChoice"`
	PlayerColor       string `json:"playerColor"`
}

func createGame(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		fmt.Println("createGame")
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

		fmt.Println("createGame2")
		playGame(game.Chanel1, game.Chanel2, c, ws)

	}).ServeHTTP(c.Response(), c.Request())
	fmt.Println("createGame3")
	return nil
}

func joinGame(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		fmt.Println("joingame")
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

		playGame(games[token].Chanel2, games[token].Chanel1, c, ws)

	}).ServeHTTP(c.Response(), c.Request())
	return nil
}

func playGame(canal1 chan ChessData, canal2 chan ChessData, c echo.Context, ws *websocket.Conn) {
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
}

var games = make(map[string]*Game)

func main() {

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Static("/", "public")
	e.GET("/ws", createGame)
	e.GET("/ws2", joinGame)
	e.Logger.Fatal(e.Start(":8080"))
}
