import React, { useState } from "react";
import Pagination from "./Pagination";

interface Job {
  id: number;
  titre_job: string;
  type_contrat: string;
  salaire: number;
  periode_salaire: string;
  env_de_travail: string;
  etat: string;
  country: string;
  created_at: string;
  currency: string;
}



interface Props {
   objs: Job [] , 
   title?: string,
   pg : {
      currentPage: number,
      totalPages: number
   },
 }

const JobTable: React.FC<Props> = ( { objs = [], pg,  title = "Liste de tout les Postes disponible" } : Props) => {

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{ title }</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Titre</th>
              <th className="py-3 px-6 text-left">Type de Contrat</th>
              <th className="py-3 px-6 text-center">Salaire</th>
              <th className="py-3 px-6 text-left">Lieu</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
          {objs.length > 0 ? (
              objs.map((job) => (
                <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                  <td className="py-3 px-6">{job.titre_job}</td>
                  <td className="py-3 px-6">{job.type_contrat}</td>
                  <td className="py-3 px-6 text-center">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                      {job.salaire}  {job.currency } {job.periode_salaire}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    {job.env_de_travail} - {job.etat}, {job.country}
                  </td>
                  <td className="py-3 px-6">{new Date(job.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-6">

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Aucune offre disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination pg={pg} />
    </div>
  );
};

export default JobTable;
