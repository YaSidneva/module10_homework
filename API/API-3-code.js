const btnSend = document.querySelector(".btn-send");
const btnLocation = document.querySelector(".btn-location");
const messageToServer = document.querySelector(".message");
const yourMessage = document.querySelector(".your-message");
const serverMessage = document.querySelector(".server-message");
const locationMessage = document.querySelector(".location-message");
const locationMessageLink = document.querySelector("#location-message");

yourMessage.style.display = "none";
serverMessage.style.display = "none";
locationMessage.style.display = "none";

const webSocket = new WebSocket(
  "wss://echo-ws-service.herokuapp.com",
  "protocolOne"
);

webSocket.onmessage = function (event) {
  if (!event.data.includes("https://www.openstreetmap.org/#map=18/")) {
    serverMessage.style.display = "flex";
    serverMessage.innerHTML = `Server message: ${event.data}`;
  }
};

const sendToServer = function () {
  const message = messageToServer.value;
  yourMessage.style.display = "flex";
  yourMessage.innerHTML = `User message: ${message}`;
  webSocket.send(`${message}`);
  messageToServer.value = "";
};

btnSend.addEventListener("click", sendToServer);
messageToServer.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendToServer();
  }
});

const error = () => {
  locationMessage.style.display = "flex";
  locationMessage.innerHTML = "Невозможно получить ваше местоположение";
};

const success = (position) => {
  console.log("position", position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  locationMessage.style.display = "flex";
  const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  locationMessageLink.href = geoLink;
  locationMessageLink.textContent = "Ссылка на карту";
  webSocket.send(`${geoLink}`);
};

btnLocation.addEventListener("click", () => {
  locationMessageLink.href = "";

  if (!navigator.geolocation) {
    locationMessage.style.display = "flex";
    locationMessage.innerHTML = "Geolocation не поддерживается вашим браузером";
  } else {
    locationMessage.style.display = "flex";
    locationMessage.innerHTML = "Определение местоположения…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
