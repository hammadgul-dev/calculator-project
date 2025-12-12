let resultDisplay = document.querySelector(".display input")
let allBtns = document.querySelectorAll(".buttons-container button")
let actionKeys = document.querySelector(".action-keys")
let currValue = ""
resultDisplay.value = currValue
let audio = new Audio("error-sound.mp3")

allBtns.forEach((btn)=>{
    btn.addEventListener("click" , (e)=>{
        let value = e.currentTarget.dataset.value;
        if(value !== "btn-backspace"){
            currValue += value
            resultDisplay.value = currValue
        }
    })
})

actionKeys.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("btn-clear")){
        resultDisplay.value = ""
        currValue = ""
    }
    else if(e.target.classList.contains("btn-equal")){
       try{
        calculateTotal()
       }
       catch{
        currValue = ""
        resultDisplay.value = "ERROR!"
        resultDisplay.style.color = "red"
        audio.play()
        audio.addEventListener("ended", () => {
            resultDisplay.value = "";
            resultDisplay.style.color = ""
        });
       }
    }
})

function calculateTotal(){
    if(resultDisplay.value !== ""){
        currValue = eval(resultDisplay.value)
        resultDisplay.value = currValue
    }
}

function handleBackspace(){
    currValue = currValue.slice(0, -1);
    resultDisplay.value = currValue;
}

document.querySelector(".btn-backspace")
.addEventListener("click" , handleBackspace)


// KeyBoard Key Handling
document.addEventListener("keydown", (e) => {
    let key = e.key;
    let btn = [...allBtns].find(btnTxt =>btnTxt.dataset.value === key )
    if(btn){
        btn.classList.add("active")
        setTimeout(()=>{ btn.classList.remove("active") },150)
    }
    if((key >= "0" && key <= "9") || ["+", "-", "/", "*", "."].includes(key)){
        currValue += key;
        resultDisplay.value = currValue;
    }
    else if(key === "Enter" || key === "="){
        e.preventDefault();
        calculateTotal();
    }
    else if(key === "Backspace"){
        handleBackspace()
    }
});
