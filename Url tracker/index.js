let myLeeds = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeeds")) 
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeeds = leadsFromLocalStorage
    render(myLeeds)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeeds.push(tabs[0].url)
        localStorage.setItem("myLeeds", JSON.stringify(myLeeds))
        render(myLeeds)
    })
  
})

function render(leeds){
    let listItems = ""
    for (let i=0; i<leeds.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${leeds[i]}'>
                    ${leeds[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeeds = []
    render(myLeeds)
})

inputBtn.addEventListener("click", function(){
    myLeeds.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeeds", JSON.stringify(myLeeds))

    render(myLeeds)

    console.log(localStorage.getItem("myLeeds"))
})
