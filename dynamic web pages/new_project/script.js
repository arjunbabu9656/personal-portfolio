// let amzone_calculator=()=>{
//     let input_fild = document.getElementById('input_fild')
//     let calculationBtn = document.getElementById('calculation')
//     let nothing=document.getElementById('nothing')
//       let value=  Number(input_fild.value)
//     if (input_fild.value <= 40) {
//       let res= value +10
//       nothing.innerText=res
//     }else{
//          nothing.innerText=value
//     }
// }
// //===================================================================================
//  let subscibebtn=()=>{
//  let subbtn= document.getElementById('SubBtn')
//  if (subbtn.innerText==='Subscribe') {
//    subbtn.innerText='Subscribed'
//    subbtn.classList.add('black')
//     subbtn.classList.add('pointer')
//  }else{
//    subbtn.innerText='Subscribe'
//    subbtn.classList.remove('black')
//    subbtn.classList.add('pointer')
//  }
// }
//==================================================================================================================//
  let arr=[];
  let todolist=()=>{
  const input = document.getElementById('input')
  const p = document.getElementById('p')
  const name = input.value                  
  arr.push(name)
  p.innerHTML=arr
  input.value=''     
}
c