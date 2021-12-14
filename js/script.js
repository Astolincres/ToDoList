const addTask = document.querySelector('.add__container');
const modal = document.querySelector('.modal');
const closeModal = modal.querySelector('.close');
const listContainer = document.querySelector('.list__container');
const description = document.querySelector('.description');
const removeTask = document.querySelector('.remove_image');
const completeTask = document.querySelector('.complete__container');
const editTask = document.querySelector('.edit__container');
const form = document.querySelector('.form');
const priorityForm = document.querySelector('.priority');
const inputName = document.querySelector('.input__name');
const inputDescription = document.querySelector('.input__description');
const submit = document.querySelector('.submit');
const priorityLowForm = document.querySelector('#low');
const priorityMediumForm = document.querySelector('#medium');
const priorityHighForm = document.querySelector('#high');
const info = {
    '1': {
        'name': 'Complete',
        'description': 'This is the description of a complete task',
        'priority': 'complete',
    },
    '2': {
        'name': 'Low',
        'description': 'This is the description of a low priority task',
        'priority': 'low',
    },
    '3': {
        'name': 'Medium',
        'description': 'This is the description of a medium priority task',
        'priority': 'medium',
    },
    '4': {
        'name': 'High',
        'description': 'This is the description of a high priority task',
        'priority': 'high',
    }

};
let numberOfTask = Object.keys(info)['length'];


//Show add popup
addTask.addEventListener('click',() => {
    if(Array.from(priorityForm.children).length>3) {
        priorityForm.removeChild(priorityForm.lastChild);
    }
    inputDescription.value = "";
    inputName.value = "";
    submit.value = "Add";
    priorityLowForm.checked = true;
    modal.style.display = "flex"
    modal.classList.add('modal-fade-in');
});


//Edit Task
editTask.addEventListener('click', ()=> {
    let isFocus = false;
    let key ='';
    Array.from(listContainer.children).forEach((element) => {
        if (element.classList.contains('focus')) {
            isFocus = true;
            key = element.getAttribute('data-id');
            return
        }
    });
    if (!isFocus) return;
    if(Array.from(priorityForm.children).length>3) {
        priorityForm.removeChild(priorityForm.lastChild);
    }
    let div = document.createElement('div');
    let inputRadio = document.createElement('input');
    let label = document.createElement('label');
    label.setAttribute('for', 'complete');
    label.innerHTML = 'Complete';
    inputRadio.type = "radio";
    inputRadio.name = "priority";
    inputRadio.value = "complete";
    inputRadio.id = "complete";
    div.appendChild(inputRadio);
    div.appendChild(label);
    div.classList.add('priority__div');
    priorityForm.appendChild(div);
    const priorityCompleteForm = document.querySelector('#complete');
    switch (info[key].priority) {
        case 'low':
                  priorityLowForm.checked = true;      
            break;
        case 'medium':
                priorityMediumForm.checked = true;
            break;
        case 'high':
                priorityHighForm.checked = true;
            break;
        case 'complete':
                priorityCompleteForm.checked =true;
            break;
        default:
            break;
    }
    submit.value = "Edit";
    inputName.value = info[key].name;
    inputDescription.value = info[key].description;
    modal.style.display = "flex";
    modal.classList.add('modal-fade-in');
});

const updateTask = (key, value = true)=>{
    if (value) {
        let il = document.createElement('IL');
        il.classList.add('task');
        il.classList.add(info[key].priority);
        il.innerText = info[key].name;
        il.setAttribute('data-id', key);
        listContainer.appendChild(il);
    } else {
        Array.from(listContainer.children).forEach((element)=>{
            if (element.getAttribute('data-id') == key) {
                element.innerHTML = info[key].name;
                description.innerHTML = info[key].description;
                element.classList=`task focus ${info[key].priority}`;
                return
            }
        })
    }
}

const updateData = (e)=> {
    e.preventDefault();
    let key ='';
    let taskList = Array.from(listContainer.children);
    let nextKey = -1;
    if (taskList.length=== 0) {
        nextKey = 0;
    } else {
        nextKey = Number(listContainer.lastChild.getAttribute('data-id'))+1;
    }
    if (inputName.value == '') {
        alert('A name is required');
        return
    }
    if(submit.value === 'Edit') {
        taskList.forEach((element) => {
            if (element.classList.contains('focus')) {
                isFocus = true;
                key = element.getAttribute('data-id');
                return
            }
        });
        if(priorityLowForm.checked){
            info[key].priority = priorityLowForm.value;
        } else if (priorityMediumForm.checked) {
            info[key].priority = priorityMediumForm.value;
        } else if (priorityHighForm.checked) {
            info[key].priority = priorityHighForm.value;
        } else {
            info[key].priority = 'complete';
        }
        info[key].name = inputName.value;
        info[key].description = inputDescription.value;
        updateTask(key, false);
    } else {
        info[nextKey] = {'name': '', 'description': '', 'priority':''};
        info[nextKey].name = inputName.value;
        info[nextKey].description = inputDescription.value;
        if(priorityLowForm.checked){
            info[nextKey].priority = priorityLowForm.value;
        } else if (priorityMediumForm.checked) {
            info[nextKey].priority = priorityMediumForm.value;
        } else {
            info[nextKey].priority = priorityHighForm.value;
        }
        updateTask(nextKey);
    }
    modal.classList.add('modal-fade-out');
    setTimeout(()=>{
        modal.classList.remove('modal-fade-out');
        modal.style.display = 'none';
    }, 1000);
    
};

form.addEventListener('submit', e => updateData(e));


closeModal.addEventListener('click', ()=> {
    modal.classList.add('modal-fade-out');
    setTimeout(()=>{
        modal.classList.remove('modal-fade-out');
        modal.style.display = 'none';
    }, 1000);
});

modal.addEventListener('click',(e)=>{
    if (e.target == modal){
        modal.classList.add('modal-fade-out');
        setTimeout(()=>{
            modal.classList.remove('modal-fade-out');
            modal.style.display = 'none';
        }, 1000);
    }
});

listContainer.addEventListener('click', (e)=>{
    Array.from(listContainer.children).forEach((element)=>{
        element.classList.remove('focus')
    });
    description.innerHTML='';
    if (e.target.classList.contains('task')) {
        e.target.classList.add('focus');
        description.innerHTML =info[e.target.getAttribute('data-id')].description;
    } else if (e.target.parentNode.classList.contains('task')) {
        e.target.parentNode.classList.add('focus');
        description.innerHTML = info[e.target.parentNode.getAttribute('data-id')].description;
        
    }
});

completeTask.addEventListener('click', ()=> {
    Array.from(listContainer.children).forEach((element)=>{
        if (element.classList.contains('focus')){
            element.classList='task focus complete';
            info[element.getAttribute('data-id')].priority ='complete';
        }
    });
});

removeTask.addEventListener('click', (e)=>{
	Array.from(listContainer.children).forEach((element)=>{
		if (element.classList.contains('focus')){
            element.classList.add('delete__task');
            description.removeChild(description.firstChild);
            delete info[element.getAttribute('data-id')];
            setTimeout(()=>{
                listContainer.removeChild(element);
            },900);
			
		}
	});
});

Object.keys(info).forEach((key)=>{
    updateTask(key);
});

