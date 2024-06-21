document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');
    const timeField = document.getElementById('timeField');
    const bulletList = document.getElementById('bulletList');

    const addTask = () => {
        const inputValue = inputField.value.trim();
        const timeValue = timeField.value;

        if (inputValue && timeValue) {
            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';

            const textSpan = document.createElement('span');
            textSpan.textContent = inputValue;
            textSpan.contentEditable = true;
            textSpan.className = 'task-text';

            const timeSpan = document.createElement('span');
            timeSpan.textContent = timeValue;
            timeSpan.className = 'time';
            timeSpan.contentEditable = true;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '🗑️';

            listItem.appendChild(checkbox);
            listItem.appendChild(textSpan);
            listItem.appendChild(timeSpan);
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

            // Add event listener to handle the blur on Enter key press in editable time
            timeSpan.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    timeSpan.blur();
                }
            });

            // Add event listener to re-sort the list after editing the time
            timeSpan.addEventListener('blur', () => {
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
});
