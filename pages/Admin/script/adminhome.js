import { db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


const salesElement = document.querySelector("#sales");
const ordersElement = document.querySelector("#orders");
const pendingElement = document.querySelector("#pending");
const productsElement = document.querySelector("#products");
const recentOrders = document.querySelector("#recentOrders");


const ordersRef = collection(db,"orders");


onSnapshot(ordersRef,(snapshot)=>{


    let totalSales = 0;
    let totalOrders = 0;
    let pendingOrders = 0;


    snapshot.forEach((doc)=>{


        const order = doc.data();


        totalOrders++;


        totalSales += Number(order.total || 0);



        if(
            order.status === "Pending" ||
            order.status === "Preparing"
        ){

            pendingOrders++;

        }


    });



    salesElement.textContent =
    `₱${totalSales.toLocaleString()}`;


    ordersElement.textContent =
    totalOrders;


    pendingElement.textContent =
    pendingOrders;



});



const productsRef = collection(db,"products");


onSnapshot(productsRef,(snapshot)=>{


    productsElement.textContent =
    snapshot.size;


});




const recentQuery = query(
    collection(db,"orders"),
    orderBy("date","desc"),
    limit(5)
);



onSnapshot(recentQuery,(snapshot)=>{


    if(!recentOrders) return;


    recentOrders.innerHTML = "";



    if(snapshot.empty){


        recentOrders.innerHTML = `

        <div class="text-gray-500 text-center py-10">

        No orders yet

        </div>

        `;


        return;

    }



    snapshot.forEach((doc)=>{


        const order = doc.data();



        recentOrders.innerHTML += `


        <div class="border rounded-xl p-4 flex justify-between items-center">


            <div>


                <h3 class="font-bold">

                Order #${doc.id}

                </h3>


                <p class="text-sm text-gray-500">

                ${order.status || "Pending"}

                </p>


            </div>



            <div class="text-right">


                <p class="font-bold text-[#009436]">

                ₱${Number(order.total || 0).toLocaleString()}

                </p>



            </div>



        </div>


        `;


    });



});





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