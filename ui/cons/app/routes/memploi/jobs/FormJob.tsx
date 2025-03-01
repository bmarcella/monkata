import { useForm } from "react-hook-form";
import {  useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Currency } from "./Currency";
import  { Type_contrat, Env_Work, Horaire_de_travail, Periode_salaire, App_Reception } from "./Jobs";
import {  Calendar } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import { useGetEntAdress } from "~/services/httpHook/EntrepriseHook";
import { useGetAllCatForJob } from "~/services/httpHook/CatHook";
import { usePostHttp } from "~/services/httpHook/HttpHook";
import { JobsService } from "~/services/Jobs";
import { Log } from "~/utils/auth";
import { useAlert } from "~/providers/AlertProvider";
export const Type_Categorie = ['Poste', 'Entreprise']
const formSchema = z.object({
  titre_job: z.string().min(1, "Le titre du poste est requis"),
  categorie: z.number().min(0, "La catégorie est requise"),
  date_echeance: z.date().min(new Date(), "La date doit etre superieure a aujourd'hui" ).optional(),
  type_contrat: z.nativeEnum(Type_contrat, { errorMap: () => ({ message: "Type de contrat invalide" }) }),
  env_de_travail: z.nativeEnum(Env_Work).optional(),
  horaire_de_travail: z.nativeEnum(Horaire_de_travail).optional(),
  periode_salaire: z.nativeEnum(Periode_salaire).optional(),
  currency: z.nativeEnum(Currency).optional(),
  salaire: z.number().optional(),
  ad: z.number().min(0, "L'adresse est requise"),
  description: z.string().min(1, "La description est requise"),
  app_reception: z.nativeEnum(App_Reception).optional(),
  lien_to_apply: z.string().optional(),
  email_to_apply: z.string().optional(),
  phone_to_apply: z.string().optional(),
  is_cv_require: z.boolean(),
  is_lm_require: z.boolean(),
  is_certificat_require: z.boolean(),
  is_diplome_require: z.boolean()
});
type FormData = z.infer<typeof formSchema>;
export default function FormJob () {
  const { register, handleSubmit, control, watch, reset, setValue, getValues , formState: { errors, isValid } } = useForm<FormData>({
      resolver: zodResolver(formSchema),
        defaultValues: {
          type_contrat: Type_contrat.contrat,
          env_de_travail: Env_Work.Teletravail,
          horaire_de_travail: Horaire_de_travail.temps_partiel,
          periode_salaire: Periode_salaire.mensuel,
          currency: Currency.USD,
          app_reception: App_Reception.memploi,
          is_cv_require: false,
          is_lm_require: false,
          is_certificat_require: false,
          is_diplome_require: false
        }
  });
 const { run, setAlert, alert }  =   usePostHttp(JobsService.add);
 const {  showAlert } = useAlert();
const [ addresses ] = useGetEntAdress([]);
const [ categories ] = useGetAllCatForJob([]);

const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      Link,
      CodeBlock,
      Placeholder.configure({
        placeholder: "Écrivez la description du poste ici...",
      }),
    ],
    content: getValues("description"), // Load initial form value
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML(), { shouldValidate: true }); // Sync editor content with form
    },

  });
  const contratOptions = Object.values(Type_contrat);
  const envOptions = Object.values(Env_Work);
  const horaireOptions = Object.values(Horaire_de_travail);
  const salaireOptions = Object.values(Periode_salaire);
  const currencyOptions = Object.values(Currency);
  const type_salaire = watch('periode_salaire');

  const onSubmit = (data) => { 
    console.log(data);
     run(data, (r: any) => {
            Log(r);
           if(editor) editor.commands.clearContent();
            setAlert({
                type : "success",
                message : "Emploi '"+data.name+"' a été ajoutée avec succès"
            });
            showAlert("Emploi '"+data.name+"' a été ajoutée avec succès", "success");
            reset();
        });
  }
  const app_rec = watch('app_reception');

  return (
    <div className="container mx-auto mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="bg-white rounded-xl  p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Job informations</h2>

        {/* Personal Information Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Jobs Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                Job Title  *
              </label>
              <input
                {...register('titre_job')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter first name"
              />
              {errors.titre_job && (
                <p className="mt-1 text-sm text-red-600">{errors.titre_job.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              Categorie Poste  *
              </label>
              <select
                {...register('categorie',{ valueAsNumber: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               >
               <option value="">Selectionner une categorie de poste</option>
               {  categories.map((state: any)=>{
                 return <option value={state.id} key={state.id}> {state.name} </option> 
                })  } 
   
              </select>
                {errors.categorie && (
                    <p className="mt-1 text-sm text-red-600">{errors.categorie.message}</p>
                )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4" />
                Date echéance
              </label>
              <input
                type="date"
                {...register('date_echeance', { valueAsDate: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter start year"
              />
                {errors.date_echeance && (
                    <p className="mt-1 text-sm text-red-600">{errors.date_echeance.message}
                    </p>)}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                Burreau 
              </label>
              <select
                {...register('ad', { valueAsNumber: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              > 
               <option value="">Selectionner une addresse</option>
               {  addresses.map((state: any)=>{
                 return <option value={state.id} key={state.id}> {state.name} </option> 
                })  } 
              </select>
              {errors.ad && (
                <p className="mt-1 text-sm text-red-600">{errors.ad.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="text-lg font-bold mb-4">Type d'emploi</h4>
                        {contratOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                            <input type="radio" {...register("type_contrat")} value={option} />
                            <span>{option}</span>
                            </label>
                        ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="text-lg font-bold mb-4">Environnement de travail</h4>
                        {envOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                            <input type="radio" {...register("env_de_travail")} value={option} />
                            <span>{option}</span>
                            </label>
                        ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="text-lg font-bold mb-4">Horaire de travail</h4>
                        {horaireOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                            <input type="radio" {...register("horaire_de_travail")} value={option} />
                            <span>{option}</span>
                            </label>
                        ))}

                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="text-lg font-bold mb-4">Type de Salaire</h4>
                        {salaireOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                            <input type="radio" {...register("periode_salaire")} value={option} />
                            <span>{option}</span>
                            </label>
                        ))}


         {  type_salaire &&
            (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                            Devise
                        </label>
                        <select
                            {...register('currency')}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="USD">USD</option>
                            {  currencyOptions.map((state)=>{
                                            return <option value={state} key={state}>{state}</option> 
                                            })  } 
                        </select>
                        </div>
                        <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                            Salaire
                        </label>
                        <input
                            type="number"
                            {...register('salaire', { valueAsNumber: true })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter start year"
                        />
                        </div>
            </div>)
           }


                </div>
          </div>
        
        </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-white rounded-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Description du Poste</h2>
        
        {/* Auto-Generated Toolbar (Dynamically) */}
        {editor && (
          <div className="flex gap-2 mb-2 border-b pb-2">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-lg ${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-gray-200"}`}>B</button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg ${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-gray-200"}`}>I</button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded-lg ${editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-gray-200"}`}>U</button>
            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded-lg ${editor.isActive("strike") ? "bg-blue-500 text-white" : "bg-gray-200"}`}>S</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded-lg ${editor.isActive("heading", { level: 1 }) ? "bg-blue-500 text-white" : "bg-gray-200"}`}>H1</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded-lg ${editor.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : "bg-gray-200"}`}>H2</button>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-gray-200"}`}>• List</button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-lg ${editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-gray-200"}`}>1. List</button>
            <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-lg ${editor.isActive("blockquote") ? "bg-blue-500 text-white" : "bg-gray-200"}`}>❝</button>
            <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded-lg ${editor.isActive("codeBlock") ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Code</button>
          </div>
        )}
        {/* Text Editor */}
          <div className=" p-2  rounded-lg">
            <EditorContent editor={editor} />
          </div>
          {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
        </div>
          </div>
        
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
            <h4 className="text-lg font-bold mb-4">Methode d'application</h4>
            <label  className="flex items-center space-x-2">
                            <input type="radio" {...register("app_reception")}   value={App_Reception.memploi} />
                            <span>Memploi</span>
           </label>
           <label  className="flex items-center space-x-2">
                            <input type="radio" {...register("app_reception")} value={App_Reception.email} />
                            <span>Email</span>
           </label>
           <label  className="flex items-center space-x-2">
                            <input type="radio" {...register("app_reception")}   value={App_Reception.whatsapp} />
                            <span>Whatsapp</span>
           </label>
           <label  className="flex items-center space-x-2">
                            <input type="radio" {...register("app_reception")}  value={App_Reception.lien} />
                            <span>Website</span>
           </label>
            </div>
          { app_rec!=App_Reception.memploi && <div>
               <h4 className="text-lg font-bold mb-4">Methode d'application</h4>
               <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                            { app_rec }
                        </label>
                        { app_rec == App_Reception.email &&  (<input
                            type="text"
                            {...register("email_to_apply") }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder=""
                        />) }

                         { app_rec == App_Reception.lien &&  (<input
                            type="text"
                            {...register('lien_to_apply') }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder=""
                        />) }

                         { app_rec == App_Reception.whatsapp &&  (<input
                            type="text"
                            {...register("phone_to_apply") }
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder=""
                        />) }
            </div> }
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-bold mb-4">Documents exigés</h4>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("is_cv_require")} />
              <span>CV</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("is_lm_require")} />
              <span>Lettre de motivation</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("is_diplome_require")} />
              <span>Diplome</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("is_certificat_require")} />
              <span>Certificat</span>
            </label>
          </div>
          
        </div>

    


        <div className="flex justify-end pt-6">
          <button
            type="submit"
            // disabled={!isValid}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg
                     hover:bg-blue-700 active:bg-blue-800 transition-colors
                     shadow-md hover:shadow-lg disabled:opacity-50"
          >
            Ajouter Poste
          </button>
        </div>
      </div>
 
       

       

      </form>
    </div>
  );
}
