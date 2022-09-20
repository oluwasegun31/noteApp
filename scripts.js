var navBtnOpen = document.querySelector(".label-all .v");
var navBtnClose = document.querySelector(".label-all .h");
var navAll = document.querySelector(".labels");
var openBox = document.querySelector('.addBox');
var createNote = document.querySelector('.create');
var closeNote = document.querySelector('.header i');
var importantBtn = document.querySelector(".icons .important-btn")
var schoolBtn = document.querySelector(".icons .school-btn")
var workBtn = document.querySelector(".icons .work-btn")
var othersBtn = document.querySelector(".icons .others-btn")
var inputHeading = document.querySelector(".create-title")
var inputingtitle = document.querySelector('.create-title input')
var inputingdesc = document.querySelector('.create-desc textarea')
var addBtn = document.querySelector('form button')
var headerTxt = document.querySelector('.header p') 
var createTitle = document.querySelector('form .create-title')
var createDesc = document.querySelector('form .create-desc')


let monthLet = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const notes = JSON.parse(localStorage.getItem("notes") || "[]") ////creating local storage with arrays
let isUpdate = false, updateId

navBtnOpen.addEventListener('click', function(){/// to open navbar icon
    navAll.classList.add("nav-show");
    navBtnClose.style.display ="block"
    navBtnOpen.style.display ="none"

})
navBtnClose.addEventListener('click', function(){//// to close navbar icon
    navAll.classList.remove("nav-show")
    navBtnClose.style.display ="none"
    navBtnOpen.style.display ="block"
})
openBox.addEventListener('click', function(){///// to open the input box fields
    inputingtitle.focus() /// to focus on the title when the popup opens
    createNote.classList.add('sett')
})
closeNote.addEventListener('click', function(){//////// to close input box field
    isUpdate = false
    createNote.classList.remove('sett')
    inputingtitle.value = "" ///// to set the fields back to empty after adding
    inputingdesc.value = ""
    addBtn.innerHTML = `<i class="uil uil-plus" style="margin-right: 10px;"></i>Save Note` ///setting the button back to default cause of the update function
    headerTxt.innerText = "Create New Note"
    
})


function openNotes(){
    document.querySelectorAll(".noteBox").forEach(function(note){
        note.remove() ////to remove the duplicate
    })
    notes.forEach(function(note, index){
        let divTag =    `<div class="noteBox ${note.sortId}">
                            <div class="top">
                                <div class="title">
                                    <p class="heading">${note.title}</p>
                                    <p class="time-box">${note.date}</p>
                                </div>
                                <div onclick = "settings(this)" class="settings">
                                    <i  class="uil uil-ellipsis-v"></i>
                                    <div class="menu">
                                        <li onclick = "updateNote(${index}, '${note.title}', '${note.description}', '${note.sortId}')"><il class="uil uil-edit"></il>Edit</li>
                                        <li onclick = "deleteNote(${index})"><il class="uil uil-trash"></il>Delete</li>
                                    </div>
                                </div>
                            </div>
                            <div class="content">
                                <span>${note.description}</span>
                            </div>
                        </div>`
        openBox.insertAdjacentHTML("afterend", divTag)
    })
}
openNotes()

function settings(elem){ ///to toggle the settings icon
    elem.classList.add('show')
    document.addEventListener('click', function(e){
        if(e.target.tagName != 'I'){
            elem.classList.remove('show')
        }
    })
}

function deleteNote(noteId){ //// to delete notes
    notes.splice(noteId, 1) /// to delete from the notes array
    localStorage.setItem("notes", JSON.stringify(notes)) /// saving the updated 
    openNotes()
    window.location.reload()
}

function updateNote(noteId, title, desc, sort){ /// updating the note with the id, title, desc and tag
    isUpdate = true
    updateId = noteId
    openBox.click()
    addBtn.innerText = "Update Note"
    headerTxt.innerText = "Updating Note"
    inputingtitle.value = title
    inputingdesc.value = desc
    btnColor = sort
    if (sort === 'red'){ //// creating a conditions to keep the tag of the note to be updated
        importantBtn.click()
    }else if (sort === 'blue'){
        schoolBtn.click()
    }else if (sort === 'green'){
        workBtn.click()
    }else if (sort === 'orange'){
        othersBtn.click()
    }
}

importantBtn.addEventListener('click', function(e){ /// adding the color tags
    e.preventDefault()
    btnColor = 'red'
    createTitle.classList.add('red')
    createTitle.classList.remove('blue')
    createTitle.classList.remove('green')
    createTitle.classList.remove('orange')
    createDesc.classList.add('red')
    createDesc.classList.remove('blue')
    createDesc.classList.remove('green')
    createDesc.classList.remove('orange')
    inputingtitle.focus()
})
schoolBtn.addEventListener('click', function(e){ /// adding the color tags
    e.preventDefault()
    btnColor = 'blue'
    createTitle.classList.add('blue')
    createTitle.classList.remove('red')
    createTitle.classList.remove('green')
    createTitle.classList.remove('orange')
    createDesc.classList.add('blue')
    createDesc.classList.remove('red')
    createDesc.classList.remove('green')
    createDesc.classList.remove('orange')
    inputingtitle.focus()
})
workBtn.addEventListener('click', function(e){ /// adding the color tags
    e.preventDefault()
    btnColor = 'green'
    createTitle.classList.add('green')
    createTitle.classList.remove('blue')
    createTitle.classList.remove('red')
    createTitle.classList.remove('orange')
    createDesc.classList.add('green')
    createDesc.classList.remove('blue')
    createDesc.classList.remove('red')
    createDesc.classList.remove('orange')
    inputingtitle.focus()
})
othersBtn.addEventListener('click', function(e){ /// adding the color tags
    e.preventDefault()
    btnColor = 'orange'
    createTitle.classList.add('orange')
    createTitle.classList.remove('blue')
    createTitle.classList.remove('green')
    createTitle.classList.remove('red')
    createDesc.classList.add('orange')
    createDesc.classList.remove('blue')
    createDesc.classList.remove('green')
    createDesc.classList.remove('red')
    inputingtitle.focus()
})
if (btnColor = undefined){ /// not sure but to prevent the error in console when no tag is selected
    importantBtn.click()
}


addBtn.addEventListener('click', function(e){
    e.preventDefault()
    let noteTitle = inputingtitle.value //getting inputs
    let noteDesc = inputingdesc.value
    let sort = btnColor /// getting the color tag
    
    if(noteTitle && noteDesc){ 
        let dateObj = new Date() ////adding date
        let year = dateObj.getFullYear()
        let monthNum = dateObj.getMonth()
        let month = monthLet[monthNum]
        let day = dateObj.getDate()
        let date = `${month} ${day}, ${year}`
        
        let noteinfo = {
            title: noteTitle, description: noteDesc, date: date, sortId: sort
        }//// creating an info for title, description and date
        if(!isUpdate){
            notes.push(noteinfo); //adding new note to notes
        }else{
            isUpdate = false
            notes[updateId]= noteinfo // updating specified note
        }
        localStorage.setItem("notes", JSON.stringify(notes))////setting local storage

        closeNote.click() ////closing the popup if only both fields are inputed
        openNotes()
        window.location.reload()
    }
    
})



//////sorting
var allbtn = document.querySelector(".labels .all-btn")
var impBtn = document.querySelector(".labels .important-btn")
var schBtn = document.querySelector(".labels .school-btn")
var wBtn = document.querySelector(".labels .work-btn")
var othBtn = document.querySelector(".labels .others-btn")
var storeItem = document.querySelectorAll(".noteBox")

allbtn.addEventListener('click', function(e){ // to show all note
    e.preventDefault()
    storeItem.forEach(function(item){
        if (item.classList.contains ("all")){
            item.style.display = "none"
        } else {
            item.style.display =  "flex"
        }
    })
})
impBtn.addEventListener('click', function(e){ // to show important note
    e.preventDefault()
    storeItem.forEach(function(item){
        if (item.classList.contains ("red")){
            item.style.display = "flex"
        } else {
            item.style.display =  "none"
        }
    })
})
schBtn.addEventListener('click', function(e){ // to show school note
    e.preventDefault()
    storeItem.forEach(function(item){
        if (item.classList.contains ("blue")){
            item.style.display = "flex"
        } else {
            item.style.display =  "none"
        }
    })
})
wBtn.addEventListener('click', function(e){ // to show work note
    e.preventDefault()
    storeItem.forEach(function(item){
        if (item.classList.contains ("green")){
            item.style.display = "flex"
        } else {
            item.style.display =  "none"
        }
    })

})
othBtn.addEventListener('click', function(e){ // to show others note
    e.preventDefault()
    storeItem.forEach(function(item){
        if (item.classList.contains ("orange")){
            item.style.display = "flex"
        } else {
            item.style.display =  "none"
        }
    })
})



//////////////scroll
var scrollBtn = document.querySelector('.scroll')

window.addEventListener('scroll', function(){ /// scroll back up
    if(window.scrollY > 700){
        scrollBtn.style.opacity = 0.8
        scrollBtn.style.pointerEvents = "auto"
    }else {
        scrollBtn.style.opacity = 0
        scrollBtn.style.pointerEvents = "none"
    }
})
scrollBtn.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

////dark mode
var body = document.querySelector('body')
var headEr = document.querySelector('header')
let darkMode = localStorage.getItem('darkMode');
const mode = document.querySelector(".mode");

const enableDarkMode = ()=> {
    body.classList.add('dark')
    headEr.classList.add('dark')
    mode.classList.add('dark')
    localStorage.setItem('darkMode', 'enabled')
}
const disableDarkMode = ()=> {
    body.classList.remove('dark')
    headEr.classList.remove('dark')
    mode.classList.remove('dark')
    localStorage.setItem('darkMode', null)
}
if(darkMode === 'enabled'){
    enableDarkMode()
}else{
    disableDarkMode()
}
mode.addEventListener('click', function(){
    darkMode = localStorage.getItem('darkMode')
    if(darkMode !== 'enabled'){
        enableDarkMode()
    } else{
        disableDarkMode()
    }
})

//// adding a preview image that shows when the notes are empty
var preview = document.querySelector(".preview")
if(notes.length == 0){
    preview.style.display = 'block'
} else {
    preview.style.display = 'none'
}