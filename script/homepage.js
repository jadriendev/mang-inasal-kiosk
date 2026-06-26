import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



const productsRef = collection(db,"products");
const sections = document.querySelectorAll("section[data-category]");


onSnapshot(productsRef, (snapshot) => {

    sections.forEach(section => {
        section.querySelector(".product-container").innerHTML = "";
    });

    snapshot.forEach((doc) => {

        const product = doc.data();

        if (product.available === false) return;

        const section = [...sections].find(
            s => s.dataset.category === product.category
        );

        if (!section) return;

        const container = section.querySelector(".product-container");

        container.innerHTML += `
            <div class="border flex items-center p-5 rounded-xl">

                <div class="w-28 h-28 flex items-center justify-center rounded-lg">
                    <img
                        class="w-full h-full object-contain"
                        src="${product.image}"
                        alt="${product.name}">
                </div>

                <div class="p-4">
                    <h1 class="font-bold text-lg">
                        ${product.name}
                    </h1>

                    <span class="font-semibold text-md">
                        ₱${product.price}
                    </span>
                </div>

                <button
                    class="add-to-cart ml-auto flex items-center justify-center w-10 h-10 bg-[#009436] text-white rounded-full hover:scale-110 transition-transform duration-300"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-image="${product.image}"
                    data-category="${product.category}">
                    <i class="fa fa-plus"></i>
                </button>

            </div>
        `;
    });

    loadCartButtons();
});





const modal = document.getElementById("productModal");

const modalImage = document.getElementById("modalImage");

const modalName = document.getElementById("modalName");

const modalPrice = document.getElementById("modalPrice");



const drink = document.getElementById("drink");

const side = document.getElementById("side");

const unliRice = document.getElementById("unliRice");



const totalPrice = document.getElementById("totalPrice");



const quantity = document.getElementById("quantity");

const plusQty = document.getElementById("plusQty");

const minusQty = document.getElementById("minusQty");



const confirmAdd = document.getElementById("confirmAdd");

const closeModal = document.getElementById("closeModal");



let currentProduct = null;

let basePrice = 0;

let qty = 1;





function updatePrice(){


    let price = basePrice;



    if(side.selectedIndex === 1){

        price += 10;

    }



    if(unliRice.checked){

        price += 20;

    }



    totalPrice.textContent = `₱${price * qty}`;


}







function loadCartButtons(){


    document.querySelectorAll(".add-to-cart")
    .forEach(button=>{


        button.addEventListener("click",()=>{


            const category = button.dataset.category;


            if(category === "Chicken Inasal"){


                currentProduct = {

                    name:button.dataset.name,

                    price:Number(button.dataset.price),

                    image:button.dataset.image

                };


                basePrice = currentProduct.price;


                qty = 1;


                quantity.textContent = qty;


                modalImage.src = currentProduct.image;


                modalName.textContent = currentProduct.name;


                modalPrice.textContent =
                `Base Price: ₱${basePrice}`;



                drink.selectedIndex = 0;

                side.selectedIndex = 0;

                unliRice.checked = false;


                updatePrice();


                modal.classList.remove("hidden");


            }


            else{


                const item = {


                    name:button.dataset.name,

                    image:button.dataset.image,

                    drink:"",

                    side:"",

                    unliRice:false,

                    quantity:1,

                    price:Number(button.dataset.price),

                    total:Number(button.dataset.price)


                };



                let cart =
                JSON.parse(localStorage.getItem("cart")) || [];



                cart.push(item);



                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );



                showCartPopup(item.name);


            }



        });



    });


}






plusQty.addEventListener("click",()=>{


    qty++;


    quantity.textContent = qty;


    updatePrice();


});





minusQty.addEventListener("click",()=>{


    if(qty > 1){


        qty--;


        quantity.textContent = qty;


        updatePrice();


    }


});





side.addEventListener("change",updatePrice);


unliRice.addEventListener("change",updatePrice);





closeModal.addEventListener("click",()=>{


    modal.classList.add("hidden");


});





modal.addEventListener("click",(e)=>{


    if(e.target === modal){


        modal.classList.add("hidden");


    }


});









confirmAdd.addEventListener("click",()=>{



    let finalPrice = basePrice;



    if(side.selectedIndex === 1){

        finalPrice += 10;

    }



    if(unliRice.checked){

        finalPrice += 20;

    }





    const item = {


        name:currentProduct.name,


        image:currentProduct.image,


        drink:drink.value,


        side:side.value,


        unliRice:unliRice.checked,


        quantity:qty,


        price:finalPrice,


        total:finalPrice * qty


    };





    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];





    const existing =
    cart.find(cartItem =>

        cartItem.name === item.name &&

        cartItem.drink === item.drink &&

        cartItem.side === item.side &&

        cartItem.unliRice === item.unliRice

    );





    if(existing){


        existing.quantity += item.quantity;


        existing.total += item.total;


    }

    else{


        cart.push(item);


    }





    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );




    modal.classList.add("hidden");



    showCartPopup(item.name);



});








const cartPopup = document.getElementById("cartPopup");

const popupItemName = document.getElementById("popupItemName");

const closePopup = document.getElementById("closePopup");





function showCartPopup(name){


    if(cartPopup){


        popupItemName.textContent =
        `${name} has been added to your cart`;



        cartPopup.classList.remove("hidden");



        setTimeout(()=>{


            cartPopup.classList.add("hidden");


        },2000);



    }


}






if(closePopup){


    closePopup.addEventListener("click",()=>{


        cartPopup.classList.add("hidden");


    });


}









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