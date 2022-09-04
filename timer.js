
function myTimer() {

    let timer = document.getElementById('timer');
    let min = 0;
    let sec = 0;

    // if(!timerStarted) {
        setInterval(() => {
            if(sec > 60) {
                min++;
                sec = 0;
            }
            if(min > 0) {
                timer.innerHTML = `<p>${min}:${sec}</p>`;
            } else {
                timer.innerHTML = `<p>${sec}</p>`;
            }
                sec++
        }, 1000);
    // }

}