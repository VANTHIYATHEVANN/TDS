package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "github.com/rs/cors" // Import the CORS package
    "time"
)

var echoedMessage string = "Hello, World!"

func setMessageHandler(w http.ResponseWriter, r *http.Request) {
    decoder := json.NewDecoder(r.Body)
    var requestBody map[string]string
    err := decoder.Decode(&requestBody)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    newMessage, exists := requestBody["message"]
    if !exists {
        http.Error(w, "Message not provided", http.StatusBadRequest)
        return
    }

    echoedMessage = newMessage
    fmt.Fprintf(w, "Message set to: %s", echoedMessage)
}

func echoMessage() {
    for {
        fmt.Println(echoedMessage)
        time.Sleep(5 * time.Second)
    }
}

func main() {
    go echoMessage()

    // Create a new CORS handler with default options
    corsHandler := cors.Default()

    // Create a new HTTP server mux
    mux := http.NewServeMux()

    // Register your HTTP handlers
    mux.HandleFunc("/setMessage", setMessageHandler)

    // Wrap your HTTP server mux with the CORS middleware
    handler := corsHandler.Handler(mux)

    // Start the HTTP server with the CORS-wrapped handler
    fmt.Println("Server is running on port 8080...")
    http.ListenAndServe(":8080", handler)
}
