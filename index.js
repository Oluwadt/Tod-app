let todos = []
const remaining = document.getElementById('remaining')
const clear = document.getElementById('clear')

const todosDiv = document.getElementById('tasks')
const form = document.getElementById('form')
let todosDivHTML = ''
const showTodo = (todo) => {
    const newTodo = `<div class="task">
    <p class="todo-name">
    <img src="./images/check-circle-gradient.png" class="gradient-circle">
    <img src="./images/icon-check.svg" class="tick">
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000"
    preserveAspectRatio="xMidYMid meet" class="check-circle">
   
   <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
   fill="transparent" stroke="hsl(236, 9%, 61%)" stroke-width="5" class="circle-stroke">
   <path d="M210 470 c-178 -33 -245 -259 -113 -381 46 -43 91 -61 153 -61 126 0
   222 96 222 222 0 140 -126 246 -262 220z m135 -29 c80 -36 120 -111 113 -212
   -8 -111 -94 -189 -207 -189 -136 1 -219 92 -209 231 11 146 166 233 303 170z"/>
   </g>
   </svg><span id="todo-name">${todo.name}</span><img src="./images/icon-cross.svg" class="del-img"></p>
  </div>`
    return newTodo
}


form.addEventListener("submit", (e) => {
    e.preventDefault()

    const todoInput = document.getElementById('new-todo')
    const newTodo = {
        name: todoInput.value,
        status: 'active'
    }
 
    
    todos.push(newTodo)
    todosDivHTML += showTodo(newTodo)

    todoInput.value = ''

    todosDiv.innerHTML = todosDivHTML
    
    let circles = document.getElementsByClassName('check-circle')
    circles = Array.from(circles)
    circles.forEach(circle => {
        const stroke = circle.children[0]
        circle.onclick = () => {
            const tick = circle.parentNode.children[1]
            const gradCircle = circle.parentNode.children[0]
            const nameElement = circle.parentNode.children[3]
            const todoName = circle.parentNode.innerText.trim()
            if (tick.style.visibility == 'visible') {
                tick.style.visibility = 'hidden'
                gradCircle.style.visibility = 'hidden'
                nameElement.classList.remove("complete-todo")
            } else {
                tick.style.visibility = 'visible'
                gradCircle.style.visibility = 'visible'
                nameElement.classList.add("complete-todo")
            }
            todos.forEach(todo => {
                if (todo.name == todoName) {
                    if (todo.status == 'active') {
                        todo.status = 'completed'
                    }
                    else {
                        todo.status = 'active'
                    }
                }
            })
        }
        circle.addEventListener("mouseover", () => {
            stroke.setAttribute("stroke", "hsl(192, 100%, 67%)");
        });
    
        circle.addEventListener("mouseout", () => {
            stroke.setAttribute("stroke", "hsl(236, 9%, 61%)");
        });
    });
    
    let todoDivs = document.getElementsByClassName('todo-name')
    todoDivs = Array.from(todoDivs)
    todoDivs.forEach(div => {
        const todoName = div.innerText.trim()
        const tick = div.children[1]
        const gradCircle = div.children[0]
        const nameElement = div.children[3]
        todos.forEach(todo => {
            if (todo.name == todoName) {
                if (todo.status == 'completed') {
                    tick.style.visibility = 'visible'
                    gradCircle.style.visibility = 'visible'
                    nameElement.classList.add("complete-todo")
                }
                else {
                    tick.style.visibility = 'hidden'
                    gradCircle.style.visibility = 'hidden'
                    nameElement.classList.remove("complete-todo")
                }
            }
        })

        const delBtn = div.children[4]
        div.addEventListener("mouseover", () => {
            delBtn.style.display = 'block'
        })

        div.addEventListener("mouseout", () => {
            delBtn.style.display = 'none'
        })
    });
    
    let delBtns = document.getElementsByClassName('del-img')
    delBtns = Array.from(delBtns)
    delBtns.forEach(delBtn => {
        const todoDiv = delBtn.parentNode.parentNode
        delBtn.onclick = () => {
            todoDiv.remove()
            todosDivHTML = todosDiv.innerHTML
            let text = todoDiv.innerText
            text = String(text.trim())
            todos = todos.filter(todo => !text.includes(todo.name))
            remaining.innerText = `${todos.length} items left`
        }    
    });

    remaining.innerText = `${todos.length} items left`
})

clear.onclick = () => {
    todos = todos.filter(todo => todo.status == 'active')
    let tempTodos = ''
    todos.forEach(todo => {
        const tempTodo = showTodo(todo)
        tempTodos += tempTodo
    });
    todosDiv.innerHTML = tempTodos
    todosDivHTML = tempTodos
    
    let circles = document.getElementsByClassName('check-circle')
    circles = Array.from(circles)
    circles.forEach(circle => {
        const stroke = circle.children[0]
        circle.onclick = () => {
            const tick = circle.parentNode.children[1]
            const gradCircle = circle.parentNode.children[0]
            const nameElement = circle.parentNode.children[3]
            const todoName = circle.parentNode.innerText.trim()
            if (tick.style.visibility == 'visible') {
                tick.style.visibility = 'hidden'
                gradCircle.style.visibility = 'hidden'
                nameElement.classList.remove("complete-todo")
            } else {
                tick.style.visibility = 'visible'
                gradCircle.style.visibility = 'visible'
                nameElement.classList.add("complete-todo")
            }
            todos.forEach(todo => {
                if (todo.name == todoName) {
                    if (todo.status == 'active') {
                        todo.status = 'completed'
                    }
                    else {
                        todo.status = 'active'
                    }
                }
            })
        }
        circle.addEventListener("mouseover", () => {
            stroke.setAttribute("stroke", "hsl(192, 100%, 67%)");
        });
    
        circle.addEventListener("mouseout", () => {
            stroke.setAttribute("stroke", "hsl(236, 9%, 61%)");
        });
    });
    
    let todoDivs = document.getElementsByClassName('todo-name')
    todoDivs = Array.from(todoDivs)
    todoDivs.forEach(div => {
        const todoName = div.innerText.trim()
        const tick = div.children[1]
        const gradCircle = div.children[0]
        const nameElement = div.children[3]
        todos.forEach(todo => {
            if (todo.name == todoName) {
                if (todo.status == 'completed') {
                    tick.style.visibility = 'visible'
                    gradCircle.style.visibility = 'visible'
                    nameElement.classList.add("complete-todo")
                }
                else {
                    tick.style.visibility = 'hidden'
                    gradCircle.style.visibility = 'hidden'
                    nameElement.classList.remove("complete-todo")
                }
            }
        })

        const delBtn = div.children[4]
        div.addEventListener("mouseover", () => {
            delBtn.style.display = 'block'
        })

        div.addEventListener("mouseout", () => {
            delBtn.style.display = 'none'
        })
    });
    
    let delBtns = document.getElementsByClassName('del-img')
    delBtns = Array.from(delBtns)
    delBtns.forEach(delBtn => {
        const todoDiv = delBtn.parentNode.parentNode
        delBtn.onclick = () => {
            todoDiv.remove()
            todosDivHTML = todosDiv.innerHTML
            let text = todoDiv.innerText
            text = String(text.trim())
            todos = todos.filter(todo => !text.includes(todo.name))
            remaining.innerText = `${todos.length} items left`
        }    
    });

    remaining.innerText = `${todos.length} items left`

}
