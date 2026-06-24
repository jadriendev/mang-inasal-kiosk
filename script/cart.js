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