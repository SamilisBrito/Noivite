async function main() {
  function checkRequiredInputs() {
    const nameFilled = inputName.value.trim() !== "";
    const emailFilled = inputEmail.value.trim() !== "";
    const messageFilled = inputMessage.value.trim() !== "";

    formButton.disabled = !(nameFilled && emailFilled && messageFilled);
  }

  function handleToggleMenu(event) {
    const menu = document.getElementById("menu");
    const isOpen = btnMobile.textContent === "menu";

    btnMobile.textContent = isOpen ? "close" : "menu";
    menu.classList.replace(
      isOpen ? "hidden" : "block",
      isOpen ? "block" : "hidden"
    );
    event.currentTarget.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
    event.currentTarget.setAttribute(
      "aria-label",
      isOpen ? "abrir menu" : "fechar menu"
    );
  }

  function applyTheme(theme, modal) {
    toggleDarkMode.textContent = theme === "light" ? "light_mode" : "dark_mode";
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (theme === "light") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", "dark");
    }
    if (modal) handleCloseModal();
  }

  function handleSystem(modal) {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    prefersDarkScheme ? handleDark(modal) : handleLight(modal);
    localStorage.setItem("theme", "computer");
    toggleDarkMode.textContent = "computer";
  }
  function handleLight(modal) {
    applyTheme("light", modal);
  }

  function handleDark(modal) {
    applyTheme("dark", modal);
  }

  function handleCloseModal() {
    document.body.removeChild(modeOptions);
  }

  function handleOpenModal() {
    modal = document.createElement("ul");
    modal.id = "modeOptions";
    modal.className =
      "grid fixed bottom-[4.375rem] sm:bottom-[5.5625rem] right-4 sm:right-6 p-2 bg-f1 text-white rounded z-50 dark:bg-c3";
    modal.innerHTML = `<li class="text-3xl rounded-full hover:bg-e2 sm:py-1 sm:px-2 text-c3 material-symbols-outlined dark:text-f1">light_mode</li>
      <li class="text-3xl rounded-full hover:bg-e2 sm:py-1 sm:px-2 text-c3 material-symbols-outlined dark:text-f1">dark_mode</li>
      <li class="text-3xl rounded-full hover:bg-e2 sm:py-1 sm:px-2 text-c3 material-symbols-outlined dark:text-f1">computer</li>`;
    document.body.appendChild(modal);

    const themeItems = document.querySelectorAll("#modeOptions li");

    themeItems[0].addEventListener("click", () => handleLight(modal));
    themeItems[1].addEventListener("click", () => handleDark(modal));
    themeItems[2].addEventListener("click", () => handleSystem(modal));
  }

  async function searchFetch(element, url) {
    const searchElement = document.getElementById(element);
    try {
      const response = await fetch(url);
      const text = await response.text();
      searchElement.innerHTML = text;
    } catch (error) {
      console.error(error);
      searchElement.innerHTML = "Página não encontrada";
    }
  }

  function searchAjax(element, url) {
    const searchElement = document.getElementById(element);

    let ajax = new XMLHttpRequest();

    ajax.open("GET", url);

    ajax.onreadystatechange = () => {
      if (ajax.readyState == 4 && ajax.status == 200) {
        searchElement.innerHTML = ajax.responseText;
      }

      if (ajax.readyState == 4 && ajax.status == 404) {
        searchElement.innerHTML = "Página não encontrada";
      }
    };

    ajax.send();
  }

  searchAjax("hero", "./components/hero.html");
  searchAjax("services", "./components/services.html");
  await searchFetch("about", "./components/about.html");
  await searchFetch("contact", "./components/contact.html");

  const formButton = document.getElementById("form-button");
  const form = document.getElementById("form-contact");
  const inputName = document.getElementById("name");
  const inputPhone = document.getElementById("phone");
  const inputEmail = document.getElementById("email");
  const inputMessage = document.getElementById("message");
  const btnMobile = document.getElementById("btn-mobile");
  const menuItem = document.querySelectorAll("#menu .p-2");
  const toggleDarkMode = document.getElementById("toggleDarkMode");
  const local = localStorage.getItem("theme");

  inputName.addEventListener("input", checkRequiredInputs);
  inputEmail.addEventListener("input", checkRequiredInputs);
  inputMessage.addEventListener("input", checkRequiredInputs);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let modal = document.querySelector(".modal");

    modal = document.createElement("div");
    modal.className =
      "modal fixed top-0 right-0 z-20 mt-[4.375rem] p-5 text-f1 text-lg font-medium bg-v2 dark:bg-c1 dark:text-c3 rounded-l-full";
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

  btnMobile.addEventListener("click", (e) => handleToggleMenu(e));

  menuItem.forEach((item, i) =>
    menuItem[i].addEventListener("click", (e) => handleToggleMenu(e))
  );

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
}

main();