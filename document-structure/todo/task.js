document.addEventListener('DOMContentLoaded', (key, value) => {
    const form = document.querySelector('#tasks__form');
    const inputTask = form.querySelector('#task__input');
    const taskList = document.querySelector('#tasks__list');
    let arrTasks = [];

    function createTaskAndCross (taskText) {
        const task =  taskText || inputTask.value.trim();
        if (task === '') return;

        if (!taskText) {
            arrTasks.push(task);
            setTaskStorage();
        }

        const taskElement = document.createElement('div');
        taskElement.classList.add('task');


        const taskTitleElement = document.createElement('div');
        taskTitleElement.classList.add('task__title');
        taskTitleElement.textContent = task;

        const taskRemoveElement = document.createElement('a');
        taskRemoveElement.classList.add('task__remove');
        taskRemoveElement.innerHTML = '&times;';
        taskRemoveElement.href = '#';

        taskElement.append(taskTitleElement);
        taskElement.append(taskRemoveElement);
        taskList.append(taskElement);

        form.reset();
    }

    function removeTask (elem) {
        const text = elem.querySelector('.task__title').textContent;

        arrTasks = arrTasks.filter(task => task !== text);
        setTaskStorage();
        elem.remove();
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        createTaskAndCross();
    });

    function setTaskStorage () {
        localStorage.setItem('tasks', JSON.stringify(arrTasks));
    }

    function loadTasks () {
        const loadTask = JSON.parse(localStorage.getItem('tasks'));
        if (loadTask === null) return;

        arrTasks = loadTask;

        arrTasks.forEach(task => {
           createTaskAndCross(task)
        })
    }

    taskList.addEventListener('click', e => {
        const btnRemoveTask = e.target.closest('.task__remove');
        if (!btnRemoveTask) return;

        e.preventDefault();

        const taskElement = e.target.closest('.task')
        removeTask(taskElement)
    })

    loadTasks();
})
