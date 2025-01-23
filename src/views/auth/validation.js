const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

export const validateFieldRegistre = (name, value) => {
  let errorMessage = "";

  switch (name) {
    case "email":
      if (!emailRegex.test(value)) {
        errorMessage = "L'email doit être valide (ex: exemple@domaine.com).";
      }
      break;

    case "password":
      if (!passwordRegex.test(value)) {
        errorMessage =
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.";
      }
      break;

    case "phoneNumber":
      if (isNaN(value) ) {
        errorMessage = "Le numéro de téléphone doit contenir uniquement des chiffres.";
      }
      if(value.trim()===""){
        errorMessage = "Le numéro de téléphone est requis.";
      }
      break;

    case "nameAgence":
      if (value.trim() === "") {
        errorMessage = "Le nom de l'agence est requis.";
      }
      break;

    case "address":
      if (value.trim() === "") {
        errorMessage = "L'adresse est requise.";
      }
      break;

    case "city":
      if (value.trim() === "") {
        errorMessage = "La ville est requise.";
      }
      break;

    case "country":
      if (value.trim() === "") {
        errorMessage = "Le pays est requis.";
      }
      break;

    default:
      break;
  }

  return errorMessage;
};