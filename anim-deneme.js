import { CollapseHandler } from "./scripts/Utility/CollapseHandler.js";

const anim = document.querySelector("#animasyon-deneme");
const toggleBtn = document.querySelector("#toggleBtn");

var myDiv = document.getElementById("myDiv");
let collapsed = true;
// toggleBtn.addEventListener("click", () => {
//   if (collapsed) {
//     anim.style.maxHeight = 0;
//     anim.classList.remove("b-collapse");
//     anim.classList.add("b-collapsing");
//     anim.style.maxHeight = anim.scrollHeight + "px";
//     setTimeout(() => {
//       console.log("Entered show timeout...");
//       anim.style.maxHeight = null;
//       anim.classList.add("b-collapse");
//       anim.classList.remove("b-collapsing");
//       anim.classList.add("b-show");
//     }, 350);
//   } else {
//     anim.style.maxHeight = anim.scrollHeight + "px";
//     anim.offsetHeight;
//     console.log("Max height: " + anim.style.maxHeight);
//     console.log("Class list: " + anim.classList);
//     anim.classList.remove("b-collapse");
//     anim.classList.remove("b-show");
//     anim.classList.add("b-collapsing");
//     console.log("Class list: " + anim.classList);
//     anim.style.maxHeight = 0;
//     console.log("Max height: " + anim.style.maxHeight);
//     setTimeout(() => {
//       console.log("Entered collapse timeout...");
//       anim.style.maxHeight = null;
//       anim.classList.remove("b-collapsing");
//       anim.classList.add("b-collapse");
//     }, 350);
//   }
//   collapsed = !collapsed;
// });

// toggleBtn.addEventListener("click", () => {
//   if (collapsed) {
//     anim.style.height = 0;
//     anim.classList.remove("b-collapse");
//     anim.classList.add("b-collapsing");
//     anim.style.height = anim.scrollHeight + "px";
//     setTimeout(() => {
//       console.log("Entered show timeout...");
//       anim.style.height = null;
//       anim.classList.add("b-collapse");
//       anim.classList.remove("b-collapsing");
//       anim.classList.add("b-show");
//     }, 350);
//   } else {
//     anim.style.height = anim.scrollHeight + "px";
//     anim.offsetHeight;
//     anim.classList.remove("b-collapse");
//     anim.classList.remove("b-show");
//     anim.classList.add("b-collapsing");
//     anim.style.height = 0;
//     setTimeout(() => {
//       console.log("Entered collapse timeout...");
//       anim.style.height = null;
//       anim.classList.remove("b-collapsing");
//       anim.classList.add("b-collapse");
//     }, 350);
//   }
//   collapsed = !collapsed;
// });

const collapseHandler = new CollapseHandler("b-collapse", "b-collapsing", "b-show", "height");
collapseHandler.arrangeElements();
