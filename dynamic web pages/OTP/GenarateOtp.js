let genarateOtp=()=>{
    let otpbox=document.getElementById("otpbox")
    let ramdomnum=Math.random()*1000000

    let otp=Math.floor(ramdomnum);
    (otp>=1000) ? otpbox.innerText=otp:genarateOtp()
}