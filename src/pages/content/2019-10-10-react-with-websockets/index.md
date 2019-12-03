---
path: "/blog/react-with-websockets"
date: "2019-10-10"
title: "React with WebSockets"
published: true
description: "How to use WebSocket in react components"
---

So I was tasked with building a component that connects to a WebSocket API to fetch a data stream from Bitstamp, you can check the API docs [here](https://www.bitstamp.net/websocket/v2/). The main reason for going with a Websocket API rather than a Fetch API was to get realtime data. This article illustrates how I went about it.

## What is a WebSocket API?

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), the WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With the WebSocket API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply. This [link](https://www.educba.com/websocket-vs-rest/) explains the differences between a WebSocket API and a FETCH API.

In this app, we'll be fetching a live order book stream from the bitstamp API. You can view the complete app on Code Sandbox {% codesandbox m7883 %}

## Setting up React

I'll be using [create-react-app](https://create-react-app.dev/) for creating the react app. So fire up your command line and let's start working:

```
npx create-react-app orderbook
```

Once it is done open the root directory with `cd orderbook` and run `npm start` to be sure the app is working.

We'll refactor and get rid of the boilerplate code that we won't need. Run `cd src` to switch to the src directory and then run `rm serviceWorker.js logo.svg` to delete `serviceWorker.js` and `logo.svg`. The app will crash after doing this because `index.js` and `App.js` imported the files that were deleted. Refactor your `index.js` to look like this:

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

``` and ``App.js`` to look this way:

``` javascript

import React from 'react';
import './App.css';

const App = () => {
  return (
    <div>
      <h2> Crypto Order Book </h2>
    </div>
  )
}

export default App;

````

At this point, the react-app should be working and displaying Crypto Order Book in the browser

## Creating the OrderBook Component

Create an OrderBook component in the src file

```
cd src
touch OrderBook.js
```

Time to get our hands dirty. We would be using react hooks

**OrderBook.js**

```javascript
import React, { useState, useEffect } from "react"

const OrderBook = () => {
  const [orders, setOrders] = useState([])
  const currencyPair = "btcusd"

  const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g)

  useEffect(() => {
    const subscribe = {
      event: "bts:subscribe",
      data: {
        channel: `order_book_${currencyPair}`,
      },
    }
    const ws = new WebSocket("wss://ws.bitstamp.net")

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe))
    }
    ws.onmessage = event => {
      const response = JSON.parse(event.data)
      setOrders(response.data)
    }
    ws.onclose = () => {
      ws.close()
    }

    return () => {
      ws.close()
    }
  }, [currencyPair])

  const { bids, asks } = orders
  const orderRows = arr =>
    arr &&
    arr.map((item, index) => (
      <tr key={index}>
        <td> {item[1]} </td>
        <td> {item[0]} </td>
      </tr>
    ))
  const orderHead = title => (
    <thead>
      <tr>
        <th colSpan="2">{title}</th>
      </tr>
      <tr>
        <th>Amount ({currencyArray[0]})</th>
        <th>Price ({currencyArray[1]})</th>
      </tr>
    </thead>
  )
  return (
    <div className="order-container">
      <table>
        {orderHead("Bids")}
        <tbody>{orderRows(bids)}</tbody>
      </table>

      <table>
        {orderHead("Asks")}
        <tbody>{orderRows(asks)}</tbody>
      </table>
    </div>
  )
}

export default OrderBook
```

We import React, useState, and useEffect. If you have no idea about useState and useEffect I suggest you check the React documentation on hooks [here](https://reactjs.org/docs/hooks-intro.html)

The next thing we do is to create our `orders` state, initialize our `currencyPair` to btcusd, split the currency pair into separate currencies and store in `currencyArray`.

```javascript
const [orders, setOrders] = useState([])
const currencyPair = "btcusd"

const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g)
```

Next, we want to make sure that when the component mounts and updates it fetches the data from the WebSocket API:

```javascript
useEffect(() => {
  const subscribe = {
    event: "bts:subscribe",
    data: {
      channel: `order_book_${currencyPair}`,
    },
  }
  const ws = new WebSocket("wss://ws.bitstamp.net")

  ws.onopen = () => {
    ws.send(JSON.stringify(subscribe))
  }
  ws.onmessage = event => {
    const response = JSON.parse(event.data)
    setOrders(response.data)
  }
  ws.onclose = () => {
    ws.close()
  }

  return () => {
    ws.close()
  }
}, [currencyPair])
```

We initialize `ws` to be an instance of the WebSocket connection. Then we send a subscription message when the `onopen` event is called. The `onopen` event is an event that is fired whenever the WebSocket is open.

`onmessage` event is fired to get data back from the server and store it in our `orders` state.

Whenever the `onclose` event is fired we terminate the connection to the WebSocket with `ws.close()`. After that, we clean up so as not to have a memory leak.

```javascript
return () => {
  ws.close()
}
```

If you noticed we didn't import the OrderBook in the App component. We will do that now. So open the App component it should look like this:

App.js

```javascript
import React from "react"
import OrderBook from "./OrderBook"
import "./App.css"

const App = () => {
  return (
    <div>
      <h2>Crypto Order Book </h2>
      <OrderBook />
    </div>
  )
}

export default App
```

Then we add a little styling to `App.css` to beautify it

App.css

```css
.order-container {
  display: flex;
  width: 100%;
}
table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}
h1,
h2 {
  text-align: center;
}
td,
th {
  padding: 6px;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
```

After that save and open your browser you should be seeing a data stream of currency orders.
