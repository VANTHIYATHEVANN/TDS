import React, { useEffect, useState } from 'react';


function App() {
  const [stocks, setStocks] = useState([]);
  //const [isChanged,setisChanged]=useState(false);
  //const [changedStock,setChangedStock]=useState();
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');
    socket.onopen=()=>{
        console.log("Websocket open")
    }
    socket.onerror=(error)=>{
        console.log(error)
    }
    socket.onmessage = (event) => {
      const newStock = JSON.parse(event.data);
      //console.log("NS",newStock)
      setStocks((prevStocks) =>
        prevStocks.map((stock,index) =>
          stock.symbol === newStock.symbol ? newStock : prevStocks[index]
        )
      );
      const stockIndex=stocks.findIndex(stock=>stock.symbol===newStock.symbol)
      if(stockIndex!==-1){
        const newStocks=[...stocks];
        newStocks[stockIndex]=newStock;
        //newStocks.push(newStock);
        setStocks(newStocks);
      }else{
        const newStocks=[...stocks];
        newStocks.push(newStock);
        setStocks(newStocks);
      }
      //console.log("FAter")
      
    };
    socket.onerror=(error)=>{
        console.log(error)
    }
    //console.log(stocks)
    return () => {
      socket.close();
    };
  }, [stocks]);

  return (
    <div className="App">
      <h1>Real-time Stock Prices</h1>
      {console.log(stocks)}
      <div className="stock-list">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="stock">
            <span className="symbol">{stock.symbol}{"    "}</span>
            <span className="price">{stock.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
