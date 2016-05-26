/**
 * Created by kesikandras on 2016.05.24..
 */
(function () {
 var btn_addBacklogItem = document.getElementById("addBacklogItem");
 var itemsHolder = document.getElementById("items");
 var orderID = 0;
 var backlogID = 0;

var createNewBacklogItem = function (taskString) {
    var item = document.createElement("tr");
    backlogID++;
    item.id = "backlogItem_" + backlogID;
    //
    var buttons = document.createElement("td");
    buttons.className = "buttons";

        var addTask = makeButton("addTask", "glyphicon glyphicon-plus");
        addTask.setAttribute("data-toggle","modal");
        addTask.setAttribute("data-target", "#newTaskItem");
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
        taskList.style.display = "none";
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

var createNewTaskItem = function () {
    var item = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.setAttribute("colspan","2");
    item.appendChild(td1);
    var title = document.createElement("td");
    title.setAttribute("colspan","1");
    title.innerText = "New Task for Login";
    item.appendChild(title);
    var state = document.createElement("td");
    state.setAttribute("colspan", "3");
    state.innerText = "To Do";
    item.appendChild(state);
    return item;
};

var addBacklogItem = function () {
    var currentBacklogItem = createNewBacklogItem("cool Codecool");
    itemsHolder.appendChild(currentBacklogItem);
    bindBacklogEvents(currentBacklogItem);
}


var addNewTask = function () {
    console.log("Add new task");
    // $("#newTaskItem").load("NewTaskForm.html");
    var backlogItem = this.parentNode.parentNode;
    var currentTaskItem = createNewTaskItem();
    currentTaskItem.className += backlogItem.id;
    var icon = backlogItem.childNodes[1].childNodes[1].firstChild;
    itemsHolder.insertBefore(currentTaskItem, backlogItem.nextSibling);
    if(icon.parentNode.style.display == "none"){
        icon.parentNode.style.display = "inline";
    }
    if(icon.className === "glyphicon glyphicon-triangle-right pull-right"){
        icon.className = "glyphicon glyphicon-triangle-bottom pull-right";}
}

var itemSettings = function () {
    console.log("Settings");

}

var itemDelete = function () {
    console.log("Delete Item");
    var listItem = this.parentNode.parentNode;
    var itemsToDelete = [];
    for(var i= 0; i < itemsHolder.children.length; i++){
        var tr = itemsHolder.children[i];
        if( itemsHolder.children[i].className === listItem.id) {
            itemsToDelete.push(itemsHolder.children[i]);
        }
    }
    for(item in itemsToDelete){
        itemsToDelete[item].remove();
    }
    itemsHolder.removeChild(listItem);
    // rewriteOrder();
}

var showTaskList = function () {
    console.log("Show tasklist");
    var listItem = this.parentNode.parentNode;
    console.log(this);
    if(this.firstChild.className === "glyphicon glyphicon-triangle-right pull-right"){
        this.firstChild.className = "glyphicon glyphicon-triangle-bottom pull-right";
        for(var i= 0; i < itemsHolder.children.length; i++){
            var taskitem = itemsHolder.children[i];
            if(itemsHolder.children[i].className === listItem.id){
                itemsHolder.children[i].style.display = "table-row";
            }
        }
    }
    else{
        this.firstChild.className = "glyphicon glyphicon-triangle-right pull-right";
        for(var i= 0; i < itemsHolder.children.length; i++){
            var taskitem = itemsHolder.children[i];
            if(itemsHolder.children[i].className === listItem.id){
                itemsHolder.children[i].style.display = "none";
            }
        }
    }


}

var rewriteOrder = function () {
    for(var i= 0; i < itemsHolder.children.length; i++){
        var properid = itemsHolder.children[i].id.substr(0,12);
        if( properid === "backlogItem_"){
        itemsHolder.children[i].children[1].innerText=i+1;}
    }
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


$("#newBacklogItem").load("NewBackLogItem.html");
$("#loginForm").load("login.html");
$("#newTaskItem").load("NewTaskForm.html");
// $('#loginForm').modal('show');
    
btn_addBacklogItem.addEventListener("click", addBacklogItem);
    
for(var i= 0; i < itemsHolder.children.length; i++){
    var backlogItem = itemsHolder.children[i];
    bindBacklogEvents(backlogItem);

}

})();