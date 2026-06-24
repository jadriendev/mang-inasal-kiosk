const cartItemsContainer = document.getElementById("cartItems");
const subtotalElement = document.getElementById("subtotal");
const grandTotalElement = document.getElementById("grandTotal");

if (cartItemsContainer) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="border rounded-xl p-10 text-center">
                <i class="fa fa-cart-shopping text-5xl text-gray-300 mb-4"></i>
                <h2 class="text-xl font-semibold">
                    Your cart is empty
                </h2>
            </div>
        `;
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.total || (item.price * item.quantity);

            subtotal += itemTotal;

            cartItemsContainer.innerHTML += `
                <div class="border rounded-xl p-4 flex items-center gap-4">

                    <img
                        src="${item.image}"
                        class="w-24 h-24 object-contain"
                        alt="${item.name}">

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

                    <div class="text-center">
                        <p class="font-bold">
                            x${item.quantity}
                        </p>

                        <p class="mt-2">
                            ₱${itemTotal}
                        </p>

                        <button
                            class="remove-item text-red-500 mt-2"
                            data-index="${index}">
                            Remove
                        </button>
                    </div>

                </div>
            `;
        });
    }

    subtotalElement.textContent = `₱${subtotal}`;
    grandTotalElement.textContent = `₱${subtotal}`;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const index = e.target.dataset.index;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
    }
});

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeMenu = document.getElementById("closeMenu");
const sidebarOverlay = document.getElementById("sidebarOverlay");


if(menuBtn){

    menuBtn.addEventListener("click", () => {

        sidebar.classList.remove("-translate-x-full");
        sidebarOverlay.classList.remove("hidden");

    });

}


if(closeMenu){

    closeMenu.addEventListener("click", () => {

        sidebar.classList.add("-translate-x-full");
        sidebarOverlay.classList.add("hidden");

    });

}


if(sidebarOverlay){

    sidebarOverlay.addEventListener("click", () => {

        sidebar.classList.add("-translate-x-full");
        sidebarOverlay.classList.add("hidden");

    });

}