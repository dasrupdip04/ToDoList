document.addEventListener('DOMContentLoaded',()=>{


    const todoinp= document.getElementById("todoinp")
    const addtask=document.getElementById("addtask")
    const todolist=document.getElementById("todolist")

    let tasks= JSON.parse(localStorage.getItem('keyanyname'))||[]  //either empty array or bring from local storage

    tasks.forEach(onetask => rendertasks(onetask));

    addtask.addEventListener('click', function(){
        let inp = todoinp.value.trim();
        if(inp==="") {
        alert("Add a task");
        return;
        }
        const newtask = {
            id: Date.now(),
            taskname : inp,
            completed : false
        }
        tasks.push(newtask);
        rendertasks(newtask); 
        savetasks();//to save it to local storage
        todoinp.value="";
        console.log(tasks);
    })
    function rendertasks(onetask){
        const newli = document.createElement("li");
        newli.setAttribute("li-id", onetask.id);
        newli.innerHTML = `<span>${onetask.taskname}</span><button>-</button>`;
        

        if(onetask.completed) newli.classList.add('completed')

        newli.addEventListener('click', (e)=> {
            if(e.target.tagName==='BUTTON')return;
            onetask.completed=!onetask.completed;
            newli.classList.toggle('completed');
            savetasks()
        })

        newli.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation(); //prevent toggle from firing and moving up and down of the newli
            tasks=tasks.filter(t=> t.id!==onetask.id) //study filter method for arrays
            newli.remove()
            savetasks()
        })
        todolist.appendChild(newli);
    }

    function savetasks(){
        localStorage.setItem('keyanyname',JSON.stringify(tasks));
    }



})