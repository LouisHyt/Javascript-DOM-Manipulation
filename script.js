const board = document.querySelector("#board");
const box = document.createElement("div");
box.classList.add("box");

startGame();

function startGame(){
    nbBoites = prompt("Veuillez insérer le nombre de boite souhaité !") || 10;

    let nb = 1;
    let timer = 0; 
    for(let i = 1; i <= nbBoites; i++){
        let newBox = box.cloneNode();
        newBox.textContent = i;
        board.appendChild(newBox);
    
        newBox.addEventListener("click", function() {
            switch(true){
                case i == nb :
                    this.classList.add("box-clicked");
                    if(nb == board.children.length){
                        board.querySelectorAll(".box").forEach(elem => {
                            showReaction("success", elem);
                        })
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
    let timerInterval = setInterval(() => {
        timer++;
        
    }, 1000)
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
