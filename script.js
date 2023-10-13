document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add-button');
    const pendingTasks = document.getElementById('pending-tasks');
    const completedTasks = document.getElementById('completed-tasks');

    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <div class="task-actions">
                <span>${taskText}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;

        const editButton = taskItem.querySelector('.edit-button');
        const deleteButton = taskItem.querySelector('.delete-button');

        editButton.addEventListener('click', function () {
            editTask(taskItem);
        });

        deleteButton.addEventListener('click', function () {
            deleteTask(taskItem);
        });

        taskItem.addEventListener('click', function () {
            toggleCompleted(taskItem);
        });

        pendingTasks.appendChild(taskItem);
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('span').textContent;
        const updatedTask = prompt('Edit task:', taskText);
        if (updatedTask !== null && updatedTask.trim() !== '') {
            taskItem.querySelector('span').textContent = updatedTask;
        }
    }

    function deleteTask(taskItem) {
        if (confirm('Are you sure you want to delete this task?')) {
            taskItem.remove();
        }
    }

    function toggleCompleted(taskItem) {
        if (taskItem.parentNode === pendingTasks) {
            completedTasks.appendChild(taskItem);
            taskItem.classList.add('completed-task');
        } else {
            pendingTasks.appendChild(taskItem);
            taskItem.classList.remove('completed-task');
        }
    }
});
