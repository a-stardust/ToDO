document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const inputField = document.getElementById('inputField');
    const timeField = document.getElementById('timeField');
    const bulletList = document.getElementById('bulletList');

    const addTask = () => {
        const inputValue = inputField.value.trim();
        const timeValue = timeField.value;

        if (inputValue && timeValue) {
            const listItem = document.createElement('li');

            const checkboxContainer = document.createElement('label');
            checkboxContainer.className = 'checkbox-container';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';

            checkboxContainer.appendChild(checkbox);

            const textSpan = document.createElement('span');
            textSpan.textContent = inputValue;
            textSpan.contentEditable = true;
            textSpan.className = 'task-text';

            const timeSpan = document.createElement('span');
            timeSpan.textContent = timeValue;
            timeSpan.className = 'time';

            const timeInput = document.createElement('input');
            timeInput.type = 'time';
            timeInput.className = 'time-input';
            timeInput.style.display = 'none';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

            listItem.appendChild(checkboxContainer);
            listItem.appendChild(textSpan);
            listItem.appendChild(timeSpan);
            listItem.appendChild(timeInput);
            listItem.appendChild(deleteButton);

            // Add event listener to handle the blur on Enter key press in editable bullet point
            textSpan.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    textSpan.blur();
                }
            });

            // Add event listener to handle the checkbox change
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    textSpan.style.textDecoration = 'line-through';
                } else {
                    textSpan.style.textDecoration = 'none';
                }
            });

            // Add event listener to handle the delete button click
            deleteButton.addEventListener('click', () => {
                bulletList.removeChild(listItem);
            });

            // Add event listener to switch to time input on click
            timeSpan.addEventListener('click', () => {
                timeInput.value = timeSpan.textContent;
                timeSpan.style.display = 'none';
                timeInput.style.display = 'inline';
                timeInput.focus();
            });

            // Add event listener to handle the blur on Enter key press in time input
            timeInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    timeInput.blur();
                }
            });

            // Add event listener to update timeSpan and re-sort the list after editing the time
            timeInput.addEventListener('blur', () => {
                timeSpan.textContent = timeInput.value;
                timeSpan.style.display = 'inline';
                timeInput.style.display = 'none';
                sortTasks();
            });

            bulletList.appendChild(listItem);
            inputField.value = '';
            timeField.value = '';
            sortTasks();
        }
    };

    const sortTasks = () => {
        const tasks = Array.from(bulletList.children);
        tasks.sort((a, b) => {
            const timeA = a.querySelector('.time').textContent.trim();
            const timeB = b.querySelector('.time').textContent.trim();
            return timeA.localeCompare(timeB);
        });
        bulletList.innerHTML = '';
        tasks.forEach(task => bulletList.appendChild(task));
    };

    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    timeField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Add mouse movement listener for wave effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        body.style.backgroundPosition = `${x * 50}% ${y * 50}%`;
    });
});
