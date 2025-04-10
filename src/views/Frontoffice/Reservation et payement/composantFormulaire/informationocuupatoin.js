
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { TbGenderAndrogyne } from "react-icons/tb";
import TextInput from "views/Frontoffice/composant/inputRecherche/InputNumber";
import SelectInput from "views/Frontoffice/composant/inputRecherche/selecteur";



const InfotmationOccupation = ({ formData, onChange, adult, enfant, handleChildChange, errors }) => {

    return (
        <>
            <div className="mt-4 pt-14">
                <div className="bg-teal-50 p-4 rounded-xl shadow-sm border-l-4 border-[#0D9488] mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-[#115E59] flex items-center gap-3">
                        <GoPeople className="text-2xl text-[#115E59]" />
                        À propos des personnes logées
                    </h2>

                </div>
                <p className="text-lg text-gray-700 text-center">
                    Assurez-vous d'entrer les informations exactement comme elles apparaissent sur leurs documents officiels.
                </p>
                <div className="space-y-4 mt-2 mb-2">
                    <h3 className="text-xl font-semibold text-teal-600">Adultes</h3>

                </div>
                <div className="space-y-6 border-t-2 border-[#2DD4BF] pt-4">
                    {Array(adult).fill({ civilite: "", firstname: "", lastname: "" }).map((_, i) => (
                        <div key={`adult-${i}`} className="grid grid-cols-3 gap-4 bg-white p-4   ">
                            <div>
                                <SelectInput
                                    label="Civilité"
                                    name="adult.civilite"
                                    value={formData.adults?.[i]?.civilite || ""}
                                    onChange={(val) => onChange(i, "civilite", val)}
                                    options={["Monsieur", "Madame", "Mlle"]}
                                    icon={TbGenderAndrogyne}
                                />
                            </div>
                            <div data-error={!!errors.adults?.[i]?.lastname}>

                                <TextInput
                                    label="Nom*"
                                    name={`adult-${i}-lastname`}
                                    value={formData.adults[i]?.lastname || ""}
                                    onChange={(e) => onChange(i, "lastname", e.target.value)}
                                    placeholder="Entrez Votre Nom"
                                    type="texttarget"

                                />
                                {errors.adults?.[i]?.lastname && (
                                    <p className="text-red-500 text-sm">{errors.adults[i].lastname}</p>
                                )}
                            </div>

                            <div  data-error={!!errors.adults?.[i]?.firstname}>

                                <TextInput
                                    label="Prénom*"
                                    name={`adult-${i}-firstname`}
                                    value={formData.adults?.[i]?.firstname || ""}
                                    onChange={(e) => onChange(i, "firstname", e.target.value)}
                                    placeholder="Entrez Votre Prénom"
                                    type="texttarget"

                                />
                               {errors.adults?.[i]?.firstname && (
                                    <p className="text-red-500 text-sm">{errors.adults[i].firstname}</p>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

                {/* Enfants */}

                <div className="space-y-4 mt-2 mb-2">
                    <h3 className="text-xl font-semibold text-teal-600">Enfants</h3>

                </div>
                <div className="space-y-6 border-t-2 border-[#2DD4BF] pt-4">
                    {Array(enfant).fill({ sexe: "", firstnamech: "", lastname: "" }).map((_, i) => (
                        <div key={`enfant-${i}`} className="grid grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-sm ">

                            <div>
                                <SelectInput
                                    label="Civilité"
                                    name="enfant.sexe"
                                    value={formData.enfant?.[i]?.sexe || ""}
                                    onChange={(val) => handleChildChange(i, "sexe", val)}
                                    options={["garcon", "fille",]}
                                    icon={TbGenderAndrogyne}
                                />
                            </div>

                            <div data-error={!!errors.enfant?.[i]?.lastnamech} >

                                <TextInput
                                    label="Nom de l'enfant*"
                                    name="enfant.lastnamech"
                                    value={formData.enfant?.[i]?.lastnamech || ""}
                                    onChange={(e) => handleChildChange(i, "lastnamech", e.target.value)}
                                    placeholder="Entrez Votre Nom"
                                    type="text"

                                />
                                {errors.enfant?.[i]?.lastnamech && (
                                    <p className="text-red-500 text-sm">{errors.enfants[i].lastnamech}</p>
                                )}
                            </div>

                            <div>

                                <TextInput
                                    label="Prénom de l'enfant*"
                                    name={`enfant-${i}-firstnamech`}
                                    value={formData.enfant?.[i]?.firstnamech || ""}
                                    onChange={(e) => handleChildChange(i, "firstnamech", e.target.value)}
                                    placeholder="Entrez Votre Prénom"
                                    type="text"

                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </>
    )
}
export default InfotmationOccupation;