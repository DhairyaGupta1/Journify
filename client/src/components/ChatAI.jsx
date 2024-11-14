import React, { useState } from 'react';
import stringSimilarity from 'string-similarity';
import "../styles/ChatAI.css"
const questions = [
  "How to register on the platform?",
  "How to book a flight?",
  "How to cancel a booking?",
  "How to check-in online?",
  "What is the baggage allowance?",
  "How to change my flight?",
  "How to contact support?",
  "What payment methods are accepted?",
  "How to get a refund?",
  "How to add extra baggage?"
];

const responses = {
  "How to register on the platform?": "To register, go to the signup page, enter your email, create a password, and follow the instructions. Once confirmed, you’ll have full access to our features.",
  "How to book a flight?": "To book a flight, select your destination and dates, choose a flight, enter passenger details, and proceed to payment. You’ll receive a confirmation after payment.",
  "How to cancel a booking?": "Visit the My Bookings section, select the booking you want to cancel, and follow the prompts. Note that cancellation fees may apply depending on the fare.",
  "How to check-in online?": "Go to our online check-in page, enter your booking reference and last name, select your seats if available, and download your boarding pass.",
  "What is the baggage allowance?": "The baggage allowance depends on your ticket class and destination. Standard is 15-30kg for checked baggage, plus 7kg for carry-on. Check your ticket details for specifics.",
  "How to change my flight?": "Go to the Manage Booking section, enter your booking details, and select Change Flight. Additional fees may apply, based on fare type and availability.",
  "How to contact support?": "You can contact support through our help center, via live chat, email, or phone. Visit the Contact Us page for options and operating hours.",
  "What payment methods are accepted?": "We accept major credit and debit cards, online banking, and select mobile wallets. Payment methods may vary based on your location.",
  "How to get a refund?": "For refunds, go to My Bookings, select your booking, and click Request Refund. Refunds are processed according to our cancellation policy.",
  "How to add extra baggage?": "You can add extra baggage during booking or through Manage Booking. Select your flight, add baggage, and pay the additional fee."
  
};


const ChatAI = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestedQuestion, setSuggestedQuestion] = useState(null);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleAskQuestion = () => {
    let response;
    if (questions.includes(userInput)) {
      response = responses[userInput];
      setSuggestedQuestion(null);
    } else if (userInput.toLowerCase() === 'yes' && suggestedQuestion) {
      response = responses[suggestedQuestion];
      setSuggestedQuestion(null);
    } else {
      const matches = stringSimilarity.findBestMatch(userInput, questions);
      const bestMatch = matches.bestMatch;

      if (bestMatch.rating > 0.7) {
        response = `Did you mean:  ${bestMatch.target}`;
        setSuggestedQuestion(bestMatch.target);
      } else {
        response = "I'm sorry, I didn't understand that question.";
        setSuggestedQuestion(null);
      }
    }


    setChatHistory(prevHistory => [
      ...prevHistory,
      { sender: 'user', text: userInput },
      { sender: 'bot', text: response }
    ]);
    setUserInput(''); 
  };

  return (
    <div className="chatbot-container">
      <h1>Flight Booking Chatbot</h1>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={userInput} 
        onChange={handleInputChange} 
        placeholder="Ask a question about booking flights..." 
      />
      <button onClick={handleAskQuestion}>Send</button>
    </div>
  );
  
}

export default ChatAI