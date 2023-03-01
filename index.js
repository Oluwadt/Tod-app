let todos = []
const footerBtns = document.querySelectorAll('.footer-btn')
const body = document.getElementsByClassName('body')[0]
const footer = document.getElementsByClassName('footer')[0]
let themeBtn = document.getElementById('theme-img')
const taskInputDiv = document.getElementsByClassName('task-input-div')[0]
const taskInput = document.getElementsByClassName('new-todo')[0]
const remaining = document.getElementById('remaining')
const clearBtn = document.getElementsByClassName('clear')[0]
const allBtn = document.getElementById('all')
const activeBtn = document.getElementById('active')
const completedBtn = document.getElementById('completed')
let theme = 'dark'

const todosDiv = document.getElementsByClassName('tasks')[0]
const form = document.getElementById('form')
let todosDivHTML = ''
allBtn.classList.add('active-footer-btn')
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

    const newTodo = {
        name: taskInput.value,
        status: 'active'
    }
 
    
    todos.push(newTodo)
    todosDivHTML += showTodo(newTodo)

    taskInput.value = ''

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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
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
        const todoDiv = div.parentNode
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

        if (theme == 'light') {
            todoDiv.classList.add('light-task')
        } else {
            todoDiv.classList.remove('light-task')
        }

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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
        }    
    });

    const remainingTodos = todos.filter(todo => todo.status == 'active')
    remaining.innerText = `${remainingTodos.length} items left`
    
})

clearBtn.onclick = () => {
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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
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
        const todoDiv = div.parentNode
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

        if (theme == 'light') {
            todoDiv.classList.add('light-task')
        } else {
            todoDiv.classList.remove('light-task')
        }

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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
        }    
    });

    const remainingTodos = todos.filter(todo => todo.status == 'active')
    remaining.innerText = `${remainingTodos.length} items left`

}

allBtn.onclick = () => {
    allBtn.classList.add('active-footer-btn')
    activeBtn.classList.remove('active-footer-btn')
    completedBtn.classList.remove('active-footer-btn')

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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
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
        const todoDiv = div.parentNode
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

        if (theme == 'light') {
            todoDiv.classList.add('light-task')
        } else {
            todoDiv.classList.remove('light-task')
        }

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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
        }    
    });

    const remainingTodos = todos.filter(todo => todo.status == 'active')
    remaining.innerText = `${remainingTodos.length} items left`
}

activeBtn.onclick = () => {
    activeBtn.classList.add('active-footer-btn')
    allBtn.classList.remove('active-footer-btn')
    completedBtn.classList.remove('active-footer-btn')

    const shownTodos = todos.filter(todo => todo.status == 'active')
    let tempTodos = ''
    shownTodos.forEach(todo => {
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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
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
        const todoDiv = div.parentNode
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

        if (theme == 'light') {
            todoDiv.classList.add('light-task')
        } else {
            todoDiv.classList.remove('light-task')
        }

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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
        }    
    });

    const remainingTodos = todos.filter(todo => todo.status == 'active')
    remaining.innerText = `${remainingTodos.length} items left`
}

completedBtn.onclick = () => {
    completedBtn.classList.add('active-footer-btn')
    activeBtn.classList.remove('active-footer-btn')
    allBtn.classList.remove('active-footer-btn')
    
    const shownTodos = todos.filter(todo => todo.status == 'completed')
    let tempTodos = ''
    shownTodos.forEach(todo => {
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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
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
        const todoDiv = div.parentNode
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

        if (theme == 'light') {
            todoDiv.classList.add('light-task')
        } else {
            todoDiv.classList.remove('light-task')
        }

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
            const remainingTodos = todos.filter(todo => todo.status == 'active')
            remaining.innerText = `${remainingTodos.length} items left`
        }    
    });

    const remainingTodos = todos.filter(todo => todo.status == 'active')
    remaining.innerText = `${remainingTodos.length} items left`
}

themeBtn.onclick = () => {
    const currTheme = themeBtn.getAttribute('src')
    const tasks = document.querySelectorAll('.task')
    if (currTheme == "./images/icon-sun.svg") {
        themeBtn.setAttribute('src', "./images/icon-moon.svg")
        body.classList.add('light-body')
        taskInputDiv.classList.add('light-task-input-div')
        footer.classList.add('light-footer')
        clearBtn.classList.add('light-clear')
        taskInput.classList.add('light-new-todo')
        todosDiv.classList.add('light-tasks')
        footerBtns.forEach(btn => {
            btn.classList.add('light-footer-btn')
        });
        tasks.forEach(task => {
            task.classList.add('light-task')
        });
        theme = 'light'
    } else {
        themeBtn.setAttribute('src', "./images/icon-sun.svg")
        body.classList.remove('light-body')
        taskInputDiv.classList.remove('light-task-input-div')
        footer.classList.remove('light-footer')
        clearBtn.classList.remove('light-clear')
        taskInput.classList.remove('light-new-todo')
        todosDiv.classList.remove('light-tasks')
        footerBtns.forEach(btn => {
            btn.classList.remove('light-footer-btn')
        });
        tasks.forEach(task => {
            task.classList.remove('light-task')
        });
        theme = 'dark'
    }
}
