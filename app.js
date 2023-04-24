class TodoList {
  constructor(item) {
    this.item = document.querySelector(item);

    this.formBtn = document.querySelector(".form__content .btn");
    this.incompleteTasksList = document.querySelector(".incomplete-tasks__list");
    this.completeTasksList = document.querySelector(".complete-tasks__list");

    this.formBtn.addEventListener("click", (e) => {
      this.addTask(e);
      this.ajaxRequest();
    });

    for (let i = 0; i < this.incompleteTasksList.children.length; i++) {
      this.bindTaskEvents(this.incompleteTasksList.children[i], (e) => {
        this.completeTask(e);
      });
    }

    for (let i = 0; i < this.completeTasksList.children.length; i++) {
      this.bindTaskEvents(this.completeTasksList.children[i], (e) => {
        this.incompleteTask(e);
      });
    }
  }

  createNewTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.classList.add("incomplete-tasks__item");

    listItem.innerHTML = `
      <input class="checkbox" type="checkbox">
      <label class="task-title">${task}</label>
      <input class="task task_text" type="text">
      <button class="btn btn_edit">Edit</button>
      <button class="btn btn_close">
        <img
            class="btn__img"
            src="./remove.svg"
            alt="Icon">
      </button>
    `

    return listItem;
  }

  addTask(e) {
    console.log("Add Task...");

    e.preventDefault();

    if (!this.item.value) return;

    const listItem = this.createNewTaskElement(this.item.value);

    this.incompleteTasksList.appendChild(listItem);

    this.bindTaskEvents(listItem, (e) => {
      this.completeTask(e);
    });

    this.item.value = "";
  }

  editTask() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;

    const editInput = listItem.querySelector(`input[type="text"]`);
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".btn_edit");
    const editMode = listItem.classList.contains("edit-mode");

    if(editMode) {
      label.innerText = editInput.value;
      editBtn.innerText = "Edit";
    } else {
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
    }

    listItem.classList.toggle("edit-mode");
  }

  deleteTask() {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const tasksList = listItem.parentNode;

    tasksList.removeChild(listItem);
  }

  completeTask(e) {
    console.log("Complete Task...");

    const listItem = e.target.parentNode;

    this.completeTasksList.appendChild(listItem);

    this.bindTaskEvents(listItem, (e) => {
      this.incompleteTask(e);
    });

    listItem.classList.remove("incomplete-tasks__item");
    listItem.classList.add("complete-tasks__item");
  }

  incompleteTask(e) {
    console.log("Incomplete Task...");

    const listItem = e.target.parentNode;

    this.incompleteTasksList.appendChild(listItem);

    this.bindTaskEvents(listItem, (e) => {
      this.completeTask(e);
    });

    listItem.classList.add("incomplete-tasks__item");
    listItem.classList.remove("complete-tasks__item");
  }

  ajaxRequest() {
    console.log("AJAX Request");
  }

  bindTaskEvents(taskListItem, checkboxEventHandler) {
    console.log("bind list item events");

    const checkbox = taskListItem.querySelector(`input[type="checkbox"]`);
    const editBtn = taskListItem.querySelector(".btn_edit");
    const closeBtn = taskListItem.querySelector(".btn_close");

  //Bind editTask to edit button.
    editBtn.addEventListener("click", this.editTask);

  //Bind deleteTask to delete button.
    closeBtn.addEventListener("click", this.deleteTask);

  //Bind completeTask to checkBoxEventHandler.
    checkbox.addEventListener("change", (e) => {
      checkboxEventHandler(e);
    });
  }
};

const myTodoList = new TodoList("#new-task");