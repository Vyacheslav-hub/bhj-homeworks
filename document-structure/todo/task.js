document.addEventListener('DOMContentLoaded', () => {
// Получаем элементы на странице
const taskInput = document.getElementById('task__input');
const taskForm = document.getElementById('tasks__form');
const taskList = document.getElementById('tasks__list');

// Функция для добавления задачи
function addTask(taskText) {
    // Создаем элемент задачи
    const task = document.createElement('div');
    task.classList.add('task');

    // Добавляем текст задачи
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task__title');
    taskTitle.textContent = taskText;

    // Кнопка удаления
    const removeBtn = document.createElement('a');
    removeBtn.href = '#';
    removeBtn.classList.add('task__remove');
    removeBtn.textContent = '×';

    // Добавляем элементы в задачу
    task.appendChild(taskTitle);
    task.appendChild(removeBtn);

    // Добавляем задачу в список
    taskList.appendChild(task);

    // Слушатель для кнопки удаления
    removeBtn.addEventListener('click', () => {
        task.remove();
        saveTasks();
    });

    // Сохраняем задачи в локальное хранилище
    saveTasks();
}

// Функция для сохранения задач в localStorage
function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll('.task__title');
    taskElements.forEach(taskElement => {
        tasks.push(taskElement.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(taskText => {
            addTask(taskText);
        });
    }
}

// Обработчик отправки формы (добавление задачи)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = ''; // Очищаем поле ввода
    }
});

// Обработчик нажатия клавиши Enter
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = ''; // Очищаем поле ввода
        }
    }
});

// Загружаем задачи при загрузке страницы
window.addEventListener('load', loadTasks);
});