document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    let lastDeleted = null;

    //Obsługa wykonania zadania
    function handleCompletion(el){
        const taskProp = el.querySelector('.task-prop');

        if (el.classList.contains('completed')) {
                const dateSpan = document.createElement('span');
                dateSpan.className = 'completion-date';
                dateSpan.textContent = ` [wykonano: ${new Date().toLocaleString()}]`;
                taskProp.prepend(dateSpan);
            } else {
                const dateSpan = el.querySelector('.completion-date');
                if (dateSpan) dateSpan.remove();
            }
    }

    // Funkcja nadająca logikę kliknięcia (przekreślania) do elementu listy
    function setupToggleClick(el) {
        el.addEventListener('click', () => {
            el.classList.toggle('completed');
            handleCompletion(el);
        });
    }

    // Przycisk usuwania do elementu
    function addDeleteButton(el) {
        const taskProp = document.createElement('div');
        taskProp.className = 'task-prop';

        const XButton = document.createElement('button');
        XButton.textContent = 'X';
        XButton.className = 'delete-button';
        
        XButton.addEventListener('click', (e) => {
            e.stopPropagation();
            lastDeleted = el;
            el.remove();
        });
        
        taskProp.appendChild(XButton);
        el.appendChild(taskProp);
    }

    // Obsługę elementów listy domyślnej z pliku HTML
    const tasks = todoList.querySelectorAll('li');
    tasks.forEach(task => {
        setupToggleClick(task);
        addDeleteButton(task);
        handleCompletion(task);
    });

    // Funkcja dodająca nowe zadanie
    function addTask() {
        const text = input.value.trim();

        if (text !== "") {
            const li = document.createElement('li');
            
            li.textContent = text;

            setupToggleClick(li);
            addDeleteButton(li);

            todoList.appendChild(li);
            input.value = "";
        } else {
            alert("Pole nie może być puste!");
        }
    }

    // Obsługa Ctrl + Z
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === 'z' || e.key === 'Z')) {
            if (lastDeleted) {
                todoList.appendChild(lastDeleted);
                lastDeleted = null;
               //alert("Przywrócono ostatnie zadanie!");
            }
        }
    });

    addButton.addEventListener('click', addTask);
});