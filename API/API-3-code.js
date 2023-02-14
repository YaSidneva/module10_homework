const btnSend = document.querySelector(".btn-send");
const btnLocation = document.querySelector(".btn-location");
const messageToServer = document.querySelector(".message");
const chatMessage = document.querySelector(".chat-message");
//const yourMessage = document.querySelector(".your-message");
//const serverMessage = document.querySelector(".server-message");
//const locationMessage = document.querySelector(".location-message");
//const locationMessageLink = document.querySelector("#location-message");
const chatBlock = document.querySelector('.chat-block');

//yourMessage.style.display = "none";
//serverMessage.style.display = "none";
//locationMessage.style.display = "none";

const webSocket = new WebSocket(
  "wss://echo-ws-service.herokuapp.com",
  "protocolOne"
);

webSocket.onmessage = function (event) {
  if (!event.data.includes("https://www.openstreetmap.org/#map=18/")) {
    const serverMessage = document.createElement("div");
    serverMessage.classList.add("chat-message");
    serverMessage.classList.add("server-message");
    chatBlock.appendChild(serverMessage);


    serverMessage.style.display = "flex";

    const serverAvatar = document.createElement("div");
  const serverAvatarText = document.createTextNode("S");
  serverAvatar.appendChild(serverAvatarText);
  serverAvatar.classList.add("avatar");

    serverMessage.innerHTML = `${event.data}`;
    serverMessage.prepend(serverAvatar);
    
  }
};

const sendToServer = function () {
  const message = messageToServer.value;

  const yourMessage = document.createElement("div");
  yourMessage.classList.add("chat-message")
  chatBlock.appendChild(yourMessage);
  yourMessage.style.display = "flex";

  const userAvatar = document.createElement("div");
  const userAvatarText = document.createTextNode("U");
  userAvatar.appendChild(userAvatarText);
  userAvatar.classList.add("avatar");

  yourMessage.innerHTML = `${message}`;
  yourMessage.appendChild(userAvatar);

  webSocket.send(`${message}`);
  messageToServer.value = "";
};

btnSend.addEventListener("click", sendToServer);
messageToServer.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendToServer() ;
  }
});

const error = (locationMessage) => {
  locationMessage.style.display = "flex";
  locationMessage.innerHTML = "Невозможно получить ваше местоположение";
};

const success = (position, locationMessage) => {
  console.log("position", position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //locationMessage.style.display = "flex";
  const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  locationMessage.innerHTML = "";
  const locationMessageLink = document.createElement("a");
  locationMessage.appendChild(locationMessageLink);
  locationMessage.classList.add("a");
  locationMessageLink.href = geoLink;
  locationMessageLink.textContent = "Ссылка на карту";
  webSocket.send(`${geoLink}`);
};

btnLocation.addEventListener("click", () => {

  const locationMessage = document.createElement("div");
  locationMessage.classList.add("chat-message")
  chatBlock.appendChild(locationMessage);

  if (!navigator.geolocation) {
    locationMessage.style.display = "flex";
    locationMessage.innerHTML = "Geolocation не поддерживается вашим браузером";
  } else {

    locationMessage.style.display = "flex";
    locationMessage.innerHTML = "Определение местоположения…";
    navigator.geolocation.getCurrentPosition(position => success(position, locationMessage), () => error(locationMessage));
  }
});
