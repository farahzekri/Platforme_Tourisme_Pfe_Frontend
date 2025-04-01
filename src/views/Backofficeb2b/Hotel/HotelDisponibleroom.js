import Alert from 'components/Alert/Alert';
import React, { useEffect, useState } from 'react';
import { HiCalendarDateRange } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';
import InputWithIcon from 'views/Frontoffice/composant/input';
import { useUpdateHotelRoomAvailability, useGethotelbyidhotel } from 'views/hooks/Hotel';
import Button from "components/Button/button";
import { faLeftLong, faPen } from '@fortawesome/free-solid-svg-icons';



const HotelRoomAvailability = () => {
  const { hotelId } = useParams(); // Récupérer l'ID de l'hôtel depuis les paramètres de l'URL
  const { data: hotel, isLoading, error } = useGethotelbyidhotel(hotelId); // Hook pour récupérer l'hôtel
  const { mutate } = useUpdateHotelRoomAvailability(); // Hook pour mettre à jour la disponibilité des chambres
  const [roomAvailability, setRoomAvailability] = useState({}); // État pour gérer la disponibilité des chambres
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  // Remplit les valeurs de disponibilité depuis l'API au chargement des données
  useEffect(() => {
    if (hotel) {
      setRoomAvailability(hotel.roomAvailability || {});
    }
  }, [hotel]);

  // Fonction pour gérer la mise à jour du nombre de chambres disponibles
  const handleRoomChange = (roomType, value) => {
    setRoomAvailability((prev) => ({
      ...prev,
      [roomType]: value,
    }));
  };

  // Fonction pour envoyer les modifications au backend
  const handleSubmit = async () => {
    if (!hotel) return;

    try {
      Object.keys(roomAvailability).forEach((room) => {
        mutate(
          {
            hotelId: hotelId,
            roomType: room,
            availableRooms: roomAvailability[room] || 0,
          },
          {
            onSuccess: () => {
              setAlert({ message: "Disponiblite des Chambre mise à jour avec succèe !", type: "success" });

              setTimeout(() => {
                setAlert({ message: "", type: "" });
                navigate(`/Daschbordb2b/ListeHotel`);
              }, 3000);
            },
          }
        );
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la disponibilité:", error);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement des données de l'hôtel.</div>;
  return (
    <div className="w-full min-h-screen mt-20 pt-5 bg-gray-100">
      <Alert message={alert.message} type={alert.type} />
      <div className="max-w-8xl mx-auto mt-10 flex flex-col space-y-4">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-start mb-5">
            <Button
              onClick={() => navigate("/Daschbordb2b/ListeHotel")}
              icon={faLeftLong}
              label="Retourn"
              bgColor="bg-palette-orange"
              hoverBgColor="hover:bg-palette-orangefonce"
              textColor="text-white"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Mise à jour de la disponibilité des chambres</h2>

          <form className="space-y-4">
            {hotel.rooms.map((room) => (
              <div key={room} className="flex gap-4 items-center">
                <div className="w-1/4">
                  <InputWithIcon
                    label={`Disponibilité de la chambre ${room}`}
                    type="number"
                    name={`roomAvailability_${room}`}
                    icon={<HiCalendarDateRange />}
                    value={roomAvailability[room] || ""}
                    onChange={(e) => handleRoomChange(room, parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
            ))}

           
            <div className="flex justify-end mt-9">
              <Button
                onClick={handleSubmit}
                icon={ faPen }
                label="Mettre à jour la disponibilité" 
                bgColor="bg-palette-greenajou"
                hoverBgColor="hover:bg-palette-green"
                textColor="text-white"
              />

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelRoomAvailability;
