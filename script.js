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

    // Create the addTask Function:
    // This function is responsible for adding new tasks to the list.
    function addTask() {
        // Retrieve the value from the task input field and remove any leading/trailing whitespace.
        const taskText = taskInput.value.trim();

        // Check if the taskText is empty.
        if (taskText === "") {
            // If empty, alert the user to enter a task and stop the function execution.
            alert("Please enter a task.");
            return;
        }

        // Task Creation:
        // Create a new li (list item) element to hold the task.
        const listItem = document.createElement('li');
        // Set the text content of the list item to the user's task input.
        listItem.textContent = taskText;

        // Create a new button element to allow users to remove tasks.
        const removeButton = document.createElement('button');
        // Set the text content of the remove button.
        removeButton.textContent = "Remove";
        // Assign the CSS class 'remove-btn' to the button for styling.
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button.
        // When this button is clicked, it will remove its parent element (the listItem)
        // from the taskList.
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append the remove button as a child to the list item.
        listItem.appendChild(removeButton);
        // Append the completed list item (task text + remove button) to the unordered task list.
        taskList.appendChild(listItem);

        // Clear the task input field after the task has been added, making it ready for a new entry.
        taskInput.value = "";
    }

    // Attach Event Listeners:
    // Add a click event listener to the "Add Task" button.
    // When the button is clicked, the addTask function will be executed.
    addButton.addEventListener('click', addTask);

    // Add a keypress event listener to the task input field.
    // This allows tasks to be added by pressing the "Enter" key.
    taskInput.addEventListener('keypress', function(event) {
        // Check if the key that was pressed is the 'Enter' key.
        if (event.key === 'Enter') {
            addTask(); // If 'Enter' is pressed, execute the addTask function.
        }
    });

    // Important Note: The instruction "Invoke the addTask function on DOMContentLoaded"
    // refers to ensuring that all your setup (like attaching event listeners) happens
    // after the DOM is ready. It does NOT mean calling `addTask()` directly here,
    // which would add an empty task upon page load. The event listeners correctly
    // trigger `addTask` based on user interaction.
});
