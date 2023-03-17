
// Get DOM elements
const chatInput = document.querySelector('.chat-input');
const chatArea = document.querySelector('.chat-messages');



function sendMessage() {
	// Get user input
	const message = chatInput.value;

	// Create user message element and add to chat area
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user-message");
  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");
  textContainer.textContent = message;
  userMessage.appendChild(textContainer);
  chatArea.appendChild(userMessage);
  

	// Generate bot response
	const botResponse = generateResponse(message);

	// Create bot message element and add to chat area
	const botMessage = document.createElement("div");
	botMessage.classList.add("message", "bot-message");
	botMessage.textContent = botResponse;
	chatArea.appendChild(botMessage);

	// Clear user input
	chatInput.value = "";

	// Scroll to bottom of chat area
	 chatArea.scrollTop = chatArea.scrollHeight;
}

function generateResponse(message) {
	// Check user input and generate response
	switch (message) {
		case "1":
			return "Here is a list of items from our restaurant: ..."; // add your list of items here
		case "99":
			return "Order placed!"; // add logic to handle placing orders
		case "98":
			return "Here is your order history: ..."; // add logic to retrieve order history
		case "97":
			return "Here is your current order: ..."; // add logic to retrieve current order
		case "0":
			return "Order cancelled!"; // add logic to handle cancelling orders
		default:
			return "I'm sorry, I didn't understand that. Please select one of the options.";
	}
}
