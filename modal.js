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
}

// Reusable error function
function showError(input, message) {
  // Remove existing error messages
  const existingError = input.parentNode.querySelector(".error-message");
  if (existingError) existingError.remove();

  // Create error message
  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = message;

  // Insert message after the input
  input.parentNode.appendChild(error);

  // Add error class to the input
  input.classList.add("error-input");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission/reload

    // Remove old error messages
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document.querySelectorAll(".error-input").forEach((el) => el.classList.remove("error-input"));
    let isValid = true;

    // Regroupement des valeur du formulaire
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

    // Verification input
    if (formData.firstName.length < 2) {
      const last = document.getElementById("first");
      showError(last, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
      isValid = false;
    }
    if (formData.lastName.length < 2) {
      const last = document.getElementById("last");
      showError(last, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
      isValid = false;
    }
    if (!formData.birthdate) {
      const birth = document.getElementById("birthdate");
      showError(birth, "Vous devez entrer votre date de naissance.");
      isValid = false;
    }
    if (!formData.quantity) {
      const last = document.getElementById("quantity");
      showError(last, "Veuillez entrer une quantité.");
      isValid = false;
    }
    if (!formData.location) {
      const location = form.querySelector('input[name="location"]');
      showError(location, "Vous devez choisir une option.");
      isValid = false;
    }
    if (!formData.termsAccepted) {
      const terms = document.getElementById("checkbox1");
      showError(terms, "Vous devez vérifier que vous acceptez les termes et conditions.");
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      const email = document.getElementById("email");
      showError(email, "Veuillez entrer une adresse email valide.");
      isValid = false;
    }

    if (isValid) {
      // Rendre le formulaire invisible
      form.style.display = "none";

      // Créer un message de validation
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "Merci pour votre inscription";

      // Ajouter le message de validation au conteneur du formulaire
      form.parentNode.appendChild(successMessage);

      // Ajouter un bouton pour fermer la modal
      const closeButton = document.createElement("button");
      closeButton.className = "button";
      closeButton.textContent = "Fermer";
      closeButton.addEventListener("click", closeModal);

      // Ajouter le bouton au message de validation
      successMessage.appendChild(closeButton);
    }
  });
});

