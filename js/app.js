/**
 * Created by kesikandras on 2016.05.24..
 */
(function () {
 var btn_addBacklogItem = document.getElementById("addBacklogItem");
 var itemsHolder = document.getElementById("items");
 var orderID = 1;

var createNewBacklogItem = function (taskString) {
    var item = document.createElement("tr");
    //
    var buttons = document.createElement("td");
    buttons.className = "buttons";

        var addTask = makeButton("addTask", "glyphicon glyphicon-plus")
        buttons.appendChild(addTask);

        var wrench = makeButton("wrench", "glyphicon glyphicon-wrench");
        buttons.appendChild(wrench);

        var trash = makeButton("trash","glyphicon glyphicon-trash");
        buttons.appendChild(trash);

    item.appendChild(buttons);

    var order = document.createElement("td");
    orderID++;
    order.className = "order";
    order.innerText = orderID;

        var taskList = makeButton("taskList", "glyphicon glyphicon-triangle-right pull-right");
        order.appendChild(taskList);
    
    item.appendChild(order);

    var title = document.createElement("td");
    title.className = "title";
    title.innerText = taskString;
    item.appendChild(title);

    var state = document.createElement("td");
    state.className = "state";
    state.innerText = "New";
    item.appendChild(state);

    var effort = document.createElement("td");
    effort.className = "effort";
    item.appendChild(effort);

    var priority = document.createElement("td");
    priority.className = "priority";
    item.appendChild(priority);

    return item;
}

var makeButton = function (buttonClassName, buttonGlyphicon ) {
    var aElement = document.createElement("a");
    aElement.className = buttonClassName;
    aElement.setAttribute("type", "button");
        var span = document.createElement("span");
        span.className = buttonGlyphicon;
        span.setAttribute("aria-hidden", "true");
        aElement.appendChild(span);
    return aElement;
}

var addBacklogItem = function () {
    var currentItem = createNewBacklogItem("cool Codecool");
    itemsHolder.appendChild(currentItem);
    bindBacklogEvents(currentItem);
    
}


var addNewTask = function () {
    console.log("Add new task");
}

var itemSettings = function () {
    console.log("Settings");

}

var itemDelete = function () {
    console.log("Delete Item");
    var listItem = this.parentNode.parentNode;
    var tbody = listItem.parentNode;
    tbody.removeChild(listItem);
}

var showTaskList = function () {
    console.log("Show tasklist");
    console.log(this);
    this.children[0]
    // this.querySelector("a.taskList");
}


var bindBacklogEvents = function (backlogItem){
    console.log("Bind list events");
    var addTaskButton = backlogItem.querySelector("a.addTask");
    var wrenchButton = backlogItem.querySelector("a.wrench");
    var trashButton = backlogItem.querySelector("a.trash");
    var taskListButton = backlogItem.querySelector("a.taskList");

    addTaskButton.addEventListener('click', addNewTask);
    wrenchButton.addEventListener('click', itemSettings);
    trashButton.addEventListener('click', itemDelete);
    taskListButton.addEventListener('click', showTaskList);

}




btn_addBacklogItem.addEventListener("click", addBacklogItem);
    
for(var i= 0; i < itemsHolder.children.length; i++){
    var backlogItem = itemsHolder.children[i];
    bindBacklogEvents(backlogItem);

}
    


})();