const formButton = document.getElementById("form-button");
const form = document.getElementById("form-contact");
const inputName = document.getElementById("name");
const inputPhone = document.getElementById("phone");
const inputEmail = document.getElementById("email");
const inputMessage = document.getElementById("message");

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
