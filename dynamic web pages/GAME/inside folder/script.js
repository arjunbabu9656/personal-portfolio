let YourScore=0
let ComputerScore=0
let tie=0
let display= document.getElementById('result');
let Rock=()=>{
    let yours=document.getElementById('yours')
    let computers =document.getElementById('computers')
    let tieScore= document.getElementById('tie')
    let randomNumber=Math.random()
    let computemove= randomNumber < 1/3 ? '✊' : randomNumber < 2/3? '✋': '✌'
    let result = computemove === '✊' ? 'TIE' : computemove ==='✋' ? 'LOSS' : 'WIN'
    result==='WIN'? YourScore++:result==='LOSS'? ComputerScore++: result==='TIE'? tie++ :null
    display.innerText=(`you pick ✊.computer pic ${computemove} and you ${result}`)
    tieScore.innerText=tie;
    yours.innerText=YourScore;
    computers.innerText=ComputerScore;
}
let paper=()=>{
    let yours=document.getElementById('yours')
    let computers =document.getElementById('computers')
    let tieScore= document.getElementById('tie')
    let randomNumber=Math.random()
    let computemove= randomNumber < 1/3 ? '✊' : randomNumber < 2/3? '✋': '✌'
    let result = computemove === '✋' ? 'TIE' : computemove ==='✊' ? 'WIN' : 'LOSS'
    result==='WIN'? YourScore++:result==='LOSS'? ComputerScore++: result==='TIE'? tie++ :null
    display.innerText=(`you pick ✋.computer pic ${computemove} and you ${result}`)
    tieScore.innerText=tie;
    yours.innerText=YourScore;
    computers.innerText=ComputerScore;
}
let scissors=()=>{
    let yours=document.getElementById('yours')
    let computers =document.getElementById('computers')
    let tieScore= document.getElementById('tie')
    let randomNumber=Math.random()
    let computemove= randomNumber < 1/3 ? '✊' : randomNumber < 2/3? '✋': '✌'
    let result = computemove === '✌' ? 'TIE' : computemove ==='✊' ? 'LOSS' : 'WIN'
    result==='WIN'? YourScore++:result==='LOSS'? ComputerScore++: result==='TIE'? tie++ :null
    display.innerText=(`you pick ✌.computer pic ${computemove} and you ${result}`)
    tieScore.innerText=tie;
    yours.innerText=YourScore;
    computers.innerText=ComputerScore;
}
let restart =()=>{
   document.getElementById('restartBtn')
   let tieScore= document.getElementById('tie');
   document.getElementById('result').innerText='Make your move!'
   YourScore=0;
   ComputerScore=0;
   tie=0;
   tieScore.innerText=tie;
   yours.innerText=YourScore;
   computers.innerText=ComputerScore;
}