(() => {
    const value = document.querySelector("#value");
    const input = document.querySelector("#pi_input");
    const button = document.querySelector(".onoff");
    value.textContent = input.value;
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "flex";

    const bulb = () => {

        const image = document.getElementById('myBulb');

        fetch('/api/500/info/state')
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

        fetch('/api/500/info/state')
            .then(res => res.json())
            .then(data => {
                const state = data;
                console.log(state)

                if (state.data === "1") {
                    console.log("state 1")
                } else {
                    fetch("/api/500/switch")
                    console.log("state 2")
                }
            })

        fetch("/api/500/color/red")


        const inputElement = document.getElementById('timeInput');
        const inputDate = new Date(inputElement.value);

        const startDate = new Date().getTime();

        const difference = inputDate - startDate;

        let halfwayLogged = false;


        const countdownInterval = setInterval(function () {
            const now = new Date().getTime();
            const updatedDifference = inputDate - now;


            const minutes = Math.floor((updatedDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((updatedDifference % (1000 * 60)) / 1000);

            console.log(`${minutes}:${seconds}`);

            if (now >= startDate + difference / 2 && !halfwayLogged) {
                fetch("/api/500/color/yellow")
                halfwayLogged = true;
            }

            if (updatedDifference <= 0) {
                fetch("/api/500/color/green")
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    fetch('/api/500/info/level')
        .then(res => res.json())
        .then(level => {
            input.value = level.data
            value.textContent = input.value

            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 100);
        });

    let timeoutId;

    input.addEventListener("input", (event) => {
        value.textContent = Math.round(event.target.value)
        window.clearTimeout(timeoutId)

        timeoutId = setTimeout(() => fetch(`/api/500/level/${Math.round(event.target.value)}`), 250)
    });

    button.addEventListener("click", () => {
        fetch("/api/500/switch")
            .then(() => setTimeout(() => bulb(), 300))
    });

    ["green", "red", "blue"].forEach(color => document.querySelector("." + color)
        .addEventListener("click", () => fetch(`/api/500/color/${color}`)))

    bulb()

})()

