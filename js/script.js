document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelectorAll(".nav-toggle");
  const navMenus = document.querySelectorAll(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  navToggle.forEach((toggle, index) => {
    const menu = navMenus[index];
    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const menu = document.querySelector(".nav-menu.open");
      if (menu) {
        menu.classList.remove("open");
        const toggleButton = document.querySelector(".nav-toggle");
        if (toggleButton) {
          toggleButton.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  const form = document.querySelector("#contactForm");
  if (form) {
    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const phoneInput = form.querySelector("#phone");
    const subjectInput = form.querySelector("#subject");
    const messageInput = form.querySelector("#message");
    const successMessage = form.querySelector("#formSuccess");

    function setError(input, message) {
      const error = form.querySelector(`#${input.id}Error`);
      error.textContent = message;
      input.setAttribute("aria-invalid", "true");
    }

    function clearError(input) {
      const error = form.querySelector(`#${input.id}Error`);
      error.textContent = "";
      input.removeAttribute("aria-invalid");
    }

    function validateEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validatePhone(value) {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 9 && digits.length <= 15;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim()) {
        setError(nameInput, "Please enter your full name.");
        isValid = false;
      } else {
        clearError(nameInput);
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        setError(emailInput, "Please enter a valid email address.");
        isValid = false;
      } else {
        clearError(emailInput);
      }

      if (!phoneInput.value.trim() || !validatePhone(phoneInput.value.trim())) {
        setError(phoneInput, "Please enter a valid phone number.");
        isValid = false;
      } else {
        clearError(phoneInput);
      }

      if (!subjectInput.value.trim()) {
        setError(subjectInput, "Please enter a subject.");
        isValid = false;
      } else {
        clearError(subjectInput);
      }

      if (!messageInput.value.trim()) {
        setError(messageInput, "Please enter a message.");
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        successMessage.textContent = "Thank you! Your message has been received.";
        form.reset();
      } else {
        successMessage.textContent = "";
      }
    });
  }
});
