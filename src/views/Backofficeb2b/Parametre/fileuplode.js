import { useState } from "react";
import { Paperclip, Trash2 } from "lucide-react";

const FileUploaderComponent = ({ label, onFilesChange, existingFiles = [] }) => {
  const [files, setFiles] = useState(Array.isArray(existingFiles) ? existingFiles : existingFiles ? [existingFiles] : []);
  const [uploading, setUploading] = useState(false); // État pour afficher le chargement

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset"); // Remplace par ton upload preset
    formData.append("folder", "documents"); // Optionnel : dossier sur Cloudinary

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dltoyzote/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Erreur Cloudinary : ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url; // URL sécurisée du fichier uploadé
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      return null;
    }
  };

  const handleFileChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    setUploading(true);

    const uploadedUrls = await Promise.all(
      newFiles.map(async (file) => {
        const url = await uploadToCloudinary(file);
        return url;
      })
    );

    setUploading(false);

    const validFiles = uploadedUrls.filter((url) => url); // Filtrer les URLs valides
    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 mx-auto">
      {label && <label className="text-gray-700 font-semibold">{label}</label>}

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:bg-gray-100">
        <Paperclip className="w-8 h-8 text-gray-500" />
        <span className="text-sm text-gray-600">{uploading ? "Upload en cours..." : "Cliquez ou glissez-déposez vos fichiers"}</span>
        <input type="file" multiple className="hidden" onChange={handleFileChange} disabled={uploading} />
      </label>

      <div className="mt-4 space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-white shadow-sm rounded-lg">
            <div className="flex items-center space-x-2">
              <Paperclip className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700 truncate max-w-[200px]">{file}</span>
            </div>
            <button onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploaderComponent;
