const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  };
  
  app.use(cors(corsOptions));



app.use(bodyParser.json());

app.use(cookieParser());


const MONGO_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5500;

const chatSchema = new mongoose.Schema({
    message: String,
    timestamp: Date
  });
 
  const orderSchema = new mongoose.Schema({
    message: String,
  });
  

const sessionSchema = new mongoose.Schema({
    _id: String,
    chats: [chatSchema],
    orders: [orderSchema]
  });
  

const Session = mongoose.model('Session', sessionSchema);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Chow MATe Blog!!!!' });
});







// PLACE ORDER FUNCTION

app.post('/api/chatbot/order', async (req, res) => {
    let sessionId = req.cookies.sessionId || req.headers.sessionid || uuid.v4();
    
    const message = JSON.stringify(req.body.message);
    const timestamp = new Date();
    
    let session = await Session.findById(sessionId);
    if (!session) {
      session = new Session({
        _id: sessionId,
        chats: [],
      }); 
    }
    
    session.chats.push({ message, timestamp });
    await session.save();
    
    // Set the cookie before sending the response
    res.cookie('sessionId', sessionId, {
        maxAge: 86400000,
        path: '/'
    });
    
    // Return a response to the client
    res.json({ message: 'Success', botResponse: 'This is a dummy response from the server' });
  });







// ORDER 2 FUNCTION 'DoubleCheeseBurger : $4.99'

app.post('/api/chatbot/order2', async (req, res) => {
    let sessionId = req.cookies.sessionId || req.headers.sessionid || uuid.v4();
    
    const message = JSON.stringify(req.body.message);
    const timestamp = new Date();
    
    let session = await Session.findById(sessionId);
    if (!session) {
      session = new Session({
        _id: sessionId,
        orders: [],
      }); 
    }
    
    session.orders.push({ message });
    await session.save();
    
    // Set the cookie before sending the response
    res.cookie('sessionId', sessionId, {
        maxAge: 86400000,
        path: '/'
    });
    
    // Return a response to the client
    res.json("Order placed!");
  });



// ORDER 3 FUNCTION 'DoubleCheeseBurger : $4.99'

app.post('/api/chatbot/order3', async (req, res) => {
    let sessionId = req.cookies.sessionId || req.headers.sessionid || uuid.v4();
    
    const message = JSON.stringify(req.body.message);
    const timestamp = new Date();
    
    let session = await Session.findById(sessionId);
    if (!session) {
      session = new Session({
        _id: sessionId,
        orders: [],
      }); 
    }
    
    session.orders.push({ message });
    await session.save();
    
    // Set the cookie before sending the response
    res.cookie('sessionId', sessionId, {
        maxAge: 86400000,
        path: '/'
    });
    
    // Return a response to the client
    res.json("Order 3 placed!");
  });  



// ORDER 99 FUNCTION 'PLACE ORDER'

app.post('/api/chatbot/order99', async (req, res) => {
    let sessionId = req.cookies.sessionId || req.headers.sessionid || uuid.v4();
    
  //  const message = JSON.stringify(req.body.message);
   // const timestamp = new Date();
    
   let session = await Session.findById(sessionId);
   if (!session) {
     res.json("No order to place")
     return
   }
   
   if (session.orders.length < 1) {
     res.json("No order to place")
     return
   }
   

   // Set the cookie before sending the response
   res.cookie('sessionId', sessionId, {
     maxAge: 86400000,
     path: '/'
   });
   
   // Return a response to the client
   if (session.orders.length >= 1) {
    res.json("Order Placed")
  }
   
  });    
    

// ORDER 98 FUNCTION 'ORDER HISTORY'

app.post('/api/chatbot/order98', async (req, res) => {
    let sessionId = req.cookies.sessionId || req.headers.sessionid || uuid.v4();
  
    let session = await Session.findById(sessionId);
    console.log(session)
    if (!session) {
      res.json("No order history.")
      return
    }
  
    if (session.orders.length < 1) {
      res.json("No order history")
      return
    }
  
    // Set the cookie before sending the response
    res.cookie('sessionId', sessionId, {
      maxAge: 86400000,
      path: '/'
    });
  
    // Return a response to the client
    console.log(session.orders)
    res.json(session.orders);
  });
   
  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
