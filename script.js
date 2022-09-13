//Variables
let current_state = document.querySelector('#current_state');
let reset = document.querySelector('#reset');
let tiles = Array.from(document.querySelectorAll('.tile'));
const doggo = 'Puppy'
const catto = 'Kitten';
let currentPlayer = doggo;
let board = Array(9).fill(null);
let i = 0;
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

window.addEventListener('load', startGame);
reset.addEventListener('click', resetGame);

function startGame() {
    tiles.forEach(tile => tile.addEventListener('click', tileClicked));
}

function tileClicked(e){
    const id = e.target.id;

    if(!board[id]){   
        board[id] = currentPlayer;
        
        //Puts different symbol inside clicked tile depending of current player
        if(currentPlayer == doggo){
            dogIcon = document.createElement('i');
            dogIcon.classList.add('fa-solid', 'fa-dog');
            e.target.appendChild(dogIcon);
        }else{
            catIcon = document.createElement('i');
            catIcon.classList.add('fa-solid', 'fa-cat');
            e.target.appendChild(catIcon);
        }
        
        //Changing the game state
        if(endOfGame() !==false){       //If EOG function returns anything else then false display win massage and block clicking on tiles
            current_state.innerHTML = currentPlayer + ' has won!';
            let winner = endOfGame();
            
            winner.map(tile => tiles[tile].classList.add('win'));
            tiles.forEach(tile => {tile.classList.add('noclick')});;
        }
        
        //If the endOfGame is equal to false do this
        else{
            //If there were 9 rounds without a winner set the game
            if(i==8){    
             tiles.forEach(tile => {tile.classList.add('noclick')});
             current_state.innerHTML = 'Draw';
            }
            //Change the current player every round and increase i variable by 1
            else{
                i++
                if (currentPlayer == doggo){
                currentPlayer = catto;
                current_state.innerHTML = "Kitten's round";
                }else{
                currentPlayer = doggo;
                current_state.innerHTML = "Puppy's round";
                }
            }
        }
    }
}

//Function that check if one of the winning condition is met
function endOfGame(){
    for(const condition of winningConditions){
        let [a, b, c] = condition;

        if(board[a] &&(board[a] == board[b] && board[a] == board[c])){
            return [a,b,c];
        }
    }
    return false;
}

//Reset the game to it beggining state
function resetGame(){
    board.fill(null);
    tiles.forEach(tile => {tile.innerText= ''});
    tiles.forEach(tile => {tile.classList.remove('win', 'noclick')});
    current_state.innerHTML = 'Start the game';
    i = 0;
    currentPlayer = doggo;
}
