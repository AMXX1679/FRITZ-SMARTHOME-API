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

            if(state.data === "1" ) {
                image.src = "https://www.w3schools.com/js/pic_bulbon.gif"
                console.log("state 1")
            }
            else {
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