//tüm elementleri seçmek

const form = document.querySelector("#todoAddForm");
const addInput=document.querySelector("#todoName");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const clearButton=document.querySelector("#clearButton");
const filterInput=document.querySelector("#todoSearch");

let todos =[];

console.log(form);
console.log(addInput);
console.log(todoList);
console.log(firstCardBody);
console.log(secondCardBody);
console.log(clearButton);


runEvents();




function runEvents(){
     form.addEventListener("submit",addTodo);
     document.addEventListener("DOMContentLoaded",pageLoaded);
     secondCardBody.addEventListener("click",removeTodoUI);
     clearButton.addEventListener("click",allTodosEverywhere);
     filterInput.addEventListener("keyup",filter);
}


function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}


function filter(e){
     const filterValue= e.target.value.toLowerCase().trim();
     const todoList = document.querySelectorAll(".list-group-item");

     if(todoList.length>0){
        todoList.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                 todo.setAttribute("style","display : block");
            }
            else{
                 todo.setAttribute("style","display:none !important");
            }
        })
     }
     else{
        showAlert("warning","Filtrelenecek todo bulunamadı");
     }
}


function allTodosEverywhere(){
    const todosList = document.querySelectorAll(".list-group-item");
    //console.log(todoList);
    if(todosList.length>0){
       todosList.forEach(function(todo){
        todo.remove();
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Başarılı şekile silindi");
       });
    }
    else{
        showAlert("warning","Silmek için todo yok");
    }
}


function removeTodoUI(e){
    //console.log(e.target);
    if(e.target.className==="fa fa-remove"){
        //console.log("çarpı ikonu");
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        removeTodoToStorage(todo.textContent);
        showAlert("success","Todo silindi");
    }
}


function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
          if(removeTodo===todo){
            todos.splice(index,1);
          }
    }
);

localStorage.setItem("todos",JSON.stringify(todos));

}

function addTodo(e){
    const inputText=addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen boş bırakmayınız");
    }
    else{
      //arayüze ekleme
      addTodoUI(inputText);
      //storage ekleme
      addTodoStorage(inputText);
      showAlert("success","Todo Eklendi");
    }
    e.preventDefault();
}




function addTodoUI(newTodo){
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
    <a href="#" class="delete-item">
        <i class="fa fa-remove"></i>
    </a>
    </li>
    */

    const li= document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className="delete-item";

    const i=document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li)

    addInput.value="";

}



function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}


function addTodoStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}



function showAlert(type,message){
    /*
    <div class="alert alert-warning" role="alert">
        A simple warning alert—check it out!
    </div>
    */

    const div = document.createElement("div");
    div.className=`alert alert-${type}` ;
    div.textContent=message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
       div.remove();
    },2500)
}
      


