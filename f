package main

import (
	"log"
	"math/rand"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

type Stock struct {
	Symbol string  `json:"symbol"`
	Price  float64 `json:"price"`
}

var (
	clients  = make(map[*websocket.Conn]bool)
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	mu sync.Mutex
)

func main() {
	// Serve websocketgo
	http.HandleFunc("/ws", handleWS)
	// Start emitting mock stock updates
	go emitMockStockUpdates()
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleWS(w http.ResponseWriter, r *http.Request) {
	// Upgrade connection to websocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	// Register client
	mu.Lock()
	clients[conn] = true
	mu.Unlock()
	for {

	}

}

func emitMockStockUpdates() {
	symbols := []string{"AAPL", "GOOG", "MSFT", "AMZN", "FB"}
	for {
		// Generate mock stock price updates
		for _, symbol := range symbols {
			stock := Stock{
				Symbol: symbol,
				Price:  rand.Float64() * 1000, // Generate random price
			}

			// Broadcast stock update to all clients
			broadcastStockUpdate(stock)

			// Sleep for a random duration to simulate real-time updates
			time.Sleep(time.Duration(rand.Intn(5)) * time.Second)
		}
	}
}

func broadcastStockUpdate(stock Stock) {
	mu.Lock()
	defer mu.Unlock()
	for client := range clients {
		err := client.WriteJSON(stock)
		//fmt.Println(stock)
		if err != nil {
			client.Close()
			delete(clients, client)
		}
	}
}
