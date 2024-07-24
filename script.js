const formButton = document.getElementById("form-button");
const form = document.getElementById("form-contact");
const inputName = document.getElementById("name");
const inputPhone = document.getElementById("phone");
const inputEmail = document.getElementById("email");
const inputMessage = document.getElementById("message");
const btnMobile = document.getElementById("btn-mobile");
const menuItem = document.querySelectorAll("#menu .p-2");
const toggleDarkMode = document.getElementById("toggleDarkMode");

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

function handleToggleMenu(event) {
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

function handleLight(modal) {
  toggleDarkMode.textContent = "light_mode";
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("theme");
  modal && handleCloseModal();
}

function handleDark(modal) {
  toggleDarkMode.textContent = "dark_mode";
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  modal && handleCloseModal();
}

function handleSystem(modal) {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  prefersDarkScheme ? handleDark(modal) : handleLight(modal);
  localStorage.setItem("theme", "computer");
  toggleDarkMode.textContent = "computer";
}

function handleOpenModal() {
  modal = document.createElement("ul");
  modal.id = "modeOptions";
  modal.className =
    "grid  fixed bottom-16 right-3 p-2 bg-f1 text-white rounded z-50";
  modal.innerHTML = `<li class="rounded-full hover:bg-e2 p-1 text-c3 material-symbols-outlined">light_mode</li>
    <li class="rounded-full hover:bg-e2 p-1 text-c3 material-symbols-outlined">dark_mode</li>
    <li class="rounded-full hover:bg-e2 p-1 text-c3 material-symbols-outlined">computer</li>`;
  document.body.appendChild(modal);

  const themeItems = document.querySelectorAll("#modeOptions li");

  themeItems[0].addEventListener("click", () => handleLight(modal));
  themeItems[1].addEventListener("click", () => handleDark(modal));
  themeItems[2].addEventListener("click", () => handleSystem(modal));
}

function handleCloseModal() {
  document.body.removeChild(modeOptions);
}

btnMobile.addEventListener("click", (e) => handleToggleMenu(e));

menuItem.forEach((item, i) =>
  menuItem[i].addEventListener("click", (e) => handleToggleMenu(e))
);

const local = localStorage.getItem("theme");

if (local === null) {
  handleLight();
} else if (local === "dark") {
  handleDark();
} else {
  handleSystem();
}

toggleDarkMode.addEventListener("click", () =>
  document.getElementById("modeOptions")
    ? handleCloseModal()
    : handleOpenModal()
);
