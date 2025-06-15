// script.js
// Setup Event Listener for Page Load:
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    // Use document.getElementById to select the "Add Task" button.
    const addButton = document.getElementById('add-task-btn');
    // Select the input field where users enter tasks (id="task-input").
    const taskInput = document.getElementById('task-input');
    // Select the unordered list (id="task-list") that will display the tasks.
    const taskList = document.getElementById('task-list');

    // Create the addTask Function:
    // This function will be responsible for adding new tasks to the list.
    function addTask() {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty ("").
        if (taskText === "") {
            // If it is empty, use alert to prompt the user to enter a task.
            alert("Please enter a task.");
            return; // Exit the function if input is empty
        }

        // Task Creation:
        // Create a new li (list item) element.
        const listItem = document.createElement('li');
        // Set its textContent to the retrieved taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove".
        removeButton.textContent = "Remove";
        // Give it a class name of 'remove-btn' for styling.
        removeButton.className = 'remove-btn';

        // Task Removal:
        // Assign an onclick event to the remove button.
        // When this button is clicked, it will remove its parent li element from the taskList.
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the parent listItem from the taskList
        };

        // Append the remove button to the li element.
        listItem.appendChild(removeButton);
        // Append the newly created li element (which now contains the task text and remove button)
        // to the unordered task list.
        taskList.appendChild(listItem);

        // Clear the task input field by setting its value to an empty string.
        taskInput.value = "";
    }

    // Attach Event Listeners:
    // Add an event listener to the "Add Task" button. When clicked, it will call the addTask function.
    addButton.addEventListener('click', addTask);

    // Add an event listener to the task input field for the 'keypress' event.
    taskInput.addEventListener('keypress', function(event) {
        // Inside this event listener, check if the pressed key is the 'Enter' key.
        if (event.key === 'Enter') {
            addTask(); // If 'Enter' is pressed, call the addTask function.
        }
    });

    // Important Note regarding DOMContentLoaded and addTask:
    // The task instruction "Invoke the addTask function on DOMContentLoaded" means that all
    // the setup (like selecting elements and attaching event listeners) should happen
    // after the HTML document is fully loaded.
    // However, calling `addTask()` directly here would add an empty task on page load.
    // Instead, `addTask` is designed to be called by user actions (button click or Enter keypress),
    // which are correctly set up via the event listeners above.
    // So, no direct call to `addTask()` is needed outside the event listeners.
});
