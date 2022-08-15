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


function startGame() 
{
    tiles.forEach(tile => tile.addEventListener('click', tileClicked));
}


function tileClicked(e)
{
    const id = e.target.id;

    if(!board[id])
    {   
        board[id] = currentPlayer;
        
        if(currentPlayer == doggo)
        {
            dogIcon = document.createElement('i');
            dogIcon.classList.add('fa-solid', 'fa-dog');
            e.target.appendChild(dogIcon);

        }

        else
        {
            catIcon = document.createElement('i');
            catIcon.classList.add('fa-solid', 'fa-cat');
            e.target.appendChild(catIcon);
        }
        

        if(endOfGame() !==false)
        {
            current_state.innerHTML = currentPlayer + ' has won!';
            let winner = endOfGame();
            
            winner.map(tile => tiles[tile].classList.add('win'));
            tiles.forEach(tile => {tile.classList.add('noclick')});;

        }

        else
        {
            if(i==8)
            {    
             tiles.forEach(tile => {tile.classList.add('noclick')});
             current_state.innerHTML = 'Draw';
            }

            else
            {
                i++
                if (currentPlayer == doggo)
                {
                currentPlayer = catto;
                current_state.innerHTML = "Kitten's round";
                }

                else
                {
                currentPlayer = doggo;
                current_state.innerHTML = "Puppy's round";
                 }
            }
        
        }

    }
}

function endOfGame()
{
    for(const condition of winningConditions)
    {
        let [a, b, c] = condition;

        if(board[a] &&(board[a] == board[b] && board[a] == board[c]))
        {
            return [a,b,c];
        }
    }

    
    return false;
}

function resetGame()
{
    board.fill(null);

    tiles.forEach(tile => {tile.innerText= ''});

    tiles.forEach(tile => {tile.classList.remove('win', 'noclick')});

    current_state.innerHTML = 'Start the game';

    i = 0;

    currentPlayer = doggo;
}
