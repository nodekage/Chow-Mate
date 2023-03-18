// Get DOM elements
const chatInput = document.querySelector('.chat-input');
const chatArea = document.querySelector('.chat-messages');


// Get sessionId or generate a new one
const sessionId = getSessionId();

async function sendMessage() {
  // Get user input
  const message = chatInput.value;

  // Create user message element and add to chat area
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user-message');
  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container');
  textContainer.textContent = message;
  userMessage.appendChild(textContainer);
  chatArea.appendChild(userMessage);

  // Generate bot response
  const botResponse = await generateResponse(message, sessionId);

  // Create bot message element and add to chat area
  const botMessage = document.createElement('div');
  botMessage.classList.add('message', 'bot-message');
  botMessage.textContent = botResponse;
  chatArea.appendChild(botMessage);

  // Clear user input
  chatInput.value = '';

  // Scroll to bottom of chat area
  chatArea.scrollTop = chatArea.scrollHeight;
}

async function generateResponse(message, sessionId) {
  return new Promise(async (resolve, reject) => {
    switch (message) {
      case '1':
        const orderMessage = await placeOrder(message, sessionId);
        resolve(
          '2. DoubleCheeseBurger : $4.99..  \n' +
            '3. BreakfastBurrito : $14.99..........\n' +
            '4. MilkShake : $3.50.......................\n' +
            '5. French Fries : $4.99..............\n\n' +
            'Please select an item number to add to your order.',
          orderMessage
        );
        break;
      case '2':
        let order2Result = '';
        order2Result = await order2(message, sessionId);
        resolve('DoubleCheeseBurger added to cart, press 1 to go back to menu.',
        order2Result
        );
        break;
      case '3':
         let order3Result = '';
         order3Result = await order3(message, sessionId);
         resolve('BreakfastBurrito added to cart, press 1 to go back to menu.',
         order3Result
        );
        break;
        case '99':
        let order99Result = await order99(sessionId);
         resolve(`${order99Result}`);
        break;
      case '98':
        let order98Result = await order98(sessionId);
         resolve(`${order98Result}`);
        break;
      case '97':
        let order97Result = await order97(sessionId);
         resolve(`${order97Result}`);
        break;
      case '0':
        resolve('Order cancelled!'); // add logic to handle cancelling orders
        break;
      default:
        resolve("I'm sorry, I didn't understand that. Please select one of the options.");
        break;
    }
  });
}

// PLACE ORDER FUNCTION

async function placeOrder(message, sessionId) {
  const response = await fetch('http://localhost:5500/api/chatbot/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'sessionId': sessionId, // Include session ID in headers
    },
    body: JSON.stringify({ message: message }),
    credentials: 'include', // Include cookies in the request
  });
  const data = await response.json();

  console.log(data);
}


// ORDER 2 FUNCTION 'DoubleCheeseBurger : $4.99'

async function order2(message, sessionId) {
    const response = await fetch('http://localhost:5500/api/chatbot/order2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sessionId': sessionId, // Include session ID in headers
      },
      body: JSON.stringify({ message: "DoubleCheeseBurger : $4.99" }),
      credentials: 'include', // Include cookies in the request
    });
    const data = await response.json();
  
    console.log(data);
  }




// ORDER 3 FUNCTION 'DoubleCheeseBurger : $4.99'

async function order3(message, sessionId) {
    const response = await fetch('http://localhost:5500/api/chatbot/order3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sessionId': sessionId, // Include session ID in headers
      },
      body: JSON.stringify({ message: "BreakfastBurrito : $14.99" }),
      credentials: 'include', // Include cookies in the request
    });
    const data = await response.json();
  
    console.log(data);
  }

  
// ORDER 99 FUNCTION 'PLACE ORDER'

async function order99(sessionId) {
    const response = await fetch('http://localhost:5500/api/chatbot/order99', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sessionId': sessionId, // Include session ID in headers
      },
      body: JSON.stringify({ message: "99" }),
      credentials: 'include', // Include cookies in the request
    });
    const data = await response.json();
    return data;
  }
  

  
// ORDER 98 FUNCTION 'ORDER HISTORY'

async function order98(message, sessionId) {
    const response = await fetch('http://localhost:5500/api/chatbot/order98', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sessionId': sessionId, // Include session ID in headers
      },
      body: JSON.stringify({ message: "BreakfastBurrito : $14.99" }),
      credentials: 'include', // Include cookies in the request
    });
    const data = await response.json();
    return data;
  
  }


// ORDER 97 FUNCTION 'SEE ORDER'

async function order97(message, sessionId) {
    const response = await fetch('http://localhost:5500/api/chatbot/order97', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sessionId': sessionId, // Include session ID in headers
      },
      body: JSON.stringify({ message: "BreakfastBurrito : $14.99" }),
      credentials: 'include', // Include cookies in the request
    });
    const data = await response.json();
  
    console.log(data);
  }











function getSessionId() {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = "0123456789"; // generate a new session ID if it doesn't exist
      localStorage.setItem('sessionId', sessionId); // store the new session ID in local storage
    }
    return sessionId;
    
  }
  
 
