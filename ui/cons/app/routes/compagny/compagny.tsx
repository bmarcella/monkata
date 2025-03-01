
import { Outlet, redirect } from "react-router-dom";
import { isEntAuth, isUserAuth } from "~/services/AuthService";

export async function clientLoader(){
  try {
    const  isUserLogged = await isUserAuth();
    const  isEntLogged = await isEntAuth();
    if(isUserLogged && isEntLogged) return redirect("/dashboard");
    if(!isUserLogged) return redirect("/auth");
    return null;
  } catch (error) {
    console.log(error);
  }
 
}

function Compagny() {
        

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex flex-col items-center justify-center">
              <Outlet /> 
        </div> 
    </main>
  )
}

export default Compagny