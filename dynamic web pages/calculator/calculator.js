let display=document.getElementById('display')
let clickbtn=(e)=>{
    display.value+=e.target.innerText
}
let result=()=>{
    display.value=eval(display.value)
}
let clearall=()=>{
    display.value=""
}
let bodycolor=()=>{
  let color= document.getElementsByTagName('body')
    color.classList.add('dark')
    color.classList.toggle('white')
}