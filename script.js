const formButton = document.getElementById("form-button");
const form = document.getElementById("form-contact");
const inputName = document.getElementById("name");
const inputPhone = document.getElementById("phone");
const inputEmail = document.getElementById("email");
const inputMessage = document.getElementById("message");
const btnMobile = document.getElementById("btn-mobile");
const menuItem = document.querySelectorAll("#menu .p-2");

function checkRequiredInputs() {
  const nameFilled = inputName.value.trim() !== "";
  const emailFilled = inputEmail.value.trim() !== "";
  const messageFilled = inputMessage.value.trim() !== "";

  formButton.disabled = !(nameFilled && emailFilled && messageFilled);
}

inputName.addEventListener("input", checkRequiredInputs);
inputEmail.addEventListener("input", checkRequiredInputs);
inputMessage.addEventListener("input", checkRequiredInputs);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let modal = document.querySelector(".modal");

  modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<p>Mensagem enviada!</p>`;
  document.body.appendChild(modal);
  formButton.disabled = true;

  inputName.value = "";
  inputPhone.value = "";
  inputEmail.value = "";
  inputMessage.value = "";

  setTimeout(() => {
    document.body.removeChild(modal);
  }, 2000);
});

function toggleMenu(event) {
  const menu = document.getElementById("menu");

  if (btnMobile.textContent === "menu") {
    btnMobile.textContent = "close";
    menu.classList.replace("hidden", "block");
    event.currentTarget.setAttribute("aria-expanded", "true");
    event.currentTarget.setAttribute("aria-label", "abrir menu");
  } else {
    btnMobile.textContent = "menu";
    menu.classList.replace("block", "hidden");
    event.currentTarget.setAttribute("aria-expanded", "false");
    event.currentTarget.setAttribute("aria-label", "fechar menu");
  }
}

btnMobile.addEventListener("click", (e) => toggleMenu(e));

menuItem.forEach((item, i) =>
  menuItem[i].addEventListener("click", (e) => toggleMenu(e))
);
