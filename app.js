const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");

if (burger && nav) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-open");

    const expanded = burger.classList.contains("is-active");
    burger.setAttribute("aria-expanded", expanded);
    document.body.classList.toggle("menu-open", expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("is-active");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  document.addEventListener("click", (event) => {
    const isClickInsideNav = nav.contains(event.target);
    const isClickBurger = burger.contains(event.target);

    if (
      !isClickInsideNav &&
      !isClickBurger &&
      nav.classList.contains("is-open")
    ) {
      burger.classList.remove("is-active");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });
}

const animatedElements = document.querySelectorAll(".fade-up, .fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  },
);

animatedElements.forEach((el) => observer.observe(el));

const servicesSlider = document.querySelector(".services-slider");
const prevService = document.querySelector(".services-prev");
const nextService = document.querySelector(".services-next");

if (servicesSlider && prevService && nextService) {
  const scrollAmount = () =>
    servicesSlider.querySelector(".service-card").offsetWidth + 20;

  nextService.addEventListener("click", () => {
    servicesSlider.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });

  prevService.addEventListener("click", () => {
    servicesSlider.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });
}

const serviceModal = document.querySelector("#serviceModal");
const serviceModalBody = document.querySelector("#serviceModalBody");
const serviceModalClose = document.querySelector(".service-modal__close");
const serviceModalOverlay = document.querySelector(".service-modal__overlay");

document.querySelectorAll(".service-more").forEach((button) => {
  button.addEventListener("click", () => {
    const template = document.querySelector(`#${button.dataset.modal}`);

    if (!template || !serviceModal || !serviceModalBody) return;

    serviceModalBody.innerHTML = template.innerHTML;
    serviceModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
});

function closeServiceModal() {
  serviceModal.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href="#photo-guide"]');

  if (!link) return;

  closeServiceModal();

  setTimeout(() => {
    document
      .querySelector("#photo-guide")
      ?.scrollIntoView({ behavior: "smooth" });
  }, 100);
});
if (serviceModalClose)
  serviceModalClose.addEventListener("click", closeServiceModal);
if (serviceModalOverlay)
  serviceModalOverlay.addEventListener("click", closeServiceModal);

const businessSlider = document.querySelector(".business-slider");
const businessPrev = document.querySelector(".business-prev");
const businessNext = document.querySelector(".business-next");

if (businessSlider && businessPrev && businessNext) {
  const businessScrollAmount = () =>
    businessSlider.querySelector(".business-card").offsetWidth + 20;

  businessNext.addEventListener("click", () => {
    businessSlider.scrollBy({
      left: businessScrollAmount(),
      behavior: "smooth",
    });
  });

  businessPrev.addEventListener("click", () => {
    businessSlider.scrollBy({
      left: -businessScrollAmount(),
      behavior: "smooth",
    });
  });
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((el) => {
      el.classList.remove("is-open");
      el.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("is-open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

const reviewsSlider = document.querySelector(".reviews-slider");
const reviewsPrev = document.querySelector(".reviews-prev");
const reviewsNext = document.querySelector(".reviews-next");

if (reviewsSlider && reviewsPrev && reviewsNext) {
  const reviewScrollAmount = () =>
    reviewsSlider.querySelector(".review-phone").offsetWidth + 28;

  reviewsNext.addEventListener("click", () => {
    reviewsSlider.scrollBy({
      left: reviewScrollAmount(),
      behavior: "smooth",
    });
  });

  reviewsPrev.addEventListener("click", () => {
    reviewsSlider.scrollBy({
      left: -reviewScrollAmount(),
      behavior: "smooth",
    });
  });
}

document.addEventListener("click", (event) => {
  const aboutModal = document.querySelector("#aboutModal");

  if (!aboutModal) return;

  if (event.target.closest(".story-more")) {
    aboutModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  if (
    event.target.closest(".about-modal__close") ||
    event.target.classList.contains("about-modal__overlay")
  ) {
    aboutModal.classList.remove("is-open");
    document.body.style.overflow = "";
  }
});

const faqToggle = document.querySelector(".faq-toggle");
const faqHidden = document.querySelector(".faq-hidden");

if (faqToggle && faqHidden) {
  faqToggle.addEventListener("click", () => {
    faqHidden.classList.toggle("is-open");

    faqToggle.textContent = faqHidden.classList.contains("is-open")
      ? "Сховати питання"
      : "Показати всі питання";
  });
}

const aboutBtn = document.querySelector(".story-more");
const unofficialBtn = document.querySelector(".story-unofficial");

const aboutModal = document.getElementById("aboutModal");
const unofficialModal = document.getElementById("unofficialModal");

function openModal(modal) {
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

aboutBtn?.addEventListener("click", () => {
  openModal(aboutModal);
});

unofficialBtn?.addEventListener("click", () => {
  openModal(unofficialModal);
});

document.querySelectorAll(".service-modal").forEach((modal) => {
  modal
    .querySelector(".service-modal__close")
    ?.addEventListener("click", () => closeModal(modal));

  modal
    .querySelector(".service-modal__overlay")
    ?.addEventListener("click", () => closeModal(modal));
});

document.querySelectorAll(".review-short").forEach((item) => {
  const maxLength = 450;

  const fullText = item.textContent.trim();

  if (fullText.length > maxLength) {
    item.textContent = fullText.slice(0, maxLength) + "...";
  }
});

// ======== Налаштування ========
const BOT_TOKEN = "8947716853:AAHdoCoGOe4IVz4PlaEsIzjSLCoZDc77KRI";
const CHAT_ID = "325988031";

// ==============================

const form = document.getElementById("priceForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  const text = `
📩 <b>Нова заявка на прайс</b>

👤 <b>Ім'я:</b> ${name}
📞 <b>Телефон:</b> ${phone}
📧 <b>Email:</b> ${email}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      },
    );

    if (!response.ok) throw new Error("Помилка відправки");

    message.textContent = "✅ Заявку успішно відправлено!";
    message.style.color = "green";

    form.reset();
  } catch (error) {
    console.error(error);

    message.textContent = "❌ Помилка відправки. Спробуйте ще раз.";
    message.style.color = "red";
  }
});
