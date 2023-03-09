var json = []
async function getData(){
    const data = await fetch(`http://localhost:3000/gettask`)
    json = await data.json()
    console.log(json[0])
    await createTasks()
}
getData()

async function addtask(){
    const nazwa = document.getElementById("inpNazwa").value
    const termin = document.getElementById("inpTermin").value
    document.getElementById("inpNazwa").value = ""
    document.getElementById("inpTermin").value = ""
    const add = await fetch(`${baseurl}/addtask/${nazwa}/${termin}`)
    getData()
}

function createTasks(){
    document.getElementById("main").innerHTML = ""
    for(var i = 0;i<=json.length-1;i++){
        const div = document.createElement("div")
        div.classList.add("div")


        const termin = document.createElement("h1")
        var date = new Date(json[i].termin)
        var fdate = date.toLocaleDateString()
        console.log(fdate)
        termin.innerHTML = fdate
        
        termin.classList.add("termin")
        
        const tresc = document.createElement("h1")
        tresc.innerHTML = json[i].nazwa
        const guzi = document.createElement("div")
        guzi.classList.add("guzi")
        const button =document.createElement("button")
        button.innerHTML = "🗑️"
        button.setAttribute("onclick",`deltask(${json[i].ID})`)
        
        const done = document.createElement("button")
        if(json[i].done==0) done.innerHTML = "❌"
        else done.innerHTML = "✔️"
        
        done.classList.add("undone")
        done.setAttribute("onclick",`done(${json[i].ID},${json[i].done})`)
        div.appendChild(tresc)
        div.appendChild(termin)
        div.appendChild(guzi)
        guzi.appendChild(done)
        guzi.appendChild(button)
        document.getElementById("main").appendChild(div)
    }
}
async function deltask(id){
    await fetch(`${baseurl}/deltask/${id}`)
    getData()
}
async function done(id,done){
    await fetch(`${baseurl}/done/${id}/${done}`)
    getData()
}
