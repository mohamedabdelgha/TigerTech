//up btn function ----------------------------------------------------------------------------------------------------------------
const upbtn=document.getElementById("upbtn");
const header=document.querySelector("header");
upbtn.onclick=()=>{
    scroll(0,0)
}
window.onscroll=function(){
    if(scrollY>400){
        upbtn.style.display="flex";
        header.classList.add("fixed")
    }else{
        upbtn.style.display="none";
        header.classList.remove("fixed")
    }
}
const cursor = document.querySelectorAll( "#cursor" );
const theme_toggle = document.querySelectorAll( "#theme-toggle" );
const bgcolor = document.querySelectorAll( ".bgcolor" );
const txtcolor = document.querySelectorAll( ".txtcolor" );
const sec_text = document.querySelector( ".sec-text" );
cursor.forEach((item)=>{
    item.onclick=()=>{
        // theme_toggle.classList.toggle('selected')
        theme_toggle.forEach((i)=> { i.classList.toggle('selected'); }) 
        bgcolor.forEach((i)=> { i.classList.toggle('dark'); }) 
        txtcolor.forEach((i)=> { i.classList.toggle('dark'); }) 
        sec_text.classList.toggle('dark');
        rocket.style.display = rocket.style.display === 'none' ? 'block':'none';
    }
})
