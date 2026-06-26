import { db } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


window.addEventListener("load", async () => {


const buttons = document.querySelectorAll("button[data-name]");


console.log("Found:", buttons.length);


for(const button of buttons){


const section = button.closest("section");


const product = {

name: button.dataset.name,

price: Number(button.dataset.price),

image: button.dataset.image || "",

category: section.querySelector("h1").textContent,

available:true

};



await addDoc(
collection(db,"products"),
product
);


console.log("Uploaded:", product.name);


}


console.log("DONE ALL");


});