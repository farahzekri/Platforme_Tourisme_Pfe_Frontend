import { LucideUserCircle } from "lucide-react";
import { useState } from "react";
import { FaRegAddressCard, FaUser, FaUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import TextInput from "views/Frontoffice/composant/inputRecherche/InputNumber";
import PhoneInputField from "views/Frontoffice/composant/inputRecherche/phoneinput";

const ClientInfoSection = ({ formData, onChange, handlePhoneChange, errors }) => {


    const genders = [
        { label: 'M.', value: 'Mr', icon: <TbGenderMale size={24} />, color: 'bg-[#E0F2FE]', borderColor: 'border-[#93C5FD]', iconColor: 'text-[#3B82F6]' },
        { label: 'Mme', value: 'Mme', icon: <TbGenderFemale size={24} />, color: 'bg-[#FCE7F3]', borderColor: 'border-[#F9A8D4]', iconColor: 'text-[#EC4899]' },
        { label: 'Mlle', value: 'Mlle', icon: <TbGenderFemale size={24} />, color: 'bg-[#EDE9FE]', borderColor: 'border-[#C4B5FD]', iconColor: 'text-[#8B5CF6]' },
    ];


    return (
        <div>
            <div className="bg-teal-50 p-4 rounded-xl shadow-sm border-l-4 border-[#0D9488] mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#115E59] flex items-center gap-3">
                    <FaRegAddressCard className="text-2xl text-[#115E59]" />
                    Au nom de qui la réservation ?
                </h2>
            </div>

            <div className="flex gap-6 mb-6 shadow-sm">
                {genders.map((gender) => {
                    const isSelected = formData.reserverCivility === gender.value;

                    return (
                        <label
                            key={gender.value}
                            onClick={() => onChange({ target: { name: 'reserverCivility', value: gender.value } })}
                            className={`flex flex-col items-center cursor-pointer 
                        w-16 h-16 rounded-full 
                        transition-all duration-300 
                        ${isSelected ? `${gender.color} ${gender.borderColor} ${gender.iconColor}` : 'bg-gray-100 border-gray-300 text-gray-500'}
                      `}
                        >
                            <div className="flex items-center justify-center h-full">
                                {gender.icon}
                            </div>
                            {gender.label}
                        </label>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div data-error={!!errors.reserverFirstname}>
                <TextInput
                    label="Prénom*"
                    name="reserverFirstname"
                    value={formData.reserverFirstname}
                    onChange={onChange}
                    placeholder="Entrez Votre Prénom"
                    type="text"

                />
                {errors.reserverFirstname && (
                    <p className="text-red-500 text-sm">{errors.reserverFirstname}</p>
                )}
                </div>
                <div data-error={!!errors.reserverLastname}>
                <TextInput
                    label="Nom*"
                    name="reserverLastname"
                    value={formData.reserverLastname}
                    onChange={onChange}
                    placeholder="Entrez Un Nom"
                    type="text"
                />
                {errors.reserverLastname && (
                    <p className="text-red-500 text-sm">{errors.reserverLastname}</p>
                )}
                </div>
                <div data-error={!!errors.reserverEmail}>
                <TextInput
                    label="Email*"
                    name="reserverEmail"
                    value={formData.reserverEmail}
                    onChange={onChange}
                    placeholder="Entrez Un Email"
                    type="text"
                    icon={MdOutlineEmail}
                />
                 {errors.reserverEmail && (
                    <p className="text-red-500 text-sm">{errors.reserverEmail}</p>
                )}
                </div>
                <div data-error={!!errors.reserverPhone}>
                <PhoneInputField
                    label="Numéro de téléphone*"
                    name="reserverPhone"
                    value={formData.reserverPhone}
                    onChange={(value, country, e, formattedValue) => handlePhoneChange(formattedValue)}
                />
                {errors.reserverPhone && (
                    <p className="text-red-500 text-sm">{errors.reserverPhone}</p>
                )}
                 </div>
            </div>
        </div>
    );
};

export default ClientInfoSection;
