window.addEventListener("DOMContentLoaded", () => {

    const chatBtn = document.querySelector(".chat__btn"),
          chat = document.querySelector(".chat"),
          stompClient = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket'
          })
    chatBtn.addEventListener("click", () => {
        console.log("click");
        chat.style.display = "flex";
        stompClient.activate();
        stompClient.onConnect = (frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/greetings', (greeting) => {
                showGreeting(JSON.parse(greeting.body).content);
                console.log(greeting);
            });
        };
        stompClient.onWebSocketError = (error) => {
            console.log('Error with websocket', error);
        };
        stompClient.onStompError = (frame) => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
    });

    function setConnected(connected) {
        $("#connect").prop("disabled", connected);
        $("#disconnect").prop("disabled", !connected);
        if (connected) {
            $("#conversation").show();
        }
        else {
            $("#conversation").hide();
        }
        $("#greetings").html("");
    }
});