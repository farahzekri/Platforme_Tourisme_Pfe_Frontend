export const ValidationHotel = (name, value) => {
    let errorMessage = "";

    switch (name) {
        case "name":
            if (value.trim() === "") {
                errorMessage = "Le nom de l'hôtel est obligatoire";
            }
            break;

        case "country":
            if (value.trim() === "") {
                errorMessage = "Le pays est obligatoire";
            }
            break;

        case "city":
            if (value.trim() === "") {
                errorMessage = "La ville est obligatoire";
            }
            break;

        case "stars":
            if (!["3", "4", "5", "charme"].includes(value)) {
                errorMessage = "Le nombre d'étoiles doit être 3, 4, 5 ou charme";
            }
            break;

        case "Typecontract":
            if (value.trim() === "") {
                errorMessage = "Le type de contrat est obligatoire";
            }
            break;

        case "minChildAge":
            if (value === "" || isNaN(value)) {
                errorMessage = "L'âge minimum des enfants est obligatoire";
            } else if (Number(value) < 2) {
                errorMessage = "L'âge minimum ne peut pas être inférieur à 2 ans";
            }
            break;

        case "maxChildAge":
            if (value === "" || isNaN(value)) {
                errorMessage = "L'âge maximum des enfants est obligatoire";
            } else if (Number(value) > 12) {
                errorMessage = "L'âge maximum ne peut pas dépasser 12 ans";
            }
            break;

        case "address":
            if (value.trim() === "") {
                errorMessage = "L'adresse est obligatoire";
            }
            break;

        case "tripAdvisorLink":
            if (value.trim() !== "" && !/^https?:\/\/.+\..+/.test(value)) {
                errorMessage = "Veuillez entrer un lien TripAdvisor valide";
            }
            break;

        default:
            errorMessage = "";
    }

    return errorMessage;
};
