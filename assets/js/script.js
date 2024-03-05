// ham menu
const hamMenu = $(".ham-menu");
const offScreenMenu = $(".off-screen-menu");
const overlay = $(".overlay");
// carousel
const carouselBtn = $$("[data-carousel-btn]");
// filter
const filterBtn = $(".filter-container");
const filterOpt = $(".filter-opt");
// cart
const cartBtn = $(".header__cart");
const cartInf = $(".cart-info");
// login
const loginBtn = $$(".lgin-btn");
const LoginForm = $(".login");
const norLogin = $(".login__normal");
const sdtLogin = $(".login__form-sdt");
const emailLogin = $(".login__form-email");
const emailLabel = $(".login__input-label-email");
const sdtLabel = $(".login__input-label-sdt");
const loginBack = $(".login__enb-btn-back");
const loginExit = $(".login__enb-btn-exit");
const loginBtns = $(".login__form-btns");
const loginForgot = $(".login__forgot");
const loginTilte = $(".login__title");
// register
const regisBtn = $(".regis-btn");
const emailLabelRe = $(".register__input-label-email");
const sdtLabelRe = $(".register__input-label-sdt");
const regisBack = $(".register__enb-btn-back");
const regisExit = $(".register__enb-btn-exit");
const regis = $(".donthaveacc");
const lgin = $(".haveacc");
const regisForm = $(".register");
const regisFormEmail = $(".register__form-email");
const regisFormSdt = $(".register__form-sdt");

let isCartInfoVisible = false;

// Bỏ hover trên mobile
const hasTouch = () => {
  return (
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

if (hasTouch()) {
  try {
    for (let si in document.styleSheets) {
      let styleSheet = document.styleSheets[si];
      if (!styleSheet.rules) continue;

      for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(":hover")) {
          styleSheet.deleteRule(ri);
        }
      }
    }
  } catch (ex) {}
}
// Hamburger menu, cart
const toggleMenu = () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  overlay.classList.toggle("active");
};

const closeMenu = () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
  overlay.classList.remove("active");
  LoginForm.classList.add("hidden");
  if (loginBtns.classList.contains("hidden")) {
    loginBtns.classList.remove("hidden");
    sdtLogin.classList.add("hidden");
    emailLogin.classList.add("hidden");
    loginBack.style.visibility = "hidden";
  }
  regisForm.classList.add("hidden");
  if (regisFormSdt.classList.contains("hidden")) {
    regisFormSdt.classList.remove("hidden");
    regisFormEmail.classList.add("hidden");
  }
  cartInf.style = "opacity: 0; visibility: hidden;";
  regisBack.style.visibility = "hidden";
  isCartInfoVisible = false;
};

hamMenu.addEventListener("click", toggleMenu);
overlay.addEventListener("click", closeMenu);

cartBtn.addEventListener("click", () => {
  if (window.innerWidth > 991.98 && !isCartInfoVisible) {
    cartInf.style = "opacity: 1; visibility: visible;";
    isCartInfoVisible = true;
  } else if (window.innerWidth <= 991.98 && !isCartInfoVisible) {
    cartInf.style = "bottom: 0;opacity: 1; visibility: visible;";
    overlay.classList.add("active");
    isCartInfoVisible = true;
  } else {
    cartInf.style = "opacity: 0; visibility: hidden;";
    overlay.classList.remove("active");
    isCartInfoVisible = false;
  }
});

// Gọi hàm closemenu nếu resize
function handleResize() {
  closeMenu();
}
window.addEventListener("resize", handleResize);
handleResize();

// filter btn (Vì hover trên mobile đã disable)
const showFilter = () => {
  filterOpt.style = "opacity: 1; visibility: visible; height: initial";
};
const hideFilter = () => {
  filterOpt.style = "opacity: 0; visibility: hidden; height: 0";
};

filterBtn.addEventListener("mouseleave", () => {
  hideFilter();
});
filterBtn.addEventListener("mouseover", () => {
  showFilter();
});

filterOpt.addEventListener("touchstart", (event) => {
  event.stopPropagation();
});

filterBtn.addEventListener("touchstart", () => {
  const isVisible = filterOpt.style.visibility === "visible";
  if (isVisible) {
    hideFilter();
  } else {
    showFilter();
  }
});

// Xử lí khi click ra ngoài filter và cart(MH cảm ứng lớn)
document.addEventListener("click", (event) => {
  const isClickInsideFilterBtn = filterBtn.contains(event.target);
  const isClickInsideFilterOpt = filterOpt.contains(event.target);

  if (!isClickInsideFilterBtn && !isClickInsideFilterOpt) {
    hideFilter();
  }

  if (!cartInf.contains(event.target) && !cartBtn.contains(event.target)) {
    cartInf.style = "opacity: 0; visibility: hidden;";
    isCartInfoVisible = false;
  }
});

// Carousel
let autoCarousel = setInterval(carouselHandler, 4500);
function carouselHandler() {
  const nextButton = $("[data-carousel-btn='next']");
  const prevButton = $("[data-carousel-btn='prev']");
  const nextClicked = nextButton.dataset.clicked === "true";
  const prevClicked = prevButton.dataset.clicked === "true";

  if (!nextClicked && !prevClicked) {
    nextButton.click();
  } else {
    clearInterval(autoCarousel);
    autoCarousel = setInterval(carouselHandler, 4500);
    nextButton.dataset.clicked = "false";
    prevButton.dataset.clicked = "false";
  }
}

carouselBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    button.dataset.clicked = "true";
    const offset = button.dataset.carouselBtn === "next" ? 1 : -1;
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

// Ẩn/hiện login/register
const hideElement = (element) => {
  element.classList.add("hidden");
};

const showElement = (element) => {
  element.classList.remove("hidden");
};

const toggleVisibility = (element, visibility) => {
  element.style.visibility = visibility;
};

// login
loginBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    showElement(LoginForm);
    overlay.classList.add("active");
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
    toggleVisibility(loginForgot, "hidden");
  });
});

loginExit.addEventListener("click", () => {
  hideElement(LoginForm);
  overlay.classList.remove("active");
  if (loginBtns.classList.contains("hidden")) {
    showElement(loginBtns);
    hideElement(sdtLogin);
    hideElement(emailLogin);
    toggleVisibility(loginBack, "hidden");
  }
});

norLogin.addEventListener("click", () => {
  hideElement(loginBtns);
  showElement(sdtLogin);
  toggleVisibility(loginBack, "visible");
  toggleVisibility(loginForgot, "hidden");
});

emailLabel.addEventListener("click", () => {
  hideElement(sdtLogin);
  showElement(emailLogin);
  toggleVisibility(loginBack, "visible");
  toggleVisibility(loginForgot, "visible");
});

sdtLabel.addEventListener("click", () => {
  showElement(sdtLogin);
  hideElement(emailLogin);
  toggleVisibility(loginBack, "visible");
  toggleVisibility(loginForgot, "hidden");
});

loginBack.addEventListener("click", () => {
  if (!emailLogin.classList.contains("hidden")) {
    sdtLabel.click();
  } else if (!sdtLogin.classList.contains("hidden")) {
    showElement(loginBtns);
    hideElement(sdtLogin);
  }
  if (!loginBtns.classList.contains("hidden")) {
    toggleVisibility(loginBack, "hidden");
  }
});

if (!loginBtns.classList.contains("hidden")) {
  toggleVisibility(loginBack, "hidden");
}

// register
regisBtn.addEventListener("click", () => {
  showElement(regisForm);
  overlay.classList.add("active");
  toggleVisibility(regisBack, "hidden");
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
});

regisExit.addEventListener("click", () => {
  hideElement(regisForm);
  overlay.classList.remove("active");
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
  if (regisFormSdt.classList.contains("hidden")) {
    showElement(regisFormSdt);
    hideElement(regisFormEmail);
  }
  toggleVisibility(regisBack, "hidden");
});

emailLabelRe.addEventListener("click", () => {
  hideElement(regisFormSdt);
  showElement(regisFormEmail);
  toggleVisibility(regisBack, "visible");
});

sdtLabelRe.addEventListener("click", () => {
  showElement(regisFormSdt);
  hideElement(regisFormEmail);
  toggleVisibility(regisBack, "hidden");
});

regisBack.addEventListener("click", () => {
  if (!regisFormEmail.classList.contains("hidden")) {
    sdtLabelRe.click();
  }
});

// Login <> register
regis.addEventListener("click", () => {
  loginExit.click();
  regisBtn.click();
});

lgin.addEventListener("click", () => {
  regisExit.click();
  showElement(LoginForm);
  overlay.classList.add("active");
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
  toggleVisibility(loginForgot, "hidden");
});
