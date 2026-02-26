let tasks = [];

window.onload = function() {
    setGreeting();
    setDate();
};

function setGreeting() {
    let name = localStorage.getItem("studentName");

    if (!name) {
        name = prompt("Enter your name:");
        localStorage.setItem("studentName", name);
    }

    let hour = new Date().getHours();
    let greetingText = "Hello";

    if (hour < 12) greetingText = "Good Morning";
    else if (hour < 18) greetingText = "Good Afternoon";
    else greetingText = "Good Evening";

    document.getElementById("greeting").innerText =
        greetingText + ", " + name + " 👋";
}

function setDate() {
    let today = new Date();
    document.getElementById("date").innerText =
        "📅 " + today.toDateString();
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let priority = document.getElementById("priority").value;

    if (taskInput.value === "") return;

    let task = {
        text: taskInput.value,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";
    displayTasks("all");
    checkEmptyState();
}

function displayTasks(filter) {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filtered = tasks;

    if (filter === "completed") {
        filtered = tasks.filter(t => t.completed);
    } else if (filter === "pending") {
        filtered = tasks.filter(t => !t.completed);
    }

    filtered.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task.text + " (" + task.priority + ")";
        
        if (task.completed) {
            li.classList.add("completed");
        }

        li.onclick = function() {
    task.completed = !task.completed;
    displayTasks();
};

        taskList.appendChild(li);
    });

   updateProgress();
}

function filterTasks(type) {
    displayTasks(type);
}
function updateProgress() {
    let completed = tasks.filter(t => t.completed).length;
    let percent = tasks.length === 0 ? 0 :
        Math.round((completed / tasks.length) * 100);

    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressText").innerText =
        percent + "% Completed";

    let name = localStorage.getItem("studentName") || "Student";

    if (percent === 100 && tasks.length > 0) {
        document.getElementById("popupMessage").innerText =
            " "+ name + "! All tasks completed today! 🚀";
        document.getElementById("popup").style.display = "flex";
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

const quotes = [
    "Consistency beats intensity.",
    "Small progress is still progress.",
    "Discipline creates freedom.",
    "Focus today, succeed tomorrow."
];

document.getElementById("quote").innerText =
    quotes[Math.floor(Math.random() * quotes.length)];

function checkEmptyState() {
    const tasks = document.querySelectorAll("#taskList li");
    const emptyMessage = document.getElementById("emptyMessage");

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}