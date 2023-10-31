const addBox = document.querySelector(".add-box"),
closeIcon = document.querySelector("header i"),
popup = document.getElementById("popup"),
addbtn = document.querySelector(".btn"),
titletag = document.querySelector("input"),
desctag = document.querySelector("textarea"),
months =["January","February","March","April","May","June","July","August","September","October","November","December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");


let backdrop = document.createElement("div");
backdrop.classList.add("backdrop");

addBox.addEventListener ("click", () => {
// function openpopup(){
    backdrop.style.display = "block";
    document.body.classList.add("blur");
    document.body.appendChild(backdrop);
    popup.classList.add("open-popup");
});


function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index)=> {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span class="title">${note.description}</span>
                        </div>
                        <div class="bottom">
                            <span>${note.date}</span>
                            <div class="setting" onclick ="deleteNote(${index})">
                                <i class="uil uil-trash"></i>Delete
                            </div>

                        </div>
                    </li>`
        addBox.insertAdjacentHTML("afterend",liTag)
    })
}
showNotes();


function deleteNote(noteId){
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}


closeIcon.addEventListener("click", ()=>{
    backdrop.style.display = "none";
    document.body.classList.remove("blur");
    document.body.removeChild(backdrop);
    popup.classList.remove("open-popup"); 
})

addbtn.addEventListener("click", e =>{
    e.preventDefault();
    let notetitle = titletag.value,
    notedesc = desctag.value;
    
    if(notetitle || notedesc){
        titletag.value = "";
        desctag.value = ""
        let dateobj = new Date(),
        month =months[dateobj.getMonth()],
        day = dateobj.getDate(),
        year = dateobj.getFullYear();
        // console.log(month, day, year)
        let noteInfo = {
            title: notetitle, description: notedesc,
            date:`${month} ${day} ${year}`
        }
        console.log(noteInfo);
        
        notes.push(noteInfo);
        localStorage.setItem("notes",JSON.stringify(notes))
        closeIcon.click();
        showNotes();
    }
})