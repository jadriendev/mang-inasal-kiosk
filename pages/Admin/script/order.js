import { db } from "./firebase.js";

import {
collection,
onSnapshot,
doc,
updateDoc
}

from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


const ordersContainer = document.getElementById("ordersContainer");
const orderCount = document.getElementById("orderCount");


const ordersRef = collection(db,"orders");



onSnapshot(ordersRef,(snapshot)=>{


ordersContainer.innerHTML = "";


orderCount.textContent = `${snapshot.size} Orders`;



if(snapshot.empty){


ordersContainer.innerHTML = `

<div class="text-gray-500 text-center col-span-full">

No orders yet

</div>

`;

return;

}





snapshot.forEach((item)=>{


const order = item.data();



ordersContainer.innerHTML += `


<div class="bg-white rounded-xl shadow p-5">


<div class="flex justify-between items-center mb-4">


<h2 class="font-bold">

Order #${item.id.slice(0,6)}

</h2>


<span class="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100">

${order.status || "Pending"}

</span>


</div>




<div class="border-b pb-3 mb-3">


<p class="font-semibold">

Customer:

<span class="font-normal">

${order.customer || "Guest"}

</span>

</p>



<p>

Total:

<span class="font-bold text-[#009436]">

₱${order.total || 0}

</span>

</p>


</div>




<div class="space-y-2">



<button

onclick="updateStatus('${item.id}','Preparing')"

class="w-full bg-yellow-500 text-white py-2 rounded-lg">

Preparing

</button>





<button

onclick="updateStatus('${item.id}','Completed')"

class="w-full bg-[#009436] text-white py-2 rounded-lg">

Completed

</button>





<button

onclick="updateStatus('${item.id}','Cancelled')"

class="w-full bg-red-500 text-white py-2 rounded-lg">

Cancel

</button>




</div>



</div>


`;



});


});







window.updateStatus = async function(id,status){


const orderRef = doc(
db,
"orders",
id
);



await updateDoc(

orderRef,

{

status:status

}

);


};

const logout = document.getElementById("logout");


logout?.addEventListener("click",()=>{


    document.cookie =
    "adminLogin=false; max-age=0; path=/";


    window.location.href="/admin.html";


});

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");


if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        sidebar.classList.remove("-translate-x-full");

        overlay.classList.remove("hidden");

    });

}



if(overlay){

    overlay.addEventListener("click",()=>{

        sidebar.classList.add("-translate-x-full");

        overlay.classList.add("hidden");

    });

}