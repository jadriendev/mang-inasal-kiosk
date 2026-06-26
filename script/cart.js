import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const cartItemsContainer = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const grandTotalElement = document.getElementById("grandTotal");


function renderCart(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    cartItemsContainer.innerHTML = "";


    if(cart.length === 0){

        cartItemsContainer.innerHTML = `
            <div class="border rounded-xl p-10 text-center">
                <i class="fa fa-cart-shopping text-5xl text-gray-300 mb-4"></i>
                <h2 class="text-xl font-semibold">
                    Your cart is empty
                </h2>
            </div>
        `;

    }else{

        cart.forEach((item,index)=>{

            const itemTotal = item.price * item.quantity;

            subtotal += itemTotal;


            cartItemsContainer.innerHTML += `

            <div class="border rounded-xl p-4 flex items-center gap-4">


                <img 
                src="${item.image}"
                class="w-24 h-24 object-contain">


                <div class="flex-1">

                    <h3 class="font-bold text-lg">
                        ${item.name}
                    </h3>


                    ${item.drink ? `<p class="text-sm">Drink: ${item.drink}</p>` : ""}

                    ${item.side ? `<p class="text-sm">Side: ${item.side}</p>` : ""}

                    ${item.unliRice ? `<p class="text-sm">Unli Rice</p>` : ""}


                    <p class="font-semibold text-[#009436] mt-2">
                        ₱${item.price}
                    </p>

                </div>



                <div class="flex flex-col items-center gap-2">


                    <div class="flex items-center gap-3">

                        <button
                        class="minusQty bg-gray-200 w-8 h-8 rounded-full"
                        data-index="${index}">
                            -
                        </button>


                        <span class="font-bold">
                            ${item.quantity}
                        </span>


                        <button
                        class="plusQty bg-[#009436] text-white w-8 h-8 rounded-full"
                        data-index="${index}">
                            +
                        </button>

                    </div>


                    <p class="font-bold">
                        ₱${itemTotal}
                    </p>


                </div>


            </div>

            `;

        });

    }


    subtotalElement.textContent = `₱${subtotal}`;
    grandTotalElement.textContent = `₱${subtotal}`;


    localStorage.setItem("cart",JSON.stringify(cart));

}



document.addEventListener("click",(e)=>{


    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    if(e.target.classList.contains("plusQty")){

        const index = e.target.dataset.index;


        cart[index].quantity++;


        localStorage.setItem("cart",JSON.stringify(cart));


        renderCart();

    }



    if(e.target.classList.contains("minusQty")){


        const index = e.target.dataset.index;


        cart[index].quantity--;



        if(cart[index].quantity <= 0){

            cart.splice(index,1);

        }



        localStorage.setItem("cart",JSON.stringify(cart));


        renderCart();

    }


});



renderCart();





const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeMenu = document.getElementById("closeMenu");
const sidebarOverlay = document.getElementById("sidebarOverlay");


menuBtn?.addEventListener("click",()=>{

    sidebar.classList.remove("-translate-x-full");
    sidebarOverlay.classList.remove("hidden");

});


closeMenu?.addEventListener("click",()=>{

    sidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.add("hidden");

});


sidebarOverlay?.addEventListener("click",()=>{

    sidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.add("hidden");

});

const checkoutBtn = document.getElementById("checkoutBtn");
const paymentModal = document.getElementById("paymentModal");
const closePaymentModal = document.getElementById("closePaymentModal");

const cashPayment = document.getElementById("cashPayment");
const gcashPayment = document.getElementById("gcashPayment");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        paymentModal.classList.remove("hidden");
    });
}

if (closePaymentModal) {
    closePaymentModal.addEventListener("click", () => {
        paymentModal.classList.add("hidden");
    });
}

if (paymentModal) {
    paymentModal.addEventListener("click", (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.add("hidden");
        }
    });
}

if (cashPayment) {

cashPayment.addEventListener("click", async () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Your cart is empty.");
        return;
    }


    const total = cart.reduce((sum,item)=>{
        return sum + (item.price * item.quantity);
    },0);



    const orderId = "ORD" + Date.now();



    await setDoc(
        doc(db,"orders",orderId),
        {

            customer:"Guest",

            queueNumber:
            Math.floor(1000 + Math.random() * 9000),

            date:
            new Date().toLocaleString(),

            status:"Pending",

            items:[...cart],

            total:total

        }
    );



    localStorage.removeItem("cart");


    window.location.href="order.html";


});


}

const gcashModal = document.getElementById("gcashModal");
const closeGcashModal = document.getElementById("closeGcashModal");

if (gcashPayment) {

    gcashPayment.addEventListener("click", async () => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const total = cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const transactionId = "TXN" + Date.now();

        await setDoc(
            doc(db, "payments", transactionId),
            {
                transactionId,
                amount: total,
                status: "pending",
                createdAt: Date.now()
            }
        );

        paymentModal.classList.add("hidden");
        gcashModal.classList.remove("hidden");

        document.getElementById("qrcode").innerHTML = "";

        new QRCode(document.getElementById("qrcode"), {
            text: transactionId,
            width: 220,
            height: 220
        });

        onSnapshot(
            doc(db, "payments", transactionId),
            (snapshot) => {

                const paymentData = snapshot.data();

                if (!paymentData) return;

                if (paymentData.status === "paid") {

                    const orders = JSON.parse(
                        localStorage.getItem("orders")
                    ) || [];

                    const newOrder = {
                        queueNumber: Math.floor(
                            1000 + Math.random() * 9000
                        ),
                        date: new Date().toLocaleString(),
                        status: "Preparing",
                        items: [...cart],
                        total
                    };

                    orders.push(newOrder);

                    localStorage.setItem(
                        "orders",
                        JSON.stringify(orders)
                    );

                    localStorage.removeItem("cart");

                    alert("Payment Successful!");

                    window.location.href = "order.html";
                }

            }
        );

    });

}

closeGcashModal?.addEventListener("click", () => {
    gcashModal.classList.add("hidden");
});