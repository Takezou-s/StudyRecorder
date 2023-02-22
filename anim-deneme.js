const anim = document.querySelector("#animasyon-deneme");
const toggleBtn = document.querySelector("#toggleBtn");
let bool = false;
toggleBtn.addEventListener("click", () => {
  bool = !bool;
  //   anim.classList.toggle("d-none");
  anim.classList.toggle("animasyon-acilis");
  anim.classList.toggle("animasyon-kapanis");
});
