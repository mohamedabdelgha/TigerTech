// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore,collection,addDoc, onSnapshot,doc,deleteDoc,updateDoc,getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
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
const storage = getStorage(app);
const date = new Date();
// Get the components of the date
const year = date.getFullYear();
const month = date.getMonth() + 1; // Month is zero-based, so we add 1
const day = date.getDate();
// Format the date as a string
const formattedDate = `${day}/${month}/${year}`;
const addprojectbtn=document.getElementById('addproject');
let prolink = document.getElementById('prolink')
let messlink = document.getElementById('messlink')
let comlink = document.getElementById('comlink')
prolink.onclick=()=>{
    window.location.href='#con1'
}
messlink.onclick=()=>{
    window.location.href='#con4'
}
comlink.onclick=()=>{
    window.location.href='#con5'
}
const mode = document.getElementById('mode')
var styleElem = document.head.appendChild(document.createElement("style"));
const colorfrist = document.querySelectorAll(".color1")
const colorsec = document.querySelectorAll(".color2")
const title = document.querySelectorAll(".title1")
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
            colorfrist[i].style.background='#222'
            // colorfrist[0].style.background=`linear-gradient(90deg,#222 40%,#410179)`
        }
        for(let i=0;i<colorsec.length;i++){
            colorsec[i].style.backgroundColor='#333'
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
            background-color: #222;
            border-left:2px solid #8530d1 ;
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
//upload images =------------------------------------------------------
var files=[]
var reader= new FileReader();
const mainimg=document.getElementById('mainimg');
const imglabel=document.getElementById('imglabel');

mainimg.onchange=(e)=>{
    files = e.target.files;
    var extention = GetFileExt(files[0])
    var name = GetFileName(files[0])
    reader.readAsDataURL(files[0])
    imglabel.innerHTML = name+extention
}
function GetFileExt(file){
    var temp=file.name.split('.');
    var ext=temp.slice((temp.length-1),(temp.length));
    return '.'+ext[0];
}
function GetFileName(file){
    var temp=file.name.split('.');
    var fname = temp.slice(0,-1).join('.');
    return fname;
}
async function imageupprocess(){
    let imageUpload= files[0];
    let imgName = imglabel.innerHTML;
    const metadata = {
        contentType:imageUpload.type,
    }
    const storageref = ref(storage, 'images/'+imgName);
    const uploadTask = uploadBytesResumable(storageref,imageUpload,metadata)
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        console.log(uploadTask)
        const url = downloadURL;
        const title=document.getElementById('pro-name').value;
        const date=document.getElementById('pro-date').value;
        const discreption=document.getElementById('pro-disc').value;
        const link=document.getElementById('pro-link').value;
        try {
            addDoc(docref3,{
                proname:title,
                prodate:date,
                prodisc:discreption,
                prolink:link,
                mainimg:imglabel.innerHTML,
                imagelink:url,
            })
            confirming('project aploaded successfully')
            title='';
            date='';
            discreption='';
            link='';
        } catch (error) {
            confirming('apload error')
        }
        })

}
//add project functions -----------------------------------------------
// async function addProject(){

// }
addprojectbtn.onclick=()=>{
    imageupprocess();
    // addProject();
}
function getmessages(){
    onSnapshot(docref2,(snapshot)=>{
        let messages=[]
        let messagesdiv=''
        snapshot.docs.forEach(doc=>{
            messages.push({id:doc.id,...doc.data()})
            messagesdiv+=`
            <div class="messagescard">
                <div class="titles">
                    <i class="fa-regular fa-circle-user"></i>
                    <div class="info">
                        <h3>${doc.data().name}</h3>
                        <span>${doc.data().date}</span>
                    </div>
                </div>
                <i class="fa-solid fa-chevron-up up" id="up" data-id='${doc.id}'></i>
                <i class="fa-regular fa-trash-can del" id="del" deldata-id='${doc.id}'></i>
                <div class="submessagecard" id="messcard" condata-id='${doc.id}'>
                    <h3>${doc.data().email}</h3>
                    <h3>${doc.data().phone}</h3>
                    <div>
                    <p>${doc.data().message}</p>
                    </div>
                </div>
                </div>  
            </div>
            `;
        })
        document.getElementById('con2').innerHTML=messagesdiv;
        showmesssage(db)
        deletemesssage(db)
    })
}
getmessages();
let dismood='none'
function showmesssage(){  
    let upbtns = document.querySelectorAll("#up")
    if(!upbtns || !upbtns.length) return;
    upbtns.forEach(upbtn =>{
        upbtn.addEventListener("click", async(e)=>{
                const btnid = e.target.getAttribute('data-id')
                let messcard = document.querySelectorAll('#messcard')
                if(dismood=='none'){
                    for(let i=0;i<messcard.length;i++){
                    const conid = messcard[i].getAttribute('condata-id')
                    if (btnid == conid){    
                    messcard[i].style.display ='flex'
                    upbtn.style.rotate='180deg'
                    dismood='block'
                    }}
                }else{
                    for(let i=0;i<messcard.length;i++){
                    const conid = messcard[i].getAttribute('condata-id')
                    if (btnid == conid){  
                    messcard[i].style.display ='none'
                    upbtn.style.rotate='360deg'
                    dismood='none';
                }}}
            })
        })
}
function deletemesssage(){
    let deletemessbtns = document.querySelectorAll("#del")
    if(!deletemessbtns || !deletemessbtns.length) return;
        deletemessbtns.forEach(btnmess =>{
            btnmess.addEventListener("click", async(e)=>{
                const id = e.target.getAttribute('deldata-id')
                const docref = doc(db , 'contacts', id)
                try {
                    await deleteDoc(docref)
                    confirming('successfully deleted');
                } catch (error) {
                    console.log(error)
                    confirming('something wrong happened');
                }
            })
        })
}
// messages functions ------------------------------
function confirming(textcontent){
    let warnning = document.createElement('div');
    warnning.style.cssText=`
    display: flex;
    position:fixed;
    top:30%;
    left:10%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 80%;
    height:200px;
    padding: 20px;
    color: #fff;
    font-size:10px;
    font-family: 'Cairo', sans-serif;
    background: linear-gradient(#8530d1,#a669db);
    border-radius: 10px;
    z-index:1001;
    transition:0.5s ease-in-out;
    `;
    let warntxt = document.createElement('h1')
    warntxt.innerText=textcontent;
    warnning.appendChild(warntxt);
    document.body.append(warnning);
    setTimeout(function() {
        warnning.style.opacity = '0';
        setTimeout(function() {
        warnning.style.display = 'none';
        }, 500);
    }, 2000);
}
function getcomment(){
    onSnapshot(docref1,(snapshot)=>{
        let comments=[]
        let comdiv=''
        snapshot.docs.forEach(doc=>{
            comments.push({id:doc.id,...doc.data()})
            comdiv+=`
            <div class="comcard">
                <i class="fa-regular fa-circle-user"></i>
                <i class="fa-regular fa-trash-can del" id="del" deldata-id='${doc.id}'></i>
                <div class="subcomcard">
                    <p>${doc.data().comment}</p>
                    <div>
                    <h3>${doc.data().name}</h3>
                    <p>${doc.data().date}</p>
                    </div>
                </div>
            </div>  
            `;
        })
        document.getElementById('con3').innerHTML=comdiv;
        deletecom(db);
    })
}
getcomment();
function deletecom(){
    let deletemessbtns = document.querySelectorAll("#del")
    if(!deletemessbtns || !deletemessbtns.length) return;
        deletemessbtns.forEach(btnmess =>{
            btnmess.addEventListener("click", async(e)=>{
                const id = e.target.getAttribute('deldata-id')
                const docref = doc(db , 'comments', id)
                try {
                    await deleteDoc(docref)
                    confirming('successfully deleted');
                } catch (error) {
                    console.log(error)
                    confirming('something wrong happened');
                }
            })
        })
}