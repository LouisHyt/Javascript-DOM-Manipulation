const board = document.querySelector("#board");
const digits = document.querySelector("#digits");
const box = document.createElement("div");
box.classList.add("box");


const arrayScore = JSON.parse(localStorage.getItem("scores")) || [];
let chrono;
let timerValue;

displayScore();
startGame();

function startGame(){
    digits.classList.remove('score-result');
    let nbBoites = prompt("Veuillez insérer le nombre de boite souhaité !") || 10;
    //Timer
    timerValue = 0;
    chrono = setInterval(() => {
        timerValue++;
        let timerValueFormat = timerValue.toString().padStart(4, '0').replace(/^(.{2})/, "$1:");
        digits.textContent = timerValueFormat;
        if(timerValue >= 60000){
            timerValue = 0;
            clearInterval(chrono);
            showReaction('error', this);
            nb = 1;
            board.querySelectorAll(".box-clicked").forEach(elem => {
                elem.classList.remove("box-clicked")
            })
            shuffleChildren(board);
        }
    }, 10)

    let nb = 1;
    for(let i = 1; i <= nbBoites; i++){
        let newBox = box.cloneNode();
        newBox.textContent = i;
        board.appendChild(newBox);
    
        newBox.addEventListener("click", function() {
            switch(true){
                case i == nb :
                    this.classList.add("box-clicked");
                    if(nb == board.children.length){
                        handleEndGame();
                    }
                    shuffleChildren(board);
                    nb++;
                    break;
                case i > nb:
                    showReaction('error', this)
                    nb = 1;
                    board.querySelectorAll(".box-clicked").forEach(elem => {
                        elem.classList.remove("box-clicked")
                    })
                    shuffleChildren(board);
                    break;
                default: 
                    showReaction("notice", this);
                    break;
            }
        })
    }
    
    shuffleChildren(board)
}

function handleEndGame(){

    clearInterval(chrono);
    board.querySelectorAll(".box").forEach(elem => {
        showReaction("success", elem);
    })

    digits.classList.add('score-result');
    arrayScore.push(timerValue);
    arrayScore.sort((a,b) => a - b);
    if(arrayScore.length > 3) arrayScore.pop()
    localStorage.setItem("scores", JSON.stringify(arrayScore));
    displayScore();
}

function shuffleChildren(parent){
    let children = parent.children;
    let i = children.length, 
        k, 
        temp;
    
    while(--i > 0){
        k = Math.floor(Math.random() * (i+1));
        temp = children[k];
        children[k] = children[i];
        parent.appendChild(temp);
    }
}

function showReaction(type, clickedBox){
    clickedBox.classList.add(type);
    if(type !== "success"){ 
        setTimeout(() => {
            clickedBox.classList.remove(type)
        }, 800) 
    }
}

function displayScore(){
    console.log(arrayScore)
    for(let i = 0; i < 3; i++){
        if(!arrayScore[i]){
            document.querySelector(`.score${i + 1} .value`).textContent = "En attente..";
        } else {
            document.querySelector(`.score${i + 1} .value`).textContent = arrayScore[i].toString().padStart(4, '0').replace(/^(.{2})/, "$1:");
        }
    }
}