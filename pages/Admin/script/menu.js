import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc
} 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");
const sizesInput = document.getElementById("sizes");
const addonsInput = document.getElementById("addons");

const addProductBtn = document.getElementById("addProduct");

const productsContainer = document.getElementById("productsContainer");

const productsRef = collection(db,"products");



let editId = null;




addProductBtn.addEventListener("click", async()=>{


    const product = {


        name:nameInput.value,

        category:categoryInput.value,

        price:Number(priceInput.value),

        image:imageInput.value,


        sizes:sizesInput.value
        .split(",")
        .map(x=>x.trim()),


        addons:addonsInput.value
        .split(",")
        .map(x=>x.trim()),


        available:true


    };



    await addDoc(
        productsRef,
        product
    );



    nameInput.value="";
    priceInput.value="";
    imageInput.value="";
    sizesInput.value="";
    addonsInput.value="";


});









onSnapshot(productsRef,(snapshot)=>{


    productsContainer.innerHTML="";



    snapshot.forEach((item)=>{


        const product=item.data();



productsContainer.innerHTML += `

<div class="bg-white rounded-xl shadow p-5">

<div class="flex justify-between">

<h2 class="font-bold text-lg">

${product.name}

</h2>


<span class="${
product.available
? "text-green-600"
: "text-red-600"
} font-bold">

${
product.available
? "Available"
: "Sold Out"
}

</span>


</div>



<p class="text-gray-500 mt-2">

${product.category}

</p>



<p class="font-bold text-[#009436] text-xl mt-3">

₱${product.price}

</p>



<div class="flex gap-2 mt-5">


<button

onclick="editProduct('${item.id}')"

class="flex-1 bg-blue-500 text-white py-2 rounded-lg">

Edit

</button>



<button

onclick="toggleProduct('${item.id}',${product.available})"

class="flex-1 bg-yellow-500 text-white py-2 rounded-lg">

${
product.available
? "Sold Out"
: "Available"
}

</button>



<button

onclick="deleteProduct('${item.id}')"

class="flex-1 bg-red-500 text-white py-2 rounded-lg">

Delete

</button>


</div>


</div>

`;



    });


});









window.deleteProduct = async function(id){



    const confirmDelete = confirm(
        "Delete this product?"
    );


    if(!confirmDelete) return;



    await deleteDoc(
        doc(db,"products",id)
    );



}









window.toggleProduct = async function(id,status){



    await updateDoc(

        doc(db,"products",id),

        {

            available:!status

        }

    );


}









const editModal = document.getElementById("editModal");


const editName = document.getElementById("editName");

const editCategory = document.getElementById("editCategory");

const editPrice = document.getElementById("editPrice");

const editImage = document.getElementById("editImage");

const editSizes = document.getElementById("editSizes");

const editAddons = document.getElementById("editAddons");


const saveEdit = document.getElementById("saveEdit");

const closeEdit = document.getElementById("closeEdit");







window.editProduct = function(id){


    editId=id;



    onSnapshot(
        doc(db,"products",id),
        (snapshot)=>{


            const product=snapshot.data();



            editName.value=product.name;

            editCategory.value=product.category;

            editPrice.value=product.price;

            editImage.value=product.image;


            editSizes.value=
            product.sizes.join(",");


            editAddons.value=
            product.addons.join(",");



        }
    );



    editModal.classList.remove("hidden");


}








saveEdit.addEventListener("click",async()=>{



    await updateDoc(

        doc(db,"products",editId),

        {


            name:editName.value,


            category:editCategory.value,


            price:Number(editPrice.value),


            image:editImage.value,


            sizes:
            editSizes.value
            .split(",")
            .map(x=>x.trim()),


            addons:
            editAddons.value
            .split(",")
            .map(x=>x.trim())

        }

    );



    editModal.classList.add("hidden");


});







closeEdit.addEventListener("click",()=>{


    editModal.classList.add("hidden");


});



const logout = document.getElementById("logout");


logout?.addEventListener("click",()=>{


    document.cookie =
    "adminLogin=false; max-age=0; path=/";


    window.location.href="/admin.html";


});





const menuBtn=document.getElementById("menuBtn");

const sidebar=document.getElementById("sidebar");

const overlay=document.getElementById("overlay");




if(menuBtn){


menuBtn.onclick=()=>{


    sidebar.classList.remove("-translate-x-full");

    overlay.classList.remove("hidden");


}



}




if(overlay){


overlay.onclick=()=>{


    sidebar.classList.add("-translate-x-full");

    overlay.classList.add("hidden");


}



}