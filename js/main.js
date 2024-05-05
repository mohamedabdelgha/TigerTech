// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore,collection,addDoc, onSnapshot,doc,getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3EACkyKNbRBuXxAjj1mypX9ejOCMU_I8",
    authDomain: "pyramid-website.firebaseapp.com",
    projectId: "pyramid-website",
    storageBucket: "pyramid-website.appspot.com",
    messagingSenderId: "666454103950",
    appId: "1:666454103950:web:b8c65fda68f449bd8ef6df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docref1 = collection(db,'comments');
const docref2 = collection(db,'contacts');
const docref3 = collection(db,'projects');
const date = new Date();
// Get the components of the date
const year = date.getFullYear();
const month = date.getMonth() + 1; // Month is zero-based, so we add 1
const day = date.getDate();
// Format the date as a string
const formattedDate = `${day}/${month}/${year}`;
// messages functions ------------------------------
function confirming(textcontent){
    let warnning = document.createElement('div');
    warnning.style.cssText=`
    display: flex;
    position:fixed;
    top:5%;
    left:5%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-width: 30%;
    max-width: fit-content;
    height:fit-content;
    padding: 10px;
    color: #fff;
    font-size:10px;
    background: linear-gradient(#6C328C,#a669db);
    border-radius: 10px;
    z-index:1001;
    transition:0.5s ease-in-out;
    `;
    let warntxt = document.createElement('h1')
    warntxt.innerText=textcontent;
    warnning.appendChild(warntxt);
    document.body.append(warnning);
    setTimeout(function() {
        warnning.style.left = '-10%';
        warnning.style.opacity = '0';
        setTimeout(function() {
        warnning.style.display = 'none';
        }, 500);
    }, 2000);
}
//coments functions --------------------------------
let comname = document.getElementById('name')
let comtext = document.getElementById('Feedback')
let addcom = document.getElementById('submit')
function addComment(){
    if(comname.value==''|| comtext.value==''){
        return alert("please enter your name and comment")
    }else{
    try {
        addDoc(docref1,{
            name:comname.value,
            comment:comtext.value,
            date:formattedDate,
        })
        comname.value='';
        comtext.value='';
        confirming('thanks for leaving a feedback');
    } catch (error) {
        console.log(error)
    }}
}
addcom.onclick=()=>{
    addComment();
}
function getcomment(){
    onSnapshot(docref1,(snapshot)=>{
        let comments=[]
        let comdiv=''
        snapshot.docs.forEach(doc=>{
            comments.push({id:doc.id,...doc.data()})
            comdiv+=`
            <li class="comment">
            <h1>,,</h1>
            <div class="discreption">
                <p>${doc.data().comment}</p>
                <h3>${doc.data().name}</h3>
                <span>${doc.data().date}</span>
            </div>
            </li>
            `;
        })
        document.getElementById('commentsCon').innerHTML=comdiv;
    })
}
getcomment();
// ----------------------------------------------------------------------------------------------------------
const dotsCON=document.querySelector(".dotscon");
const dotsCON2=document.querySelector(".dotscon2");
for(var i=0;i<30;i++){
    const blocks1=document.createElement("div");
    const blocks2=document.createElement("div");
    blocks1.classList.add("dots");
    blocks2.classList.add("dots");
    dotsCON.appendChild(blocks1)
    dotsCON2.appendChild(blocks2)
};
// ----------------------------------------------------------------------------------------------------------
// Define the image URLs (replace with your actual image URLs)
const imageUrls = [
    "img/person1.jpg",
    "img/person2.jpg",
    "img/person3.jpg",
    "img/person4.jpg",
    "img/person5.jpg",
    "img/person6.jpg",
    "img/person7.jpg",
];

// Get all the div elements (assuming they have a class 'image-container')
const imageContainers = document.querySelector(".custom");
for(let i=0; i<7; i++){
    const images=document.createElement("div");
    images.classList.add("image_containers");
    imageContainers.appendChild(images)
}
// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    let currentIndex = array.length,
    randomIndex;

    // While there are elements remaining
    while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
    ];
    }

    return array;
}

// Shuffle the image URLs
const shuffledUrls = shuffleArray(imageUrls.slice()); // Create a copy to avoid modifying original array
const image_containers = document.querySelectorAll('.image_containers')
// Assign shuffled image URLs to each div
image_containers.forEach((container, index) => {
    const image = document.createElement("img");
    image.src = shuffledUrls[index];
    container.appendChild(image);
});  
//get projects function ----------------------------------------------------------------------------------------------------------
function getProjects (){
    onSnapshot(docref3,(snapshot)=>{
        let projects=[]
        let prodiv=''
        snapshot.docs.forEach(doc=>{
            projects.push({id:doc.id,...doc.data()})
            prodiv+=`
            <li class="card">
            <div class="image">
                <img src="${doc.data().imagelink}" alt="${doc.data().mainimg}" draggable="false">
            </div>
            <div class="discreption">
                <h3>${doc.data().proname}</h3>
                <p>${doc.data().prodisc}</p>
                <span id="prod_info" data_id="${doc.id}">see more</span>
            </div>
            </li>
            `;
        })
        document.getElementById('cardsCon').innerHTML=prodiv;
        document.getElementById('cardsCon2').innerHTML=prodiv;
        getdetails(db);
    })
}
getProjects();
function getdetails(){  
    let getbtns = document.querySelectorAll("#prod_info")
    if(!getbtns || !getbtns.length) return;
    getbtns.forEach(getbtn =>{
        getbtn.addEventListener("click", async(e)=>{
            const id = e.target.getAttribute('data_id')
            const proref = doc(db,'projects',id)
            const prosnap = await getDoc(proref)
            let procarddetails = document.getElementById('procarddetails')
            procarddetails.style.opacity='1';
            procarddetails.style.display='flex';
            let prodetailsdiv='';
            prodetailsdiv+=`
            <div class="details">
                <h2 class="title"><span>project name : </span>${prosnap.data().proname}</h2>
                <h6 class="title"><span>date : </span>${prosnap.data().prodate}</h6>
                <p class="title"><span>discreption : </span>${prosnap.data().prodisc}</p>
                <a href="">see githup repo</a>
            </div>
            <iframe class="provideo"  title="this video will be avilable soon" src="${prosnap.data().prolink}" frameborder="0" allowfullscreen></iframe>
            `;
            document.getElementById('detailscard').innerHTML=prodetailsdiv;
        })
    })
}
let closecon = document.getElementById('closecon')
closecon.onclick=()=>{
    procarddetails.style.display='none';
}
//main section text animation function -----------------------------------------------------------------------------------------
const text=document.getElementById("sec-text");
var styleElem = document.head.appendChild(document.createElement("style"));
const textanime=document.getElementById("textanime");
const timeLoad=()=>{
    setTimeout(() => {
        text.textContent="Web Developers."
    }, 0);
    setTimeout(() => {
        text.textContent="Mobile Developers."
    }, 4000);
    setTimeout(() => {
        text.textContent="Graphic Designers."
    }, 8000);
}
timeLoad();
setInterval(timeLoad, 12000)
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
//portofolio slider functions -------------------------------------------------------------------------------------------------
const cardsWraper = document.querySelector('.cardsWraper');
const cardsCon = document.querySelector('.cardsCon');
const arrowsScroll = document.querySelectorAll('.cardsWraper i');
const firstCardWidth = cardsCon.querySelector('.card').offsetWidth;
console.log(firstCardWidth)
const secondCardWidth = firstCardWidth+100;
const cardsConChildren = [...cardsCon.children];
let cardPreview = Math.round(cardsCon.offsetWidth / secondCardWidth);
let isDragging = false , startX , startScrollLeft , timeoutId;
cardsConChildren.slice(-cardPreview).reverse().forEach(card =>{
    cardsCon.insertAdjacentHTML('afterbegin', card.outerHTML);
})
cardsConChildren.slice(0, cardPreview).forEach(card =>{
    cardsCon.insertAdjacentHTML('beforeend', card.outerHTML);
})
arrowsScroll.forEach( btn =>{
    btn.addEventListener('click' , ()=>{
        cardsCon.scrollLeft+=btn.id === 'left' ? -secondCardWidth : secondCardWidth ;
    });
});
const dragstart = (e)=>{
    isDragging=true;
    cardsCon.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = cardsCon.scrollLeft;
};
const dragging = (e)=>{
    if(!isDragging) return;
    cardsCon.scrollLeft =startScrollLeft- (e.pageX - startX);
}
const dragstop = ()=>{
    isDragging=false;
    cardsCon.classList.remove('dragging');
}
const infiniteScroll =  ()=>{
    if(cardsCon.scrollLeft === 0){
        cardsCon.classList.add('notransition')
        cardsCon.scrollLeft = cardsCon.scrollWidth - (2*cardsCon.offsetWidth);
        cardsCon.classList.remove('notransition')
    }else if(Math.ceil(cardsCon.scrollLeft) === cardsCon.scrollWidth - cardsCon.offsetWidth){
        cardsCon.classList.add('notransition')
        cardsCon.scrollLeft = cardsCon.offsetWidth;
        cardsCon.classList.remove('notransition')
    }
    clearTimeout(timeoutId);
    if(!cardsWraper.matches(':hover')) autoPlay();
}
const autoPlay = ()=>{
    if(window.innerWidth <800) return;
    timeoutId = setTimeout(()=> cardsCon.scrollLeft += secondCardWidth,2500)
}
autoPlay();
cardsCon.addEventListener( 'mousedown', dragstart );
cardsCon.addEventListener( 'mousemove', dragging );
document.addEventListener( 'mouseup', dragstop );
cardsCon.addEventListener( 'scroll', infiniteScroll );
cardsWraper.addEventListener( 'mouseenter', ()=>{clearTimeout(timeoutId);} );
cardsWraper.addEventListener( 'mouseleave', autoPlay );
//feedback slider functions -----------------------------------------------------------------------------------------------
function feedbackSlider(){
    const commetsWraper = document.querySelector('.commetsWraper');
    const commentsCon = document.querySelector('.commentsCon');
    const firstcommentWidth = commentsCon.querySelector('.comment').offsetWidth;
    const secondcommentWidth = firstcommentWidth+40;
    const commentsConChildren = [...commentsCon.children];
    let commentPreview = Math.round(commentsCon.offsetWidth / secondcommentWidth);
    let isDragging2 = false , startX2 , startScrollLeft2 , timeoutId2;
    commentsConChildren.slice(-commentPreview).reverse().forEach(comment =>{
        commentsCon.insertAdjacentHTML('afterbegin', comment.outerHTML);
    })
    commentsConChildren.slice(0, commentPreview).forEach(comment =>{
        commentsCon.insertAdjacentHTML('beforeend', comment.outerHTML);
    })

    const dragstart2 = (e)=>{
        isDragging2=true;
        commentsCon.classList.add('dragging');
        startX2 = e.pageX;
        startScrollLeft2 = commentsCon.scrollLeft;
    };
    const dragging2 = (e)=>{
        if(!isDragging2) return;
        commentsCon.scrollLeft =startScrollLeft2- (e.pageX - startX2);
    }
    const dragstop2 = ()=>{
        isDragging2=false;
        commentsCon.classList.remove('dragging');
    }
    const infiniteScroll2 =  ()=>{
        if(commentsCon.scrollLeft === 0){
            commentsCon.classList.add('notransition')
            commentsCon.scrollLeft = commentsCon.scrollWidth - (2*commentsCon.offsetWidth);
            commentsCon.classList.remove('notransition')
        }else if(Math.ceil(commentsCon.scrollLeft) === commentsCon.scrollWidth - commentsCon.offsetWidth){
            commentsCon.classList.add('notransition')
            commentsCon.scrollLeft = commentsCon.offsetWidth;
            commentsCon.classList.remove('notransition')
        }
        clearTimeout(timeoutId2);
        if(!commetsWraper.matches(':hover')) autoPlay2();
    }
    const autoPlay2 = ()=>{
        if(window.innerWidth <800) return;
        timeoutId2 = setTimeout(()=> commentsCon.scrollLeft += secondcommentWidth,2000)
    }
    autoPlay2();
    commentsCon.addEventListener( 'mousedown', dragstart2 );
    commentsCon.addEventListener( 'mousemove', dragging2 );
    document.addEventListener( 'mouseup', dragstop2 );
    commentsCon.addEventListener( 'scroll', infiniteScroll2 );
    commetsWraper.addEventListener( 'mouseenter', ()=>{clearTimeout(timeoutId);} );
    commetsWraper.addEventListener( 'mouseleave', autoPlay2 );
}
feedbackSlider();
//header functions -------------------------------------------------------------------------------
const navsbar = document.querySelector( '.navsbar' ) ;
const links = document.querySelectorAll( '.navsbar li' ) ;
links.forEach(link =>{
    link.onclick = function(){
        const dataId = link.getAttribute("dataid");
        window.location.href=`${dataId}`;
        for(let i=0;i<links.length;i++){
            links[i].classList.remove("active")
        }
        link.classList.toggle( "active" );
    };
})
const cursor = document.querySelectorAll( "#cursor" );
const theme_toggle = document.querySelectorAll( "#theme-toggle" );
const bgcolor = document.querySelectorAll( ".bgcolor" );
const txtcolor = document.querySelectorAll( ".txtcolor" );
const sec_text = document.querySelector( ".sec-text" );
const rocket = document.getElementById( "rocket" );
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
const closedetwin = document.getElementById('closedetwin')
const menubtn = document.getElementById('menubtn')
const menucon = document.getElementById('menucon')
menubtn.onclick=()=>{
    menucon.style.visibility='visible';
    menucon.style.opacity='1';
}
closedetwin.onclick=()=>{
    menucon.style.visibility='hidden';
    menucon.style.opacity='0';
}
// team functions -----------------------------------------------------------------------------------------
const team_card = document.querySelectorAll('#team_card');
const selectedIIMG = document.getElementById("selectedIIMG");
for(let i=0;i<team_card.length;i++){

    team_card[i].onclick=()=>{
        team_card.forEach((card)=>{
            card.classList.remove('selected')
            const metadata = card.getAttribute('metadata');
            const div = document.getElementById(metadata);
            div.style.display="none";
        });
        team_card[i].classList.add("selected");
        const cardIMG = team_card[i].querySelector('img');
        selectedIIMG.src = cardIMG.src;
        const metadata_i = team_card[i].getAttribute('metadata');
        const div_i = document.getElementById(metadata_i);
        div_i.style.display='flex';
    }
    window.onload=()=>{
        team_card[0].classList.add("selected");
        const metadata_i = team_card[0].getAttribute('metadata');
        const div_i = document.getElementById(metadata_i);
        div_i.style.display='flex';
        const cardIMG = team_card[0].querySelector('img');
        selectedIIMG.src = cardIMG.src;
        
    }
}
//------------------------------------------------------------------------------------------
const closedetwin2 = document.getElementById('closedetwin2');
const windowcon = document.getElementById('window');
closedetwin2.onclick=()=>{
    windowcon.style.visibility='hidden';
    windowcon.style.opacity='0';
}
// contact functions ------------------------------------------------------------------------------------------
const submit_email = document.getElementById('submit_email');
const contact_input = document.getElementById('contact_input');
const fname_input = document.getElementById('fname_input')
const lname_input = document.getElementById('lname_input')
const email_input = document.getElementById('email_input')
const phone_input = document.getElementById('phone_input')
const country_input = document.getElementById('country_input')
const job_input = document.getElementById('job_input')
const submitjobbtn = document.getElementById('submitjobbtn')
submit_email.onclick=()=>{
    if(contact_input.value==''){
        alert('Please enter your email!')
    }
    else {
        windowcon.style.visibility='visible';
        windowcon.style.opacity='1';
        email_input.value=contact_input.value
    };
}
function sendmessage(){
    if(fname_input.value==''|| phone_input.value==''|| job_input.value==''|| email_input.value==''){
        return alert("please enter your data")
    }else{
    try {
        addDoc(docref2,{
            name:fname_input.value+ " "+lname_input.value,
            phone:phone_input.value,
            email:email_input.value,
            message:job_input.value,
            country:country_input.value,
            date:formattedDate,
        })
        contact_input.value='';
        windowcon.style.visibility='hidden';
        windowcon.style.opacity='0';
        confirming('thanks for dealing with us ,we will reach you soon.');
    } catch (error) {
        console.log(error)
    }}
};
submitjobbtn.onclick=()=>{
    sendmessage();
}
//------------------------------------------------------------------------------------------
