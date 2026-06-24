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

function updatePrice() {
    let price = basePrice;

    if (side.selectedIndex === 1) {
        price += 10;
    }

    if (unliRice.checked) {
        price += 20;
    }

    totalPrice.textContent = `₱${price * qty}`;
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        currentProduct = {
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image
        };

        basePrice = currentProduct.price;
        qty = 1;

        quantity.textContent = qty;

        modalImage.src = currentProduct.image;
        modalName.textContent = currentProduct.name;
        modalPrice.textContent = `Base Price: ₱${basePrice}`;

        drink.selectedIndex = 0;
        side.selectedIndex = 0;
        unliRice.checked = false;

        updatePrice();

        modal.classList.remove("hidden");
    });
});

plusQty.addEventListener("click", () => {
    qty++;
    quantity.textContent = qty;
    updatePrice();
});

minusQty.addEventListener("click", () => {
    if (qty > 1) {
        qty--;
        quantity.textContent = qty;
        updatePrice();
    }
});

side.addEventListener("change", updatePrice);
unliRice.addEventListener("change", updatePrice);

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

confirmAdd.addEventListener("click", () => {
    let finalPrice = basePrice;

    if (side.selectedIndex === 1) {
        finalPrice += 10;
    }

    if (unliRice.checked) {
        finalPrice += 20;
    }

    const item = {
        name: currentProduct.name,
        image: currentProduct.image,
        drink: drink.value,
        side: side.value,
        unliRice: unliRice.checked,
        quantity: qty,
        price: finalPrice,
        total: finalPrice * qty
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(cartItem =>
        cartItem.name === item.name &&
        cartItem.drink === item.drink &&
        cartItem.side === item.side &&
        cartItem.unliRice === item.unliRice
    );

    if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.total += item.total;
    } else {
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    modal.classList.add("hidden");

    showCartPopup(item.name);
});

document.querySelectorAll(".add-drink").forEach(button => {
    button.addEventListener("click", () => {
        const item = {
            name: button.dataset.name,
            image: button.dataset.image,
            price: Number(button.dataset.price),
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(cartItem =>
            cartItem.name === item.name
        );

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.total = existingItem.price * existingItem.quantity;
        } else {
            item.total = item.price;
            cart.push(item);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        showCartPopup(item.name);
    });
});

const cartPopup = document.getElementById("cartPopup");
const popupItemName = document.getElementById("popupItemName");
const closePopup = document.getElementById("closePopup");


function showCartPopup(name) {
    if (cartPopup) {
        popupItemName.textContent = `${name} has been added to your cart`;
        cartPopup.classList.remove("hidden");

        setTimeout(() => {
            cartPopup.classList.add("hidden");
        }, 2000);
    }
}


if (closePopup) {
    closePopup.addEventListener("click", () => {
        cartPopup.classList.add("hidden");
    });
}

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