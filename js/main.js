const text=document.getElementById("sec-text");
var styleElem = document.head.appendChild(document.createElement("style"));
const textanime=document.getElementById("textanime");
const timeLoad=()=>{
    setTimeout(() => {
        text.textContent="Web Developer."
    }, 0);
    setTimeout(() => {
        text.textContent="Mobile Developer."
    }, 4000);
    setTimeout(() => {
        text.textContent="Graphic Designer"
    }, 8000);
}
timeLoad();
setInterval(timeLoad, 12000)
const upbtn=document.getElementById("upbtn");
const navs=document.getElementById("navs");
upbtn.onclick=()=>{
    scroll(0,0)
}
window.onscroll=function(){
    if(scrollY>400){
        navs.style.display='none'
        upbtn.style.display="flex";
    }else{
        upbtn.style.display="none";
        navs.style.display="flex";
    }
}
const mode = document.getElementById('mode')
const colorfrist = document.querySelectorAll(".color1")
const colorsec = document.querySelectorAll(".color2")
const title = document.querySelectorAll(".title")
let mood = 'dark'
mode.onclick=()=>{
    if(mood=='dark'){
        for(let i=0;i<colorfrist.length;i++){
            colorfrist[i].style.background='#dedede'
            // colorfrist[0].style.background=`linear-gradient(90deg,#dedede 50%,#410179)`
        }
        for(let i=0;i<colorsec.length;i++){
            colorsec[i].style.backgroundColor='#fff'
        }
        for(let i=0;i<title.length;i++){
            title[i].style.color='#222'
        }
        styleElem.innerHTML = `
        .text.sec-text::before {   
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #FE8529;
            font-size: 25px;
            background-color: #dedede;
            border-left:2px solid #8530d1 ;
            transition: 0.5s ease-in-out;
            animation: animate2 4s steps(12) infinite;
        }
        @keyframes animate2 {
            40%,60%{left: 100%;}
            100%{left: 0%;}
        }`;
        mode.innerHTML='<i class="fa-solid fa-moon"></i>'
        mood='light'
    }else{
        for(let i=0;i<colorfrist.length;i++){
            colorfrist[i].style.background='#140b1c'
            // colorfrist[0].style.background=`linear-gradient(90deg,#222 40%,#410179)`
        }
        for(let i=0;i<colorsec.length;i++){
            colorsec[i].style.backgroundColor='#21122e'
        }
        for(let i=0;i<title.length;i++){
            title[i].style.color='#fff'
        }
        styleElem.innerHTML = `
        .text.sec-text::before {   
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #FE8529;
            font-size: 25px;
            background-color: #140b1c;
            border-left:2px solid #8530d1 ;
            transition: 0.5s ease-in-out;
            animation: animate2 4s steps(12) infinite;
        }
        @keyframes animate2 {
            40%,60%{left: 100%;}
            100%{left: 0%;}
        }`;
        mode.innerHTML='<i class="fa-solid fa-sun"></i>'
        mood='dark'
    }
}
// let color1 = document.getElementsByClassName('.color1')
let member1 = document.getElementById('member1')
let member2 = document.getElementById('member2')
let member3 = document.getElementById('member3')
let mem1 = document.getElementById('mem1')
let mem2 = document.getElementById('mem2')
let mem3 = document.getElementById('mem3')
member1.onclick=()=>{
    member1.style.borderBottom='2px solid #8530d1';
    mem1.style.display='block'
    member2.style.borderBottom='none';
    mem2.style.display='none'
    member3.style.borderBottom='none';
    mem3.style.display='none'
}
member2.onclick=()=>{
    member2.style.borderBottom='2px solid #8530d1';
    mem2.style.display='block'
    member1.style.borderBottom='none';
    mem1.style.display='none'
    member3.style.borderBottom='none';
    mem3.style.display='none'
}
member3.onclick=()=>{
    member3.style.borderBottom='2px solid #8530d1';
    mem3.style.display='block'
    member2.style.borderBottom='none';
    mem2.style.display='none'
    member1.style.borderBottom='none';
    mem1.style.display='none'
}

