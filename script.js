
let lessons=[]
async function load(){
lessons=await fetch('lessons.json').then(r=>r.json())
buildChapters()
}
load()

function startBook(){
document.querySelector('.cover').classList.add('hidden')
document.getElementById('app').classList.remove('hidden')
}

function buildChapters(){
const nav=document.getElementById('chapters')
lessons.forEach((l,i)=>{
let d=document.createElement('div')
d.innerText=l.title
d.onclick=()=>openLesson(i)
nav.appendChild(d)
})
}

function speak(text){
let u=new SpeechSynthesisUtterance(text)
u.lang='en-US'
speechSynthesis.speak(u)
}

function openLesson(i){
let container=document.getElementById('lesson')
container.innerHTML=''
let text=lessons[i].content
let sentences=text.split(/\n+/)

sentences.forEach(s=>{
let line=document.createElement('div')

let sp=document.createElement('span')
sp.innerHTML='🔊'
sp.className='speaker'
sp.onclick=()=>speak(s)
line.appendChild(sp)

let words=s.split(' ')
words.forEach(w=>{
let span=document.createElement('span')
span.className='word'
span.innerText=w
span.onclick=()=>speak(w)
line.appendChild(span)
})

container.appendChild(line)
})
}
