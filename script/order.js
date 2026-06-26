import { db } from "./firebase.js";

import {
collection,
onSnapshot,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


const ordersContainer =
document.getElementById("ordersContainer");


const ordersRef = query(
    collection(db,"orders"),
    orderBy("date","desc")
);


onSnapshot(ordersRef,(snapshot)=>{

ordersContainer.innerHTML="";

let hasActiveOrders = false;

snapshot.forEach((doc)=>{

const order = doc.data();

if(
    order.status === "Completed" ||
    order.status === "Cancelled"
){
    return;
}

hasActiveOrders = true;

ordersContainer.innerHTML += `

<div class="border rounded-xl p-5">

<div class="flex justify-between items-center">

<h2 class="font-bold text-xl">
Queue #${order.queueNumber}
</h2>

<span class="px-3 py-2 rounded-full bg-yellow-100">
${order.status}
</span>

</div>

<p class="text-gray-500 text-sm">
${order.date}
</p>

<hr class="my-4">

${order.items.map(item=>`

<div class="flex justify-between">

<span>
${item.quantity}x ${item.name}
</span>

<span>
₱${item.total}
</span>

</div>

`).join("")}

<hr class="my-4">

<div class="flex justify-between font-bold">

<span>Total</span>

<span>
₱${order.total}
</span>

</div>

</div>

`;

});

if(!hasActiveOrders){

ordersContainer.innerHTML = `

<div class="col-span-full border rounded-xl p-10 text-center">

<h2 class="text-2xl font-bold">
No Active Orders
</h2>

<p class="text-gray-500 mt-2">
You don't have any pending orders.
</p>

<a
href="homepage.html"
class="inline-block mt-6 bg-[#009436] text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition">

Start New Order

</a>

</div>

`;

}

});



const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const closeMenu = document.getElementById("closeMenu");

const sidebarOverlay = document.getElementById("sidebarOverlay");


if(menuBtn){

menuBtn.addEventListener("click",()=>{

sidebar.classList.remove("-translate-x-full");

sidebarOverlay.classList.remove("hidden");

});

}


if(closeMenu){

closeMenu.addEventListener("click",()=>{

sidebar.classList.add("-translate-x-full");

sidebarOverlay.classList.add("hidden");

});

}


if(sidebarOverlay){

sidebarOverlay.addEventListener("click",()=>{

sidebar.classList.add("-translate-x-full");

sidebarOverlay.classList.add("hidden");

});

}