var char
var json = []
var wykonane = 0
var niewykonane = 0
async function getData(){
    const data = await fetch(`${baseurl}/gettask`)
    json = await data.json()
    await createTasks()
    
    wykonane = 0
    niewykonane = 0
    for(var i=0;i<=json.length-1;i++){
        if(json[i].done==0){
            niewykonane++
        }
        else{
            wykonane++
        }
    }
    if(char !=undefined){
         dCharte()
    }
     Charte()

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
function Charte(){
const ctx = document.getElementById('myChart');


char = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Wykonane', 'Nie wykonane'],
    datasets: [{
      label: 'Votes',
      data: [wykonane ,niewykonane],
      backgroundColor: [
        'green',
        'red',],
      borderColor: [
        'black',
        'black'],
      borderWidth: 2
    }]
  },
    options: {
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Done / Undone chart',
                color:"black"
            },
            tooltip:{
                enabled:false
            },
            label:{
                color:"black"
            }
        }
    }
});

}
function dCharte(){
    char.destroy()
}