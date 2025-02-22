const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

export const validateFieldRegistre = (name, value) => {
  let errorMessage = "";

  switch (name) {
    case "email":
      if (!emailRegex.test(value)) {
        errorMessage = "L'e-mail doit être valide (par exemple : exemple@domaine.com).";
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
        errorMessage = "Le numéro de téléphone est obligatoire.";
      }
      break;

    case "nameAgence":
      if (value.trim() === "") {
        errorMessage = "Le nom de l'agence est obligatoire.";
      }
      break;
      case "username":
      if (value.trim() === "") {
        errorMessage = "Le nom d'utilisateur est obligatoire.";
      }
      break;

    case "address":
      if (value.trim() === "") {
        errorMessage = "Address est obligatoire.";
      }
      break;

    case "city":
      if (value.trim() === "") {
        errorMessage = "La ville est obligatoire.";
      }
      break;

    case "country":
      if (value.trim() === "") {
        errorMessage = "Le pays est obligatoire.";
      }
      break;
    case "documents":
      if(value.trim()===""){
        errorMessage=" Les documents sont requis"
      }    
     break;
    default:
      break;
  }

  return errorMessage;
};