const inputItem = document.querySelector("#idp");
inputItem.addEventListener("keydown", (event) => {
    if(event.code === "Enter"){
        addToHtml(inputItem.value);
        inputItem.value = "";
        inputItem.focus();
    }
})

function addToHtml(inputValue){
    document.querySelector("#output").innerHTML = inputValue;
}