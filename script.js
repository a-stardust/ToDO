document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputField');
    const bulletList = document.getElementById('bulletList');

    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const inputValue = inputField.value.trim();
            if (inputValue) {
                const listItem = document.createElement('li');
                listItem.textContent = inputValue;
                listItem.contentEditable = true;
                
                // Add event listener to handle the blur on Enter key press in editable bullet point
                listItem.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        listItem.blur();
                    }
                });

                bulletList.appendChild(listItem);
                inputField.value = '';
            }
        }
    });
});
