import React from "react";
import { TbJewishStar } from "react-icons/tb";

const wishOptions = [
    { label: "Chambre près de l'ascenseur (si possible)", value: "Chambre près de l'ascenseur" },
    { label: "Chambre non-fumeur", value: "Chambre non-fumeur" },
    { label: "Lit supplémentaire", value: "Lit supplémentaire" },
    { label: "Chambre au calme (si possible)", value: "Chambre au calme" },
    { label: "Chambre au rez-de-chaussée", value: "Chambre au rez-de-chaussée" },
    { label: "Chambre en étage élevé (si possible)", value: "Chambre en étage élevé" },
    { label: "Chambre avec baignoire", value: "Chambre avec baignoire" },
    { label: "Lit bébé (si disponible)", value: "Lit bébé" },
    { label: "Chambre accessible aux personnes à mobilité réduite", value: "Chambre accessible aux personnes à mobilité réduite" },
];

const WishList = ({ wishes, onChange }) => {
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedWishes = [...wishes];

        if (checked) {
            updatedWishes.push(value);
        } else {
            updatedWishes = updatedWishes.filter((wish) => wish !== value);
        }

        onChange(updatedWishes);
    };

    const handleOtherChange = (e) => {
        const { value } = e.target;
        let updatedWishes = wishes.filter((wish) => !wish.startsWith("other:"));
        if (value.trim() !== "") {
            updatedWishes.push(`other:${value}`);
        }
        onChange(updatedWishes);
    };

    const getOtherText = () => {
        const otherWish = wishes.find((w) => w.startsWith("other:"));
        return otherWish ? otherWish.replace("other:", "") : "";
    };

    return (
        <div className="mt-4">
            <div className="bg-teal-50 p-4 rounded-xl shadow-sm border-l-4 border-[#0D9488] mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#115E59] flex items-center gap-3">
                    <TbJewishStar className="text-2xl text-[#115E59]" />
                    Vos souhaits pour votre séjour
                </h2>
            </div>

            <p className="text-lg text-gray-700 text-center mb-10">
                Cochez les souhaits que vous aimeriez que l'hôtel prenne en compte et ajoutez des détails si nécessaire.
            </p>
           
            <div className="grid grid-cols-1 md:grid-cols-2   lg:grid-cols-3 gap-4">
                {wishOptions.map((option) => (
                    <label key={option.value} className="relative flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            value={option.value}
                            checked={wishes.includes(option.value)}
                            onChange={handleCheckboxChange}
                            className="peer sr-only"
                        />
                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-[#4d96a8] transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-br from-[#1f686d] to-[#48ecb5] peer-checked:border-0 peer-checked:rotate-12
                            after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-5 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        ></div>
                        <span className="ml-3 text-base text-gray-800">{option.label}</span>
                    </label>
                ))}
            </div>
          

            <div className="mt-6">
                <label htmlFor="other" className="text-gray-700 block mb-1">
                    Autre(s) souhait(s)
                </label>
                <textarea
                    id="other"
                    rows="4"
                    placeholder="Ex. Chambre au dernier étage, petit déjeuner sans gluten..."
                    value={getOtherText()}
                    onChange={handleOtherChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
            </div>
        </div>
    );
};

export default WishList;
