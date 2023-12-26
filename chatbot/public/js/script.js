const sendBtn = document.getElementById("sendBtn");
const textbox = document.getElementById("textbox");
const chatContainer = document.getElementById("chatContainer");

const user = { message: "" };

const arrayOfPossibleMessage = [
  {message:"hi",response:"hello"},
  {message:"how are you?",response:"I am good!"},
  {message:"what is your name?",response:"I am a voRtekAI!"},

]

function sendMessage(userMessage) {
  var messageElement = document.createElement("div");
  messageElement.style.textAlign = "right";
  messageElement.style.margin = "8px";
  messageElement.innerHTML =
    "<span>You: </span>" + "<span>" + userMessage + "</span>";
  chatContainer.appendChild(messageElement);
}

function chatbotResponse(userMessage){
  var chatbotmessage = "";
   if(userMessage.length > 5 || userMessage == "hi"){
    var result = arrayOfPossibleMessage.filter(val => val.message.includes(userMessage.toLowerCase()));
    if(result.length > 0){
      var response = result[0].response;
      chatbotmessage = response;
    }else{
      chatbotmessage = "Please send the different message!"
    }
  }else{
    chatbotmessage = "Please send me the appropriate message!"
  }
  var messageElement = document.createElement('div');
  messageElement.innerHTML = "<span>voRtek: </span>"+ "<span>"+ chatbotmessage +"</span>";
  setTimeout(() => {
    messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:600})
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 600);
  
}

sendBtn.addEventListener("click", (e) => {
  const userMessage = textbox.value;

  if (userMessage == "") {
    alert("Please type a message!");
  } else {
    let userMessageText = userMessage.trim();
    user.message = userMessageText;
    textbox.value = "";
    sendMessage(userMessageText);
    chatbotResponse(userMessageText)
  }
});
