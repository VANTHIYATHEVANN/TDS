func TestBroadcastStockUpdate(t *testing.T) {
	// Create a mock websocket client
	mockClient := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		upgrader.CheckOrigin = func(r *http.Request) bool { return true }
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			t.Fatalf("Failed to upgrade connection: %v", err)
		}
		defer conn.Close()
	}))

	defer mockClient.Close()

	// Convert mockClient URL to websocket URL
	wsURL := "ws" + mockClient.URL[4:] + "/ws"

	// Connect to the websocket server
	conn, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		t.Fatalf("Failed to connect to websocket server: %v", err)
	}
	defer conn.Close()

	// Create a channel to signal when a message is received
	messageReceived := make(chan struct{})

	// Create a buffer to read messages from the websocket connection
	messageBuffer := bytes.NewBuffer(nil)

	// Start reading messages from the websocket connection
	go func() {
		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				return
			}
			messageBuffer.Write(message)
			// Signal that a message has been received
			messageReceived <- struct{}{}
		}
	}()

	// Create a mock stock
	mockStock := Stock{Symbol: "AAPL", Price: 500.0}

	// Broadcast the mock stock update
	broadcastStockUpdate(mockStock)

	// Wait for the message to be received
	<-messageReceived

	// Read the message received by the client
	receivedStock := Stock{}
	err = json.Unmarshal(messageBuffer.Bytes(), &receivedStock)
	if err != nil {
		t.Fatalf("Failed to unmarshal message: %v", err)
	}

	// Check if the received stock matches the mock stock
	if receivedStock.Symbol != mockStock.Symbol || receivedStock.Price != mockStock.Price {
		t.Errorf("Received stock does not match the mock stock. Expected: %v, Got: %v", mockStock, receivedStock)
	}
}

