// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore,collection,addDoc, onSnapshot,doc,deleteDoc,updateDoc,getDoc,getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
const docref4 = collection(db,'blogs');
const storage = getStorage(app);
const date = new Date();
// Get the components of the date
const year = date.getFullYear();
const month = date.getMonth() + 1; // Month is zero-based, so we add 1
const day = date.getDate();
//elements call ---------------------------------------------------------------------------------------------
// Format the date as a string
const formattedDate = `${day}/${month}/${year}`;
const addprojectbtn=document.getElementById('addprojectbtn');
const mainimg=document.getElementById('mainimg');
const imglabel=document.getElementById('imglabel');
// header functions -----------------------------------------------------------------------------------------
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
//upload images =--------------------------------------------------------------------------------------------
var files=[]
var reader= new FileReader();
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
            confirming('project aploaded successfully')
        }
        })

}
//add project functions --------------------------------------------------------------------------------------
addprojectbtn.onclick=()=>{
    imageupprocess();
}
//messages functions ------------------------------------------------------------------------------------------
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
// confirming functions ------------------------------------------------------------------------------------------
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
//get projects function ----------------------------------------------------------------------------------------------------------
function getProjects (){
    onSnapshot(docref3,(snapshot)=>{
        let projects=[]
        let prodiv=''
        snapshot.docs.forEach(doc=>{
            projects.push({id:doc.id,...doc.data()})
            prodiv+=`
            <tr>
                        <td>${doc.data().proname}</td>
                        <td><p>${doc.data().mainimg}</p></td>
                        <td><p>${doc.data().prodisc}</p></td>
                        <td><p>${doc.data().prolink}</p></td>
                        <td><i class="fa-solid fa-info" id="prod_info" data_id="${doc.id}"></i></td>
                        <td><i class="fa-solid fa-trash-can" id="prod_delete" deldata-id="${doc.id}"></i></td>
                    </tr>
            `;
        })
        document.getElementById('prodBody').innerHTML=prodiv;
        deleteProject(db);
        projectInfo(db);
    })
}
getProjects();
function deleteProject(){
    let deleteprobtns = document.querySelectorAll("#prod_delete")
    if(!deleteprobtns || !deleteprobtns.length) return;
        deleteprobtns.forEach(btnpro =>{
            btnpro.addEventListener("click", async(e)=>{
                const id = e.target.getAttribute('deldata-id')
                const docref = doc(db , 'projects', id)
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
function projectInfo(){
    let prodinfobtn = document.querySelectorAll("#prod_info")
    if(!prodinfobtn || !prodinfobtn.length) return;
        prodinfobtn.forEach(btnpro =>{
            btnpro.addEventListener("click", async(e)=>{
                const id = e.target.getAttribute('data_id')
                const docref = doc(db , 'projects', id)
                const prosnap = await getDoc(docref)
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
// comments functions ------------------------------------------------------------------------------------------
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
//statics functions ----------------------------------------------------------------------------------------------
const prods_sum = document.getElementById('prods_sum');
const interval = 500;
let startValue1 = -1;
countDocuments(docref3).then((count) => {
    const endValue = count;
    let duration = Math.floor(interval / endValue);
    let counter =setInterval(function(){
        startValue1 +=1;
        prods_sum.textContent = startValue1;
        if(startValue1 ==endValue){
            clearInterval(counter);
        }
    },duration);
});
//---------------------------------------------------------
const blogs_sum = document.getElementById('blogs_sum');
let startValue2 = -1;
countDocuments(docref4).then((count) => {
    const endValue = count;
    let duration = Math.floor(interval / endValue);
    let counter =setInterval(function(){
        startValue2 +=1;
        blogs_sum.textContent = startValue2;
        if(startValue2 ==endValue){
            clearInterval(counter);
        }
    },duration);
});
//---------------------------------------------------------
const comments_sum = document.getElementById('comments_sum');
let startValue3 = -1;
countDocuments(docref1).then((count) => { 
    const endValue = count;
    let duration = Math.floor(interval / endValue);
    let counter =setInterval(function(){
        startValue3 +=1;
        comments_sum.textContent = startValue3;
        if(startValue3 ==endValue){
            clearInterval(counter);
        }
    },duration);   
});
//---------------------------------------------------------
const messages_sum = document.getElementById('messages_sum');
let startValue4 = -1;
countDocuments(docref2).then((count) => {
    const endValue = count;
    let duration = Math.floor(interval / endValue);
    let counter =setInterval(function(){
        startValue4 +=1;
        messages_sum.textContent = startValue4;
        if(startValue4 ==endValue){
            clearInterval(counter);
        }
    },duration);    
});
async function countDocuments(collectionRef) {
    try { // Use query with limit  
        const snapshot = await getDocs(collectionRef);
        // Empty check and size for total count
        return snapshot.empty ? 0 : snapshot.size;
        } catch (error) {
            console.error("Error counting documents:", error);
        return 0; // Return 0 on error for safety
        }
}
//blogs dunctions -----------------------------------------------------------------------------------------------
const publisher_name = document.getElementById('publisher-name')
const blog_title = document.getElementById('blog-title')
const blog_date = document.getElementById('blog-date')
const blog_content = document.getElementById('blog-content')
const addblogbtn = document.getElementById('addblogbtn')
const blog_sources = document.getElementById('blog-sources')
function addBlog(){
    const publisher = publisher_name.value;
    const title = blog_title.value;
    const blogdate = blog_date.value;
    const content = blog_content.value;
    const blogsources = blog_sources.value;
    try {
        addDoc(docref4,{
            blogtitle:title,
            blogpublisher:publisher,
            blogdate:blogdate,
            blogcontent:content,
            blogsource:blogsources,
            dislikes:0,
            likes:0,
        })
        confirming('project aploaded successfully')
        publisher_name.value = '';
        blog_title.value = '';
        blog_date.value = '';
        blog_content.value = '';
        blog_sources.value = '';
        } catch (error) {
        confirming('project aploaded successfully')
    }
}
addblogbtn.onclick=()=>{
    addBlog();
}
//get blogs function ----------------------------------------------------------------------------------------------------------
function getblogs (){
    onSnapshot(docref4,(snapshot)=>{
        let blogs=[]
        let prodiv=''
        snapshot.docs.forEach(doc=>{
            blogs.push({id:doc.id,...doc.data()})
            prodiv+=`
            <tr>
                        <td>${doc.data().blogtitle}</td>
                        <td><p>${doc.data().blogpublisher}</p></td>
                        <td><p>${doc.data().blogdate}</p></td>
                        <td><p>${doc.data().blogcontent}</p></td>
                        <td><p>${doc.data().blogsource}</p></td>
                        <td><i class="fa-solid fa-trash-can" id="prod_delete" deldata-id="${doc.id}"></i></td>
                    </tr>
            `;
        })
        document.getElementById('blogBody').innerHTML=prodiv;
        deleteblog(db);
    })
}
getblogs();
function deleteblog(){
    let deleteprobtns = document.querySelectorAll("#prod_delete")
    if(!deleteprobtns || !deleteprobtns.length) return;
        deleteprobtns.forEach(btnpro =>{
            btnpro.addEventListener("click", async(e)=>{
                const id = e.target.getAttribute('deldata-id')
                const docref = doc(db , 'blogs', id)
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