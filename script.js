const board = document.querySelector("#board");
const digits = document.querySelector("#digits");
const box = document.createElement("div");
box.classList.add("box");


const arrayScore = JSON.parse(localStorage.getItem("scores")) || [];

let centi = 0;
let dixi = 0;
let sec = 0;
let min = 0;
let secFormat;
let score;
let chronoTimeout;

displayScore();

startGame();

function chrono(){
    //Centièmes de secondes
    digits.classList.remove("score-result");
    setInterval(() => {
        centi++;
        if(centi > 9) {
            centi = 0;
        }
    }, 10)

    //Dixieme de secondes
    dixi++;
    dixi*10;
    if(dixi > 9) {
        dixi = 0;
        sec++
    }

    //Secondes
    if(sec < 10){
        secFormat = "0" + sec;
    } else {
        secFormat = sec;
    }

    score = secFormat + dixi + centi;
    digits.textContent = score;
    //Réexecute tous les dixieme de seconde
    chronoTimeout = setTimeout(chrono, 100)
}

function startGame(){
    nbBoites = prompt("Veuillez insérer le nombre de boite souhaité !") || 10;
    chrono();
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
    clearTimeout(chronoTimeout);
    digits.classList.add("score-result");
    board.querySelectorAll(".box").forEach(elem => {
        showReaction("success", elem);
    })

    arrayScore.push(parseInt(score));
    arrayScore.sort((a, b) => {
        return a - b
    })
    if(arrayScore.length > 3) arrayScore.pop();
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
    for(let i = 0; i < 3; i++){
        if(!arrayScore[i]){
            document.querySelector(`.score${i + 1}`).textContent = "N°" +i+ " : " + "Indéfini";
        } else {
            document.querySelector(`.score${i + 1}`).textContent = "N°" +i+ " : " + arrayScore[i];
            
        }
    }5
}
