const value = document.querySelector("#value");
const input = document.querySelector("#pi_input");
const button = document.querySelector(".btn-class-name");
value.textContent = input.value;
let timeoutid;
let level;
const loadingScreen = document.getElementById("loading-screen");
const colorUrl = "http://localhost:8080/api/500/color/";
loadingScreen.style.display = "flex";

const image = document.getElementById('myBulb');

let bulb = () => {

    fetch('http://localhost:8080/api/500/info/state')
        .then(res => res.json())
        .then(data => {
            const state = data;
            console.log(state)

            if (state.data === "1") {
                image.src = "https://www.w3schools.com/js/pic_bulbon.gif"
                console.log("state 1")
            } else {
                image.src = "https://www.w3schools.com/js/pic_bulboff.gif"
                console.log("state 2")
            }
        })
        .finally(() => {
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 100);
        });

}

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

document.getElementById('timeInput').value = getCurrentDateTime();

function startCountdown() {

    fetch('http://localhost:8080/api/500/info/state')
        .then(res => res.json())
        .then(data => {
            const state = data;
            console.log(state)

            if (state.data === "1") {
                console.log("state 1")
            } else {
                fetch("http://localhost:8080/api/500/switch")
                console.log("state 2")
            }
        })

    fetch("http://localhost:8080/api/500/color/red")


    const inputElement = document.getElementById('timeInput');
    const inputDate = new Date(inputElement.value);

    const Startdate = new Date().getTime();

    const difference = inputDate - Startdate;

    let halfwayLogged = false;


    const countdownInterval = setInterval(function () {
        const Now = new Date().getTime();
        const updatedDifference = inputDate - Now;


        const minutes = Math.floor((updatedDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((updatedDifference % (1000 * 60)) / 1000);

        console.log(`${minutes}:${seconds}`);


        if (Now >= Startdate + difference / 2 && !halfwayLogged) {
            fetch("http://localhost:8080/api/500/color/yellow")
            halfwayLogged = true;
        }


        if (updatedDifference <= 0) {
            fetch("http://localhost:8080/api/500/color/green")
            clearInterval(countdownInterval);
        }
    }, 1000);
}

fetch('http://localhost:8080/api/500/info/level')
    .then(res => res.json())
    .then(data => {
        level = data;
    })
    .then(() => {
        input.value = level.data
        value.textContent = input.value
    })
    .finally(() => {
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 100);
    });

input.addEventListener("input", (event) => {
    value.textContent = Math.round(event.target.value)
    window.clearTimeout(timeoutid)

    timeoutid = setTimeout(() => fetch(`http://localhost:8080/api/500/level/${Math.round(event.target.value)}`), 250)
    console.log(event.target.value)
});

button.addEventListener("click", () => {
    fetch("http://localhost:8080/api/500/switch")
        .then(() => setTimeout(() => bulb(), 300))
})

let blue = () => {
    fetch(`${colorUrl}blue`)
}

let green = () => {
    fetch(`${colorUrl}green`)
}

let red = () => {
    fetch(`${colorUrl}red`)
}

bulb()