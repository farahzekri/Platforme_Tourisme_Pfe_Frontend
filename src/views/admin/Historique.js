import CardTable from "components/Cards/CardTable";
import { useEffect, useState } from "react";
import { useGetHistory } from "views/hooks/historique";



export default function Historique(){
    const {data:history=[],isLoading, isError}= useGetHistory()
    const [tableData, setTableData] = useState([]);
    const columns = ["Non_Utlisateur","Les_Action" ,"Details", "Date"];
    useEffect(() => {
        if (history.length > 0) {
            const formattedHistory = history.map((user) => {
                const date = new Date(user.date);
                const formattedDate = date instanceof Date && !isNaN(date) ? date.toLocaleDateString() : 'Date invalide';
   
                return {
                    id: user._id,
                    Non_Utlisateur: user.admin.username,
                    Les_Action: user.action,
                    Details: user.details,
                    Date: formattedDate,
                };
            });
   
            setTableData(formattedHistory);
            console.log('Table data:', formattedHistory); // Vérifiez ce qui est dans `tableData`
        }
    }, [history]);
   
    if (isLoading) return <p>Chargement des admin...</p>;
    if (isError) return <p>Erreur lors du chargement des admin.</p>;
    return (
        <>
        <div className="w-full mb-13 px-4 pt-8 mt-20">
        <CardTable
                    color="dark"
                    title="Admin"
                    columns={columns}
                    data={tableData}
                    

                />
        </div>
        </>
    )
    
}