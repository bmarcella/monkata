
import { useEffect, useState } from "react";
import type { Route } from "./+types/cross-token";
import { httpGetCrossToken } from "~/services/Http";
import { useAuth } from "~/providers/AuthProvider";
import { NavLink,    useNavigate } from "react-router-dom";
import Spinner from "~/components/shared/spinner";

export async function clientLoader({ params }: Route.LoaderArgs) {
  return { token: params.token };
}

export default function Cross_Token({
  loaderData,
}: Route.ComponentProps) {
  const { setLogin } = useAuth() as any;
  const [ ready, setReady ] = useState<number>(0);
  const [ url, setURL ] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
  httpGetCrossToken(loaderData.token).then(async (r: any) => {
      console.log(r);
      const kc = JSON.parse(r.cross_token.kCToken);
      setLogin(r, kc);
      const $timer =  setTimeout(() => {
        setReady(1);
        if (!r.cross_token.returnUrl) {
            navigate("/compagny");
            setURL('/compagny');
        } else {
            navigate(r.cross_token.returnUrl);
            setURL(r.cross_token.returnUrl);
        }
       
        clearTimeout($timer);
       },3000);
    }).catch((e: any) => {
      console.log(e);
      setReady(-1);
      navigate("/");
    });
    
  }, [loaderData]);

  

  return (
    <>
    <div className="flex flex-col items-center justify-center">
     {  ready==0 && <Spinner></Spinner> } 
     {/* {   ready==1  &&   <Button  onBtnClick={(event) => { AuthlLogin(event) }}>
            Login to your account
    </Button> } */}
     {   ready==-1  &&   (<h1></h1>) }
    </div>
    </>
  );
}

