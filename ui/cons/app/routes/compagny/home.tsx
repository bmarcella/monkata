
import { useAppForAuth, useEntForAuth } from "~/services/httpHook/EntrepriseHook"
import Title from "./Title";

import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Log } from "~/utils/auth";
import { Launch } from "~/services/Http";
import { useAuthEnt } from "../../providers/AuthEntProvider";
import {  useNavigate } from "react-router-dom";
import Submit from "~/components/shared/Submit";
import Select from "~/components/form/select";
import { useAuth } from "../../providers/AuthProvider";
const schema =  z.object({
  app: z.string({  invalid_type_error: "Vous devez selectionnez une application" }).min(1, { message: "Vous devez selectionnez une application"  } ),
  ent: z.string({  invalid_type_error: "Vous devez selectionnez une entreprise" }).min(1, { message: "Vous devez selectionnez une entreprise"  }),
})
type  FormData = z.infer<typeof schema>

function index() {
  const { ents } = useEntForAuth([]);
  const { apps } = useAppForAuth([]);
  const { register , handleSubmit,  reset,   formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const { setLoginEnt} = useAuthEnt() as any;
  const { logout } = useAuth() as any;

  const navigate = useNavigate();
  const submit = async (data: any)=> {
      Launch(data).then(async (r: any) => {
          await setLoginEnt(r, data.ent, data.app);
          navigate("/dashboard");
        }).catch((e: any) => {
        Log(e);
      });
    reset(); 
   }
  return (
    <div className="space-y-4">
       <Title subTitle="Choisissez une de vos entreprises et une de nos applications pour debuter."></Title>
       <form className="space-y-4" onSubmit={ handleSubmit(submit)}>
        <Select  error = { errors.ent } reg= { { ...register("ent") }} options={ents}  onChange={undefined} label={'Entreprises'} ></Select>
        <Select  error = { errors.app } reg= { { ...register("app") }} options={apps}  onChange={undefined} label={`Applicattion`}></Select>
          <div className="flex justify-end">
          <Submit typeBtn={'submit'} >
            Commencer
          </Submit>
          </div>
        </form>
        <button onClick={async ()=> { 
        console.log("logout");
         logout();
         navigate ("/auth") }
        }>Logout</button>
    </div>
  )
}

export default index