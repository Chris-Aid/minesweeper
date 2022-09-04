let gameStarted = false;

let arrBoard = [],
    level = 10;

const board = document.getElementById('divBoard');

function init() {
    renderRows();    
    setBombs(level);
    setNeighbours();
}

function renderRows() {
    board.innerHTML='';

    for (let x = 0; x < level; x++) {
        board.innerHTML += `<div class="rows" id="row_${x}"></div>`;
        renderCols(x);
    }  
}

function renderCols(row){
    let rowPos = document.getElementById('row_' + row);

    for (let y = 0; y < level; y++) {
        let objField = {                
            x: row, // for easier development you can add x or y only as variable
            y,
            index: row * level + y,                
            hasBomb: false,
            neighbours: 0,
            isClicked: false,
            flag: false
        }

        arrBoard.push(objField);
        rowPos.innerHTML += `<div onclick="fieldClicked(${objField.x}, ${objField.y})" class="${getFieldBackgroudImg(objField)}"> ${objField.index} </div>`
    }  
}

function getFieldBackgroudImg(f){
    
    if(!f.isClicked)
        return ``;
    else{
        if(f.hasBomb)
    }
}

function fieldClicked(x,y, i) {
    if(!gameStarted) {
        myTimer();        
    }
    gameStarted = true;

    showFields(x, y);

}

function showFields(x ,y) {
    let field = getField(x, y);
    if(field && (!field.hasBomb || field.neighbours == 0)) {
        field.isClicked = true;
        showFields(x - 1 ,y - 1);
        showFields(x ,y - 1);
        showFields(x + 1 ,y - 1);
    }
    
    console.log(i)
}

function setFlag(index){
    // if(arrBoard[index].flag){
    //     arrBoard[index].flag ==false; 
    // }else{
    //     arrBoard[index].flag ==true;
    // }
    // shorter:
    arrBoard[index].flag = !arrBoard[index].flag;
}

/**
 * sets the given amount of bombs
 */
function setBombs(amount) {
    let z = 0;
    do {
        let fld = parseInt(Math.random() * arrBoard.length);
        if(arrBoard[fld].hasBomb == false) {
            arrBoard[fld].hasBomb = true;
            z++;
        }
    } while (z < amount);
}

/**
 * sets the neighbours of each field that contains a bomb
 * and increases the amount ('.neighbours')
 */
function setNeighbours() {
    for (let i = 0; i < arrBoard.length; i++) {
        const field = arrBoard[i];
        if (field.hasBomb) {
            setCounter(field.x-1, field.y); // left field
            setCounter(field.x+1, field.y); // right field
            setCounter(field.x, field.y-1); // top
            setCounter(field.x, field.y+1); // bottom
            // y...
            setCounter(field.x-1, field.y-1); // top left 
            setCounter(field.x+1, field.y-1); // top right
            setCounter(field.x-1, field.y+1); // bottom left
            setCounter(field.x+1, field.y+1); // bottom right
        } 
    }
}

/**
 * determines the neighbour fields of a bomb field
 */
function setCounter(x, y) {
    let fld = getField(x,y);
    if (fld && !fld.hasBomb) fld.neighbours++;
}

/**
 * returns a reference of a field of the given coordinates
 */
function getField(x, y){
   return arrBoard.find( f => f.x == x && f.y == y );
}