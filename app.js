import { createApp } from 'vue';

createApp({
  data() {
    return {
      todoLists: [
        { id: 1, name: "ToDo List" },
        { id: 2, name: "Not ToDo List" },
      ],
      tasks: [
        { id: 1, name: "Go shopping", due: "", isCompleted: false, isFlagged: false, color: "black", listId: 1 },
        { id: 2, name: "Doing chores", due: "", isCompleted: false, isFlagged: false, color: "black", listId: 1 },
        { id: 3, name: "Doing homework", due: "", isCompleted: false, isFlagged: false, color: "black", listId: 1 },
        { id: 4, name: "Coding program", due: "", isCompleted: false, isFlagged: false, color: "black", listId: 1 },
        { id: 5, name: "Work too hard", due: "", isCompleted: false, isFlagged: false, color: "black", listId: 2 },
        { id: 6, name: "Play harder", due: "", isCompleted: false, isFlagged: false, color: "black", listId: 2 },
      ],
      editTask: {
        index: null,
        name: "",
        due: "",
        isFlagged: false,
        color: "black",
        listId: null,
      },
      deleteTaskId: null,
      deleteListId: null,
      newListName: "",
      editList: {
        name: "",
        id: null,
      },
      filters: [],
      sorts: [],
      newTask: {
        id: null,
        name: "",
        due: "",
        isCompleted: false,
        isFlagged: false,
        color: "black",
        listId: null,
      },
      createdLists: 2,
      createdTasks: 6,
    }
  },
  created() {
    this.todoLists.forEach(list => {
      this.filters.push({
        listId: list.id,
        hideCompletedTasks: false,
        showOnlyFlaggedTasks: false,
      });
      this.sorts.push({
        listId: list.id,
        sortType: "0",
      })
    });
  },
  methods: {
    alert(message, style = "is-danger") {
      let alertElem = document.createElement("div");
      alertElem.classList.add("notification", style);
      let messageElem = document.createElement("p");
      messageElem.innerHTML = message;
      alertElem.appendChild(messageElem);
      document.getElementById("alert").appendChild(alertElem);
      setTimeout(() => {
        alertElem.remove();
      }, 2000);
    },
    showEditTaskModal(task) {
      document.getElementById("editTaskModal").classList.add("is-active");
      this.editTask.name = task.name;
      this.editTask.id = task.id;
      this.editTask.color = task.color;
      this.editTask.isFlagged = task.isFlagged;
      this.editTask.due = task.due;
      this.editTask.listId = task.listId;
    },
    hideEditTaskModal() {
      document.getElementById("editTaskModal").classList.remove("is-active");
    },
    saveEditTask() {
      if (this.editTask.name === "") {
        this.alert("Task name cannot be empty");
        return;
      }

      if (this.editTask.listId === null) {
        this.alert("Please select a list");
        return;
      }

      let dueRegex = /\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/g;

      if (!this.editTask.due.match(dueRegex) && this.editTask.due !== "") {
        this.alert("Please enter a valid date");
        return;
      }

      let colors = ['black', 'red', 'green'];

      if (colors.indexOf(this.editTask.color) === -1) {
        this.alert("Please enter a valid color");
        return;
      }

      let task = this.tasks.filter(task => task.id === this.editTask.id)[0];
      task.name = this.editTask.name;
      task.color = this.editTask.color;
      task.due = this.editTask.due;
      task.isFlagged = this.editTask.isFlagged;
      task.listId = this.editTask.listId;

      this.editTask.name = "";
      this.editTask.index = null;
      this.editTask.color = "";
      this.editTask.due = "";
      this.editTask.isFlagged = false;
      this.editTask.listId = null;

      this.alert("Task edited successfully", "is-success");

      this.hideEditTaskModal();
    },
    showDeleteTaskModal(task) {
      document.getElementById("deleteTaskModal").classList.add("is-active");
      document.getElementById("deleteTaskName").innerHTML = `Are you sure you want to delete "${task.name}"?`;
      this.deleteTaskId = task.id;
    },
    hideDeleteTaskModal() {
      document.getElementById("deleteTaskModal").classList.remove("is-active");
    },
    confirmDeleteTask() {
      this.tasks.splice(this.tasks.indexOf(this.tasks.filter(task => task.id === this.deleteTaskId)[0]), 1);
      this.deleteTaskId = null;

      this.alert("Task deleted successfully", "is-success");

      this.hideDeleteTaskModal();
    },
    addNewTask() {
      if (this.newTask.name === "") {
        this.alert("Task name cannot be empty");
        return;
      }

      if (this.newTask.listId === null) {
        this.alert("Please select a list");
        return;
      }

      let dueRegex = /\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/g;

      if (!this.newTask.due.match(dueRegex) && this.newTask.due !== "") {
        this.alert("Please enter a valid date");
        return;
      }

      let colors = ['black', 'red', 'green'];
      if (colors.indexOf(this.newTask.color) === -1) {
        this.alert("Please enter a valid color");
        return;
      }

      this.tasks.push({
        id: ++this.createdTasks,
        name: this.newTask.name,
        isCompleted: false,
        color: this.newTask.color,
        isFlagged: this.newTask.isFlagged,
        due: this.newTask.due,
        listId: this.newTask.listId,
      });

      this.alert("Task added successfully", "is-success");

      this.newTask.name = "";
      this.newTask.color = "black";
      this.newTask.isFlagged = false;
      this.newTask.due = "";
      this.newTask.listId = null;
    },
    showNewListModal() {
      document.getElementById("newListModal").classList.add("is-active");
    },
    hideNewListModal() {
      this.newListName = "";
      document.getElementById("newListModal").classList.remove("is-active");
    },
    addNewList() {
      if (this.newListName === "") {
        this.alert("List name cannot be empty");
        return;
      }
      this.todoLists.push({
        id: ++this.createdLists,
        name: this.newListName,
      });
      this.filters.push({
        listId: this.createdLists,
        hideCompletedTasks: false,
        showOnlyFlaggedTasks: false,
      });
      this.sorts.push({
        listId: this.createdLists,
        sortType: "0",
      });

      this.alert("List added successfully", "is-success");

      this.hideNewListModal();
    },
    showEditListModal(list) {
      document.getElementById("editListModal").classList.add("is-active");
      this.editList.name = list.name;
      this.editList.id = list.id;
    },
    hideEditListModal() {
      document.getElementById("editListModal").classList.remove("is-active");
    },
    saveEditList() {
      if (this.editList.name === "") {
        this.alert("List name cannot be empty");
        return;
      }
      this.todoLists.filter(list => list.id === this.editList.id)[0].name = this.editList.name;
      this.editList.name = "";
      this.editList.id = null;

      this.alert("List edited successfully", "is-success");

      this.hideEditListModal();
    },
    showDeleteListModal(list) {
      document.getElementById("deleteListModal").classList.add("is-active");
      document.getElementById("deleteListName").innerHTML = `Are you sure you want to delete "${list.name}"?`;
      this.deleteListId = list.id;
    },
    hideDeleteListModal() {
      document.getElementById("deleteListModal").classList.remove("is-active");
    },
    confirmDeleteList() {
      this.todoLists.splice(this.todoLists.indexOf(this.todoLists.filter(list => list.id === this.deleteListId)[0]), 1);
      this.tasks = this.tasks.filter(task => task.listId !== this.deleteListId);
      this.filters = this.filters.filter(filter => filter.listId !== this.deleteListId);
      this.sorts = this.sorts.filter(sort => sort.listId !== this.deleteListId);
      this.deleteListId = null;

      this.alert("List deleted successfully", "is-success");

      this.hideDeleteListModal();
    },
  },
  computed: {
    completedTaskCount() {
      return this.tasks.filter(task => task.isCompleted).length;
    },
    incompleteTaskCount() {
      return this.tasks.length - this.completedTaskCount;
    },
    flaggedTaskCount() {
      return this.tasks.filter(task => task.isFlagged).length;
    },
    filteredTasks() {
      let allFilters = [];
      this.todoLists.forEach(list => {
        let filterPerList = this.tasks.filter(task => task.listId === list.id);

        // filter tasks
        this.filters.filter(item => list.id === item.listId).forEach(filter => {
          if (filter.hideCompletedTasks) {
            filterPerList = filterPerList.filter(task => !task.isCompleted);
          }
          if (filter.showOnlyFlaggedTasks) {
            filterPerList = filterPerList.filter(task => task.isFlagged);
          }
        });

        // sort tasks
        this.sorts.filter(sort => sort.listId === list.id).forEach(sort => {
          // sort alphabetically
          filterPerList.sort((a, b) => a.name.localeCompare(b.name));

          // sort incomplete tasks
          if (sort.sortType === "1") {
            filterPerList.sort((a, b) => {
              if (!a.isCompleted && b.isCompleted) {
                return -1;
              }
              if (a.isCompleted && !b.isCompleted) {
                return 1;
              }
              return 0;
            });
          }

          // sort flagged task first
          if (sort.sortType === "2") {
            filterPerList.sort((a, b) => {
              if (a.isFlagged && !b.isFlagged) {
                return -1;
              }
              if (!a.isFlagged && b.isFlagged) {
                return 1;
              }
              return 0;
            });
          }

          // sort by due date (ascending)
          if (sort.sortType === "3") {
            filterPerList.sort((a, b) => {
              if (a.due === "" && b.due !== "") {
                return 1;
              }
              if (a.due !== "" && b.due === "") {
                return -1;
              }
              if (a.due < b.due) {
                return -1;
              }
              if (a.due > b.due) {
                return 1;
              }
              return 0;
            });
          }
        });

        allFilters.push(...filterPerList)
      });
      return allFilters;
    }
  },
}).mount("#app");
