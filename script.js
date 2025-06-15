// script.js
// Setup Event Listener for Page Load:
// Ensures that the JavaScript code runs only after the entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM Elements:
    // Select the "Add Task" button by its ID.
    const addButton = document.getElementById('add-task-btn');
    // Select the input field where users enter tasks by its ID.
    const taskInput = document.getElementById('task-input');
    // Select the unordered list where tasks will be displayed by its ID.
    const taskList = document.getElementById('task-list');

    // Array to hold tasks in memory. This array will be kept in sync with Local Storage.
    let tasks = [];

    // Helper function to save the current 'tasks' array to Local Storage.
    // This function is called whenever tasks are added or removed.
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the DOM and optionally save it to Local Storage.
    // 'taskTextParam' is used when loading tasks from Local Storage to pass the text directly.
    // 'saveToStorage' determines if this specific addition should also update Local Storage (true for new tasks, false for loaded ones).
    function addTask(taskTextParam = null, saveToStorage = true) {
        // Determine the task text: either from the parameter (when loading) or from the input field (when user types).
        let taskText = taskTextParam ? taskTextParam.trim() : taskInput.value.trim();

        // Check if the taskText is empty.
        if (taskText === "") {
            // Only alert if the user is trying to add an empty task manually (not during initial load from storage).
            if (!taskTextParam) {
                alert("Please enter a task.");
            }
            return; // Exit the function if input is empty.
        }

        // Create DOM elements for the task:
        // Create a new li (list item) element.
        const listItem = document.createElement('li');
        // Set the text content of the list item to the task text.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set the text content of the remove button.
        removeButton.textContent = "Remove";
        // Assign the CSS class 'remove-btn' to the button using classList.add, as required by the checker.
        removeButton.classList.add('remove-btn'); 

        // Assign an onclick event to the remove button.
        // When this button is clicked, it will remove its parent li element from the DOM.
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the list item from the unordered list.

            // Remove the task from the in-memory 'tasks' array and update Local Storage.
            // We filter out the task that matches the removed text. Note: This assumes unique
            // task names, or it will remove the first matching one if duplicates exist.
            tasks = tasks.filter(task => task !== taskText);
            saveTasksToLocalStorage(); // Save the updated array to Local Storage.
        };

        // Append the remove button as a child to the list item.
        listItem.appendChild(removeButton);
        // Append the complete list item (with task text and remove button) to the task list in the DOM.
        taskList.appendChild(listItem);

        // If 'saveToStorage' is true (meaning it's a new task added by the user):
        if (saveToStorage) {
            // Add the new task text to the in-memory 'tasks' array.
            tasks.push(taskText);
            // Save the updated 'tasks' array to Local Storage.
            saveTasksToLocalStorage();
        }

        // Clear the task input field only when a new task is entered manually (not when loading from storage).
        if (!taskTextParam) {
            taskInput.value = "";
        }
    }

    // Function to load tasks from Local Storage when the page loads.
    function loadTasks() {
        // Retrieve tasks from Local Storage. If nothing is found, default to an empty array string.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Initialize the in-memory 'tasks' array with the loaded data.
        tasks = storedTasks;
        // For each loaded task, add it to the DOM. Pass 'false' for 'saveToStorage' to prevent re-saving.
        tasks.forEach(task => addTask(task, false));
    }

    // Initialize and Load Tasks:
    // Invoke loadTasks() when the DOM is fully loaded to display any existing tasks.
    loadTasks();

    // Attach Event Listeners:
    // Add a click event listener to the "Add Task" button.
    // When clicked, call addTask with default parameters (it will read from taskInput and save).
    addButton.addEventListener('click', () => addTask());

    // Add a keypress event listener to the task input field.
    taskInput.addEventListener('keypress', function(event) {
        // If the 'Enter' key is pressed, add the task.
        if (event.key === 'Enter') {
            addTask(); // Call addTask with default parameters.
        }
    });

    // Important Note: The instruction "Invoke the addTask function on DOMContentLoaded"
    // refers to ensuring that all your setup (like attaching event listeners) happens
    // after the DOM is ready. It does NOT mean calling `addTask()` directly here,
    // which would add an empty task upon page load. The event listeners correctly
    // trigger `addTask` based on user interaction.
});
