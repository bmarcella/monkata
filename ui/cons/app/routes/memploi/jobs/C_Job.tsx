
import { PopupWithButton } from "~/components/shared/PopupWithButton";
import FormJob from "./FormJob";
import { useGetAllJobs } from "~/services/httpHook/JobsHooks";
import { useEffect, useState } from "react";
import JobTable from "./JobTable";

function  C_Job () {
 const [page, setPage] = useState(1);
const [data , fetchData ] =  useGetAllJobs([]) as any;
    useEffect(() => {
        fetchData(1, 10);
    }, [page]);

    return (
      
      <div>
        <main className="flex-1 p-6 block">
           <div className="flex justify-end">
            <PopupWithButton name="Ajouter un poste">
                  <FormJob/>
            </PopupWithButton>
           </div>
           {
            data &&
            <JobTable objs={data.jobs} pg={data.pagination} title={""} />
           }
       </main>
     
      </div>
    )
};

export default C_Job;