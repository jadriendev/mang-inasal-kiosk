import { db } from "./script/firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


const response = await fetch("./homepage.html");

const html = await response.text();


const parser = new DOMParser();

const doc = parser.parseFromString(html,"text/html");


const buttons = doc.querySelectorAll("button[data-name]");


console.log("TOTAL FOUND:", buttons.length);



for(const button of buttons){


const section = button.closest("section");


const product = {

name: button.dataset.name,

price:Number(button.dataset.price),

image:button.dataset.image,

category: section?.querySelector("h1")?.textContent || "Other",

available:true

};



await addDoc(
collection(db,"products"),
product
);


console.log("Added:",product.name);


}


console.log("FINISHED");