import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from 'lucide-react';
import { UnityType, type Unity } from '../../../../../../../common/memploi/Unity';
import { useGetHttp, usePostHttp } from '~/services/httpHook/HttpHook';
import { UnityService } from '~/services/Unity';
import { iconNames }  from '~/routes/memploi/jobs/unity/getIcons';
import { IconRenderer }  from '~/utils/IconRenderer';
import { useEffect, useState } from 'react';
import { Log } from '~/utils/auth';
import UnityCard from './UnityCard';
import DismissAlert from '~/components/shared/DismissAlert';
import { useAlert } from '~/providers/AlertProvider';
const objSchema = z.object({
  name: z.string().min(2, 'Le nom de l\'unité doit contenir au moins 2 caractères').max(255, 'Le nom de l\'unité doit contenir au plus 255 caractères').optional(),
  type_unity:   z.enum(Object.values(UnityType) as [string, ...string[]]),
  icon: z.string().min(1).max(255).optional(),
  description: z.string().max(1024).optional(),
  parent: z.string().optional(),
});

type FormData = z.infer<typeof objSchema>;

export default function AddUnity() {

    const [ unity, setUnity ] = useState<any>() ;
    const [ selectedIcon, setSelectedIcon ] = useState<string>() ;
    const [ unities, setUnities ] = useState<Unity[]>();
    const {  showAlert, clearAlert } = useAlert();
    const { run, setAlert, alert }  =   usePostHttp(UnityService.add);

    useGetHttp(UnityService.all, (res)=> {
            // console.log(res);
            setUnities(res.data);
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(objSchema),
  });
  
  const onSubmit = (data: Partial<FormData>) => {
  
    run(data, (r: any) => {
        Log(r);
        setAlert({
            type : "success",
            message : "Unité '"+data.name+"' a été ajoutée avec succès"
        });
        showAlert("Unité '"+data.name+"' a été ajoutée avec succès", "success");
        setSelectedIcon(undefined);
        setUnity(undefined);
        reset();
    });
  };

  return (
    <> 
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl  p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter une Unité</h2>

        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                {...register('type_unity')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                 {  Object.values(UnityType).map((state)=>{
                 return <option value={state} key={state}>{state}</option> 
                })  } 
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4" />
                Nom Unité *
              </label>
              <input
                {...register('name')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter first name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                Sélectionner une Icon :  { selectedIcon &&  <IconRenderer iconName={selectedIcon} /> }
              </label>
              <select
                {...register('icon')}
                onChange={(e) => setSelectedIcon(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                 {  iconNames.map((state)=>{
                 return <option value={state} key={state}>{state}</option> 
                })  } 
              </select>
              {errors.icon && (
                <p className="mt-1 text-sm text-red-600">{errors.icon.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                Parent
              </label>
              <select
                {...register('parent')}
                onChange={(e) => setUnity(unities?.find( u => u.id === Number(e.target.value))) }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Aucun</option>
                { unities && unities.map((state)=>{
                  return <option value={state.id} key={state.id}> { state.type_unity } - {state.name} </option> 
                })  } 

              </select>
            </div>
          </div>
        </div>

         {/* Employment Details Section */}
        { unity && 
         <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Parent selectioné</h3>
          <div className="grid  gap-6">
          

            <div>

               {  <UnityCard unity={unity} /> }
               
            </div>

          </div>
        </div> }

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Description</h3>
          <div className="grid  gap-6">
            <div>
             
              <textarea
                {...register('description') }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
              </textarea>
            </div>

          </div>
        </div>


       

        <div className="flex justify-end pt-6">
          <button
            type="submit"

            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg
                     hover:bg-blue-700 active:bg-blue-800 transition-colors
                     shadow-md hover:shadow-lg"
          >
            Ajouter
          </button>
        </div>
      </div>
    </form>
    </>
   
  );
}