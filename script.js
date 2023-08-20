//SELECTORS
const newTaskInput = document.getElementById("newTask");
const addTaskButton = document.getElementById("addTaskButton");
const taskContainer = document.getElementById("taskContainer");
//create an empty array where we would store our tasks and display them
const tasks = [];

//EVENT LISTENERS
addTaskButton.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
  //   console.log("clicks");
});
newTaskInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    e.preventDefault();
    addTask();
    // console.log("Enters");
  }
});

//FUNCTIONS
function addTask() {
  const newTaskContent = newTaskInput.value.trim(); //trim() removes extra white spaces
  //create a new task object with the content and completion status
  if (newTaskContent !== "") {
    const newTask = { content: newTaskContent, done: false };
    // add the newTask to the tasks array
    tasks.unshift(newTask);

    //clear the input field and the container
    taskContainer.innerHTML = "";
    newTaskInput.value = "";

    //RENDERING EACH TAKS WE CREATE
    tasks.forEach(function (task) {
      //create a task element/container
      const taskElement = document.createElement("div");
      //give it a class for styling
      taskElement.classList.add("tasks");
      //TODO - STYLE ME

      //   if task is 'done' add a 'complete' element for styling
      if (task.done) {
        taskElement.classList.add("complete");
      }

      //create a content element to display the text
      const contentElement = document.createElement("div");
      contentElement.innerHTML = task.content;
      //give the contentElement a style
      contentElement.classList.add("taskContent");
      //TODO - style me
      //append the contentElement into the taskElement
      taskElement.appendChild(contentElement);

      // BUTTONS
      //THIS WILL BE OUR BUTTON CONTAINER - MAKES IT EASIER TO STYLE
      const buttonsElement = document.createElement("div");
      buttonsElement.classList.add("buttons");

      //create the done button
      const doneButton = document.createElement("doneButton");
      doneButton.innerHTML = "Done";
      doneButton.classList.add("doneButton");

      //add a click event to toggle the tasks completion status
      doneButton.addEventListener("click", function () {
        toggleTask(task, contentElement);
        console.log("toggles");
      });
      //append the doneButton into the buttonsElement
      buttonsElement.appendChild(doneButton);

      //create the delete button
      const deleteButton = document.createElement("deleteButton");
      deleteButton.innerHTML = "Delete";
      deleteButton.classList.add("deleteButton");

      //add a click event to delete the task
      deleteButton.addEventListener("click", function () {
        deleteTask(task, taskElement);
        console.log("delete");
      });

      //append the doneButton into the buttonsElement
      buttonsElement.appendChild(deleteButton);

      taskElement.appendChild(buttonsElement);
      //apppend all the elements into the task container
      taskContainer.appendChild(taskElement);
    });
  }
}
//wow
//create the toggle task function
function toggleTask(task, contentElement) {
  task.done = !task.done;
  if (task.done) {
    contentElement.classList.add("complete");
  } else {
    contentElement.classList.remove("complete");
  }
}

//create the delete task function
function deleteTask(task, taskElement) {
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  taskContainer.removeChild(taskElement);
}
