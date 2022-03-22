const inputItem = document.querySelector("#text-id");
inputItem.addEventListener("keydown", (event) => {
    if(event.code === "Enter"){
        addToHtml(inputItem.value);
        inputItem.value = "";
        inputItem.focus();
    }
    console.log(event.code);
});
document.querySelector("#button-id").addEventListener("click", (event) => {
    addToHtml(event.target.id);
});

function addToHtml(inputValue){
    document.querySelector("#output").innerHTML = inputValue;
}