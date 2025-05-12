let boxes=document.querySelectorAll(".box");
let resetButton=document.querySelector("#reset");
let newbtn=document.querySelector("#new");
let masaage=document.querySelector(".msgcontainer");
let msg=document.querySelector("#msg");

const cashDisplay = document.getElementById("cash-display");
const newGameButton = document.getElementById("new");

let cash =100;

const updateCashDisplay = () => {
    cashDisplay.innerText = `Cash: $${cash}`;
    if (cash <= 10) {
        newGameButton.disabled = true; // Disable the button if cash is less than or equal to $1
        newGameButton.style.opacity="0.5";
        newGameButton.style.cursor="not-allowed"; // Disable the button if cash is zero
    }
    else {
        newGameButton.disabled = false;
        newGameButton.style.opacity="1";
        newGameButton.style.cursor="pointer"; // Enable the button if cash is greater than zero
    }
};

const startNewGame = () => { 
    if (cash > 10) {
        cash -= 10; // Deduct $10 for each new game
        updateCashDisplay();
        resetgame();
    }
    else {
        alert("Insufficient cash to start a new game.");
    }
};
newGameButton.addEventListener("click", startNewGame);
updateCashDisplay();

let turnO=true;

 const winpattern=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]];



const resetgame=()=>{
    turnO=true;
    enabledboxes();
    masaage.classList.add("hide");

}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        
        if(turnO){
            box.innerText="O";
            turnO=false;
            
        }
        else{
                box.innerText="X";
                turnO=true;
            }
        box.disabled=true;   
        checkWin();
    });
});

const disabledboxes=()=>{
    for (box of boxes){
        box.disabled=true;
    }
    
}
const enabledboxes=()=>{
    for (box of boxes){
        box.disabled=false;
        box.innerText="";
    }
    
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulation ${winner} You WON `;
    masaage.classList.remove("hide");
    disabledboxes();

}
const checkWin=()=>{
    for(let pattern of winpattern){   
    let pos1=boxes[pattern[0]].innerText;
    let pos2=boxes[pattern[1]].innerText;
    let pos3=boxes[pattern[2]].innerText;
    if(pos1!="" &&pos2!="" &&pos3!=""){
        if(pos1===pos2&&pos2===pos3){
    
            showWinner(pos1);
        }
    }
    }
     
     
};

resetButton.addEventListener("click",resetgame);
newbtn.addEventListener("click",resetgame);

