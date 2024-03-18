// header
const header = $("header");
const sidebarWrapper = $(".sidebar__wrapper");
// ham menu
const hamMenu = $(".ham-menu");
const offScreenMenu = $(".off-screen-menu");
const overlay = $(".overlay");
// carousel
const carouselBtn = $$("[data-carousel-btn]");
const dotContainer = $(".dots");
const carouselSlide = $$(".carousel-slide");
// filter
const filterBtn = $(".filter-container");
const filterOpt = $(".filter-opt");
// cart
const cartBtn = $(".header__cart");
const cartInf = $(".cart-info");
const cartSum = $(".cart-sum");
const cartItems = $$(".cart-item");
// searchbar
const searchBar = $(".header__search-bar");
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
// product
const productCard = $$(".product__card");

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

// Xử lí ẩn hiện header khi scroll
let lastScrollTop = 0;
const headerHeight = header.offsetHeight;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const isScrollingDown = currentScroll > lastScrollTop && currentScroll > headerHeight;

  header.classList.toggle("header-hidden", isScrollingDown);
  sidebarWrapper.style.top = isScrollingDown
    ? "25px"
    : "calc(var(--header-height) + 25px)";

  if (window.innerWidth > 991.98)
    cartInf.style.top = isScrollingDown ? "70px" : "calc(100% + 15px)";

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// hamMenu
hamMenu.addEventListener("click", openMenu);
overlay.addEventListener("click", closeMenu);

// cart
let isCartInfoVisible = false;
cartBtn.addEventListener("click", () => {
  if (window.innerWidth > 991.98 && !isCartInfoVisible) {
    cartInf.style = "opacity: 1; visibility: visible;";
    isCartInfoVisible = true;
  } else if (window.innerWidth <= 991.98 && !isCartInfoVisible) {
    cartInf.style = "bottom: 0; opacity: 1; visibility: visible;";
    active(overlay);
    isCartInfoVisible = true;
    disableScrollOnMobile();
  } else {
    cartInf.style = "opacity: 0; visibility: hidden;";
    deActive(overlay);
    isCartInfoVisible = false;
    enableScroll();
  }
});

cartItems.forEach(function (cartItem) {
  const incr = cartItem.querySelector(".incr-quantity");
  const decr = cartItem.querySelector(".decr-quantity");
  const cartItemQty = cartItem.querySelector(".card-item__quantity-input");
  const deleteItem = cartItem.querySelector(".cart-item__delete");

  incr.addEventListener("click", () => {
    cartItemQty.value = parseInt(cartItemQty.value) + 1;
  });
  decr.addEventListener("click", () => {
    if (parseInt(cartItemQty.value) > 1)
      cartItemQty.value = parseInt(cartItemQty.value) - 1;
  });
  document.addEventListener("click", () => {
    if (cartItemQty.value === "" || cartItemQty.value == "0") cartItemQty.value = 1;
  });
});

document.addEventListener("click", (e) => {
  if (!cartInf.contains(e.target) && !cartBtn.contains(e.target)) {
    cartInf.style = "opacity: 0; visibility: hidden;";
    isCartInfoVisible = false;
  }
});

// Carousel
createDots();
const dots = $$(".dots__dot");

updateDots();
let autoCarousel = setInterval(carouselHandler, 4000);
function carouselHandler() {
  const nextButton = $("[data-carousel-btn='next']");
  const prevButton = $("[data-carousel-btn='prev']");
  const nextClicked = nextButton.dataset.clicked === "true";
  const prevClicked = prevButton.dataset.clicked === "true";

  if (!nextClicked && !prevClicked) {
    nextButton.click();
  } else {
    clearInterval(autoCarousel);
    autoCarousel = setInterval(carouselHandler, 4000);
    nextButton.dataset.clicked = "false";
    prevButton.dataset.clicked = "false";
  }
}

carouselBtn.forEach(function (button) {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    button.dataset.clicked = "true";
    const offset = button.dataset.carouselBtn === "next" ? 1 : -1;
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
    updateDots();
  });
});

dots.forEach((dot) => {
  const slideIndex = dot.dataset.slide;
  dot.addEventListener("click", () => {
    const slidesContainer = dot
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const slides = slidesContainer.children;
    const activeSlide = slidesContainer.querySelector("[data-active]");

    delete activeSlide.dataset.active;
    slides[slideIndex].dataset.active = true;

    clearInterval(autoCarousel);
    autoCarousel = setInterval(carouselHandler, 4000);
    updateDots();
  });
});

// filter
if (!hasTouch()) {
  filterBtn.addEventListener("mouseleave", hideFilter);
  filterBtn.addEventListener("mouseenter", showFilter);
} else {
  filterBtn.addEventListener("click", () => {
    const isVisible = filterOpt.style.visibility === "visible";
    if (isVisible) {
      hideFilter();
    } else {
      showFilter();
    }
  });

  filterOpt.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    const isClickInsideFilterBtn = filterBtn.contains(e.target);
    const isClickInsideFilterOpt = filterOpt.contains(e.target);
    if (!isClickInsideFilterBtn && !isClickInsideFilterOpt) hideFilter();
  });
}

// Xử lí chuyển hướng khi click vào product card
if (productCard && productCard.length > 0) {
  productCard.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".product__btn")) {
        window.location.href = "./product.html";
      }
    });
  });
}

// Ẩn/hiện login - register
// login
loginBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    show(LoginForm);
    active(overlay);
    deActive(offScreenMenu);
    disableScrollOnMobile();
  });
});

loginExit.addEventListener("click", () => {
  hide(LoginForm);
  deActive(overlay);
  if (loginBtns.classList.contains("hidden")) {
    show(loginBtns);
    hide(emailLogin, sdtLogin);
    visibility("hidden", loginBack, loginForgot);
  }
  enableScroll();
});

norLogin.addEventListener("click", () => {
  show(sdtLogin);
  hide(loginBtns);
  visibility("visible", loginBack);
  visibility("hidden", loginForgot);
});

emailLabel.addEventListener("click", () => {
  show(emailLogin);
  hide(sdtLogin);
  visibility("visible", loginBack, loginForgot);
});

sdtLabel.addEventListener("click", () => {
  show(sdtLogin);
  hide(emailLogin);
  visibility("visible", loginBack);
  visibility("hidden", loginForgot);
});

loginBack.addEventListener("click", () => {
  if (!emailLogin.classList.contains("hidden")) {
    sdtLabel.click();
  } else if (!sdtLogin.classList.contains("hidden")) {
    show(loginBtns);
    hide(sdtLogin);
  }
  if (!loginBtns.classList.contains("hidden")) {
    visibility("hidden", loginBack);
  }
});

if (!loginBtns.classList.contains("hidden")) {
  visibility("hidden", loginBack);
}

// register
regisBtn.addEventListener("click", () => {
  show(regisForm);
  active(overlay);
  deActive(offScreenMenu);
  visibility("hidden", regisBack);
  disableScrollOnMobile();
});

regisExit.addEventListener("click", () => {
  hide(regisForm);
  deActive(overlay, offScreenMenu);
  if (regisFormSdt.classList.contains("hidden")) {
    show(regisFormSdt);
    hide(regisFormEmail);
  }
  visibility("hidden", regisBack);
  enableScroll();
});

emailLabelRe.addEventListener("click", () => {
  hide(regisFormSdt);
  show(regisFormEmail);
  visibility("visible", regisBack);
});

sdtLabelRe.addEventListener("click", () => {
  show(regisFormSdt);
  hide(regisFormEmail);
  visibility("hidden", regisBack);
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
  show(LoginForm);
  active(overlay);
  deActive(offScreenMenu);
  visibility("hidden", loginForgot);
});

window.addEventListener("resize", handleResize);
handleResize();

// Xử lí resize(tránh lỗi khi người dùng thay đổi kích cỡ cửa sổ)
function handleResize() {
  enableScroll();
  if (window.innerWidth > 991.98 && offScreenMenu.classList.contains("active")) {
    deActive(overlay, offScreenMenu);
  }
  if (window.innerWidth > 991.98 && isCartInfoVisible) {
    deActive(overlay);
    cartInf.style =
      "height: initial; bottom: initial; opacity: 1; visibility: visible;";
  } else if (window.innerWidth <= 991.98 && isCartInfoVisible) {
    cartInf.style = "bottom: 0; opacity: 1; visibility: visible;";
    active(overlay);
  }
  if (overlay.classList.contains("active") && LoginForm.classList.contains("active")) {
    active(overlay);
  }
}

// Ham menu
function openMenu() {
  active(offScreenMenu, overlay);
  disableScrollOnMobile();
}

// Hàm xử lí khi nhấn vào overlay
function closeMenu() {
  enableScroll();
  hide(regisForm, LoginForm);
  deActive(offScreenMenu, overlay);
  visibility("hidden", regisBack, loginForgot);
  isCartInfoVisible = false;
  cartInf.style = "opacity: 0; visibility: hidden;";

  if (regisFormSdt.classList.contains("hidden")) {
    show(regisFormSdt);
    hide(regisFormEmail);
  }
  if (loginBtns.classList.contains("hidden")) {
    show(loginBtns);
    hide(emailLogin, sdtLogin);
    visibility("hidden", loginBack);
  }
}

// Carousel dots
function createDots() {
  carouselSlide.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

function updateDots() {
  carouselSlide.forEach((slide, i) => {
    if (slide.hasAttribute("data-active")) {
      dots[i].classList.add("dots__dot--active");
    } else {
      dots[i].classList.remove("dots__dot--active");
    }
  });
}

// filter btn
function showFilter() {
  filterOpt.style = "opacity: 1; visibility: visible; height: initial";
}
function hideFilter() {
  filterOpt.style = "opacity: 0; visibility: hidden; height: 0";
}

// Tắt scroll trên mobile(khi hiển thị modal)
function disableScrollOnMobile() {
  if (hasTouch()) document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "auto";
}

// show/hide - active/deActive
function hide(...elements) {
  elements.forEach((e) => {
    e.classList.add("hidden");
  });
}

function show(...elements) {
  elements.forEach((e) => {
    e.classList.remove("hidden");
  });
}

function visibility(visibility, ...elements) {
  elements.forEach((e) => {
    e.style.visibility = visibility;
  });
}

function active(...elements) {
  elements.forEach((e) => {
    e.classList.add("active");
  });
}

function deActive(...elements) {
  elements.forEach((e) => {
    e.classList.remove("active");
  });
}
