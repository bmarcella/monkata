
import { useEffect } from "react";
import type { Route } from "./+types/cross-token";
import { httpGetCrossToken } from "~/services/Http";
import { useAuth } from "~/routes/AuthProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "~/components/shared/spinner";
// provides `loaderData` to the component
export async function loader({ params }: Route.LoaderArgs) {
 //  let team = await fetchTeam(params.token);
  return { token: params.token };
}

export default function Cross_Token({
  loaderData,
}: Route.ComponentProps) {

   const { setLogin, refreshNewToken } = useAuth();
   const navigate = useNavigate();
  useEffect(() => {
  httpGetCrossToken(loaderData.token).then((r: any) => {
      console.log(r);
      const kc = JSON.parse(r.cross_token.kCToken);
       setLogin(r);
       refreshNewToken(kc);
      setTimeout(() => {
        if (!r.cross_token.returnUrl)
            setTimeout(() =>{
            navigate("/compagny");
        });
          
        else
          navigate(r.cross_token.returnUrl);
      }, 2000);
    }).catch((e: any) => {
      console.log(e);
      navigate("/");
    });
    
  }, [loaderData]);

  return (
    <>
    <div className="flex flex-col items-center justify-center">
       <Spinner></Spinner>
    </div>
    </>
  );
}

