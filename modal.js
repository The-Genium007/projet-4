function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal
function closeModal() {
  modalbg.style.display = "none";
  form.reset();
}

// Reusable error function
function showError(input, message) {
  let errorTarget;
  if (input.id === "checkbox1") {
    errorTarget = document.querySelector('label[for="checkbox1"]');
  } else {
    errorTarget = input;
  }

  // Create a error message
  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = message;

  // Insert the error message in the correct place
  if (input.id === "checkbox1") {
    errorTarget.insertAdjacentElement('afterend', error);
    error.classList.add("error-correction"); // Correction space bottom checkbox
  } else {
    errorTarget.parentNode.appendChild(error);
  }

  input.classList.add("error-input");
}

// Clear errors inputs
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  document.querySelectorAll(".error-input").forEach((el) => el.classList.remove("error-input"));
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field validation
function validateFormFields(formData, form) {
  let isValid = true;
  if (formData.firstName.length < 2) {
    showError(document.getElementById("first"), "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    isValid = false;
  }
  if (formData.lastName.length < 2) {
    showError(document.getElementById("last"), "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    isValid = false;
  }
  if (!formData.birthdate) {
    showError(document.getElementById("birthdate"), "Vous devez entrer votre date de naissance.");
    isValid = false;
  }
  if (!formData.quantity) {
    showError(document.getElementById("quantity"), "Veuillez entrer une quantité.");
    isValid = false;
  }
  if (!formData.location) {
    showError(form.querySelector('input[name="location"]'), "Vous devez choisir une option.");
    isValid = false;
  }
  if (!formData.termsAccepted) {
    showError(document.getElementById("checkbox1"), "Vous devez vérifier que vous acceptez les termes et conditions.");
    isValid = false;
  }
  if (!emailRegex.test(formData.email)) {
    showError(document.getElementById("email"), "Veuillez entrer une adresse email valide.");
    isValid = false;
  }
  return isValid;
}

// Display success message 
function showSuccessMessage(form) {
  form.style.display = "none";
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.textContent = "Merci pour votre inscription";
  form.parentNode.appendChild(successMessage);

  const closeButton = document.createElement("button");
  closeButton.className = "button";
  closeButton.textContent = "Fermer";

  closeButton.addEventListener("click", function () {
    closeModal();

    form.style.display = "block";
    closeButton.style.display = "none";
    successMessage.style.display = "none";
  });

  successMessage.appendChild(closeButton);
}

// Form management
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const formData = {
      firstName: document.getElementById("first").value.trim(),
      lastName: document.getElementById("last").value.trim(),
      email: document.getElementById("email").value.trim(),
      birthdate: document.getElementById("birthdate").value,
      quantity: document.getElementById("quantity").value,
      location: form.querySelector('input[name="location"]:checked')?.value,
      termsAccepted: document.getElementById("checkbox1").checked,
      wantsNewsletter: document.getElementById("checkbox2").checked,
    };

    if (validateFormFields(formData, form)) {
      showSuccessMessage(form);
    }
  });
});

