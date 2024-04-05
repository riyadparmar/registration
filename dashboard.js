function updateClock() {
    const now = new Date();
    let hour = now.getHours().toString().padStart(2, 0);
    const meridian = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    hour = hour.toString().padStart(2, 0);
    const min = now.getMinutes().toString().padStart(2, 0);
    const sec = now.getSeconds().toString().padStart(2, 0);
    const timeString = `${hour}: ${min}: ${sec} ${meridian}`;
    document.getElementById("clock").textContent = timeString;
}
updateClock();
setInterval(updateClock, 1000);

document.addEventListener('DOMContentLoaded', function () {
    displayUserProfile();
    displayTasks();
});

function displayUserProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        document.getElementById('profileName').textContent = user.name || 'N/A';
        document.getElementById('profileEmail').textContent = user.email || 'N/A';
        document.getElementById('profileMobile').textContent = user.mobile || 'N/A';
        document.getElementById('profileDob').textContent = user.dob || 'N/A';
        document.getElementById('profileGender').textContent = user.gender || 'N/A';
    }
}

function toggleEditProfileForm() {
    const form = document.getElementById('editProfileForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        document.getElementById('editName').value = user.name;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editMobile').value = user.mobile;
        document.getElementById('editDob').value = user.dob;
        document.getElementById('editGender').value = user.gender;
    }
}

function editProfile(event) {
    event.preventDefault(); 
    const originalUserData = JSON.parse(localStorage.getItem('currentUser'));

    const updatedUserData = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        mobile: document.getElementById('editMobile').value,
        dob: document.getElementById('editDob').value,
        gender: document.getElementById('editGender').value,
        password: originalUserData.password
    };

    if (originalUserData.email !== updatedUserData.email) {
        localStorage.removeItem(originalUserData.email);
        localStorage.setItem('currentUserKey', updatedUserData.email);
    }
    localStorage.setItem(updatedUserData.email, JSON.stringify(updatedUserData));
    localStorage.setItem('currentUser', JSON.stringify(updatedUserData));

    displayUserProfile();
    toggleEditProfileForm(); 
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const tasks = JSON.parse(localStorage.getItem(user.email + '_tasks')) || [];
    const tasksListElement = document.getElementById('tasksList');
    tasksListElement.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
            <span id="taskText_${index}">${task.text}</span>
            <button onclick="deleteTask(${index})" style="margin:20px">Delete</button>
            <button onclick="toggleTaskCompletion(${index})" style="margin:20px">${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
            <button onclick="editTask(${index})" style="margin:20px">Edit</button>
        `;
        if (task.completed) {
            taskElement.style.backgroundColor = 'lightgrey';
        }
        tasksListElement.appendChild(taskElement);
    });
}

function editTask(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let tasks = JSON.parse(localStorage.getItem(user.email + '_tasks'));

    if (tasks[index].completed) {
        alert("Completed tasks cannot be edited.");
        return;
    }

    const newText = prompt("Edit the task description:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        localStorage.setItem(user.email + '_tasks', JSON.stringify(tasks));
        displayTasks();
    } else if (newText !== null) {
        alert("Task description cannot be empty.");
    }
}


function addTask() {
    const user = JSON.parse(localStorage.getItem('currentUser')); 
    let tasks = JSON.parse(localStorage.getItem(user.email + '_tasks')) || [];

    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() === "") {
        alert("Task description cannot be empty.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskInput.value.trim(),
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem(user.email + '_tasks', JSON.stringify(tasks));
    displayTasks(); 
    taskInput.value = '';
}

function deleteTask(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let tasks = JSON.parse(localStorage.getItem(user.email + '_tasks'));

    tasks.splice(index, 1); 
    localStorage.setItem(user.email + '_tasks', JSON.stringify(tasks)); 
    displayTasks();
}

function toggleTaskCompletion(index) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let tasks = JSON.parse(localStorage.getItem(user.email + '_tasks'));

    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem(user.email + '_tasks', JSON.stringify(tasks));
    displayTasks();
}
