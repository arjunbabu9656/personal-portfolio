let digitalclock =()=>{
    let timebox=document.getElementById("time")
    let datebox=document.getElementById("date")
     
    let dateobj= new Date()


    let curtime=dateobj.toLocaleTimeString()
    let curdate=dateobj.toLocaleDateString()

    timebox.innerText=curtime
    datebox.innerText=curdate

}