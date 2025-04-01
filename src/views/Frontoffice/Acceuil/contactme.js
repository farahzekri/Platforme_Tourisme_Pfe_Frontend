import { useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import TypingEffect from "react-typing-effect";
import bg_5 from "../../../assets/img/bg_5.jpg"
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    userType: "visitor",
    email: "",
    subject: "",
    message: "",
  });
 const [offsetY, setOffsetY] = useState(0);
 const handleScroll = () => {
    setOffsetY(window.scrollY * 0.5);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);
    alert("Votre message a été envoyé !");
  };

  return (
    <>
    <IndexNavbar fixed />
   
    <div className="flex h-screen">
      {/* Formulaire à gauche */}
      <div className="w-1/2 p-10 flex flex-col justify-center bg-[#f9fafb]">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Contactez-nous</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Votre Nom"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="visitor">Visiteur</option>
            <option value="agency">Agence</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Votre Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="subject"
            placeholder="Sujet"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <textarea
            name="message"
            placeholder="Votre message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md h-32"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </form>
      </div>

      {/* Image + Navbar à droite */}
      <div
        className="w-1/2 h-full bg-cover bg-center flex items-center justify-center"
        style={{
            backgroundImage: `url(${bg_5})`,
            backgroundSize: "cover",
            backgroundPosition: `center ${offsetY}px`,
            transition: "background-position 0.1s ease-out",
          }}
      >
        <div className="text-white text-3xl font-bold bg-black bg-opacity-50 p-5 rounded-lg">
          Contactez-nous aujourd'hui !
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
