import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { useGetAdminStats } from "views/hooks/admin";
import { useGetAgencyStats } from "views/hooks/use";

export default function HeaderStats() {
  const { data, isLoading } = useGetAdminStats();

  const totalAdmins = data?.totalAdmins || 0;
  const newAdmins = data?.newAdmins || 0;

  // Calculer le pourcentage de croissance des admins
  const growthPercentage = totalAdmins
    ? ((newAdmins / totalAdmins) * 100).toFixed(2)
    : 0;

    const { data:Agence, isLoadingAgence } = useGetAgencyStats();

    // const totalAgencies = Agence?.totalAgencies || 0;
    const pendingAgencies = Agence?.pendingAgencies || 0;
    const approvedPercentage = Agence?.approvedPercentage || 0;
    const rejectedPercentage = Agence?.rejectedPercentage || 0;
  return (
    <>
      {/* Header */}
      <div className="relative bg-palette-bleuclere md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="ADMINI STRATEURS"
                statTitle={isLoading ? "..." : totalAdmins}
                statArrow={newAdmins > 0 ? "up" : "down"}
                statPercent={isLoading ? "..." : growthPercentage}
                statPercentColor={newAdmins > 0 ? "text-emerald-500" : "text-red-500"}
                statDescripiron="Depuis le mois dernier"
                statIconName="fas fa-users"
                statIconColor="bg-palette-orangefonce"
              />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              {/* <CardStats
                statSubtitle="AGENCES EN ATTENTE"
                statTitle={isLoadingAgence ? "..." : pendingAgencies}
                statArrow="right"
                statPercent="..."
                statPercentColor="text-yellow-500"
                statDescripiron="En attente d'approbation"
                statIconName="fas fa-clock"
                statIconColor="bg-orange-500"
              /> */}
               <CardStats
            statSubtitle="AGENCES EN ATTENTE"
            statTitle={isLoadingAgence ? "..." : pendingAgencies}
            statArrow="up"
            statPercent={isLoadingAgence ? "..." : approvedPercentage}
            statPercentColor="text-green-500"
            statDescripiron={`Agences acceptées: ${isLoadingAgence ? "..." : approvedPercentage}`}
            statIconName="fas fa-clock"
            statIconColor="bg-orange-500"
        />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="AGENCES APPROUVÉES"
                statTitle={isLoadingAgence ? "..." : `${approvedPercentage}%`}
                statArrow="up"
                statPercent="..."
                statPercentColor="text-green-500"
                statDescripiron="Taux d'acceptation"
                statIconName="fas fa-check-circle"
                statIconColor="bg-green-500"
              />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="AGENCES REJETÉES"
                statTitle={isLoadingAgence ? "..." : `${rejectedPercentage}%`}
                statArrow="down"
                statPercent="..."
                statPercentColor="text-red-500"
                statDescripiron="Taux de rejet"
                statIconName="fas fa-times-circle"
                statIconColor="bg-red-500"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
