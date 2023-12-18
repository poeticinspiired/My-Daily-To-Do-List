function addTask() {
    var task = document.getElementById("newTask").value;
    var category = document.getElementById("taskCategory").value;
    var priority = document.getElementById("taskPriority").value;
    var date = document.getElementById("taskDate").value;

    if (task.trim() === '') {
        alert("Please enter a task!");
        return;
    }

    var li = document.createElement("li");
    li.className = `priority-${priority.toLowerCase()}`;
    li.innerHTML = `<span>${task} - ${category} - ${date}</span>`;
    addTaskButtons(li);

    document.getElementById("taskList").appendChild(li);
    document.getElementById("newTask").value = "";

    saveTasks();
    sortTasks();
}

function addTaskButtons(li) {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function() {
        this.parentElement.remove();
        saveTasks();
    };
    li.appendChild(deleteButton);

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.onclick = function() {
        editTask(this);
    };
    li.appendChild(editButton);
}

// Include the sortTasks function as previously defined

// Include the editTask and saveEdit functions as previously defined

function saveTasks() {
    var tasks = [];
    document.querySelectorAll("#taskList li").forEach(function(task) {
        tasks.push(task.innerHTML);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(function(taskHTML) {
            var li = document.createElement("li");
            li.innerHTML = taskHTML;
            addTaskButtons(li);
            document.getElementById("taskList").appendChild(li);
        });
        sortTasks();
    }
}

window.onload = loadTasks;
