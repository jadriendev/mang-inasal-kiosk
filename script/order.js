const ordersContainer = document.getElementById("ordersContainer");

const orders = JSON.parse(localStorage.getItem("orders")) || [];

if (ordersContainer) {

    if (orders.length === 0) {

        ordersContainer.innerHTML = `
            <div class="border rounded-xl p-10 text-center">
                <i class="fa-solid fa-receipt text-5xl text-gray-300 mb-4"></i>

                <h2 class="text-xl font-semibold">
                    No Orders Yet
                </h2>
            </div>
        `;

    } else {

        orders.reverse().forEach(order => {

            ordersContainer.innerHTML += `
                <div class="border rounded-xl p-5">

                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                        <div>
                            <h2 class="font-bold text-xl">
                                Queue #${order.queueNumber}
                            </h2>

                            <p class="text-sm text-gray-500">
                                ${order.date}
                            </p>
                        </div>

                        <span class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                            ${order.status}
                        </span>

                    </div>

                    <hr class="my-4">

                    <div class="space-y-2">

                        ${order.items.map(item => `
                            <div class="flex justify-between">
                                <span>
                                    ${item.quantity}x ${item.name}
                                </span>

                                <span>
                                    ₱${item.total}
                                </span>
                            </div>
                        `).join("")}

                    </div>

                    <hr class="my-4">

                    <div class="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₱${order.total}</span>
                    </div>

                </div>
            `;
        });
    }
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