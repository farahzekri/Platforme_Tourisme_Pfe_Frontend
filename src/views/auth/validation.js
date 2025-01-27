const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

export const validateFieldRegistre = (name, value) => {
  let errorMessage = "";

  switch (name) {
    case "email":
      if (!emailRegex.test(value)) {
        errorMessage = "Email must be valid (eg: example@domain.com).";
      }
      break;

    case "password":
      if (!passwordRegex.test(value)) {
        errorMessage =
          "Password must contain at least 8 characters, one capital letter and one number.";
      }
      break;

    case "phoneNumber":
      if (isNaN(value) ) {
        errorMessage = "The phone number must contain only numbers.";
      }
      if(value.trim()===""){
        errorMessage = "Phone number is required.";
      }
      break;

    case "nameAgence":
      if (value.trim() === "") {
        errorMessage = "Agency name is required.";
      }
      break;
      case "username":
      if (value.trim() === "") {
        errorMessage = "Username is required.";
      }
      break;

    case "address":
      if (value.trim() === "") {
        errorMessage = "Address is required.";
      }
      break;

    case "city":
      if (value.trim() === "") {
        errorMessage = "The city is required.";
      }
      break;

    case "country":
      if (value.trim() === "") {
        errorMessage = "Country is required.";
      }
      break;
    case "documents":
      if(value.trim()===""){
        errorMessage="documents are required"
      }    
     break;
    default:
      break;
  }

  return errorMessage;
};