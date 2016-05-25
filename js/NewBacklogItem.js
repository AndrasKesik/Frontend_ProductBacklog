var addItem = document.getElementById("addItem");
var itemName = document.getElementById("itemName");

function disableButton(bool) {
    addItem.disabled = bool; }

function borderColor() {
    if (this.value.length < 3 || this.value.length > 50) {
        itemName.classList.remove("greenBorder");
        itemName.classList.add("redBorder");
        disableButton(true); }
    else {
        itemName.classList.remove("redBorder");
        itemName.classList.add("greenBorder");
        disableButton(false); } }

itemName.addEventListener("keyup", disableButton);
itemName.addEventListener("keyup", borderColor);