var addBtn =  document.getElementById('add')

var notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click' , () => addNewNote())

function addNewNote(text = ''){
    var note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
`

    var editBtn = note.querySelector('.edit')
    var deleteBtn = note.querySelector('.delete')
    var main = note.querySelector('.main')
    var textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input' , (e) =>{
        var {value} = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)
}

function updateLS(){
    var notesText = document.querySelectorAll('textarea')

    var notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes' , JSON.stringify(notes))

}

