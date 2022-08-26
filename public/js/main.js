const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const todoItem = document.querySelector(".not")

hamburger.addEventListener("click", ()=>{
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})
document.querySelectorAll(".nav-link").forEach(ele => ele.addEventListener("click", ()=>{
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
}))

document.querySelector('#heart').addEventListener('click', markFavorite)

document.querySelector('#heart').addEventListener('click', markUnfavorite)

async function markFavorite(){
    const todoId = this.attributes[4].value
    try{
        const response = await fetch('/markFavorite', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markUnfavorite(){
    const todoId = this.attributes[4].value
    try{
        const response = await fetch('/markUnfavorite', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


