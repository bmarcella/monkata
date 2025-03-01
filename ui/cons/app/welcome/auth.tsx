

import { Outlet, redirect } from "react-router";
import FreeRoute from "./FreeRoute";
import Title from "./Title";
import { isEntAuth, isUserAuth } from "~/services/AuthService";

export async function clientLoader(){
  try {
    const  isUserLogged = await isUserAuth();
    if(isUserLogged) return redirect("/compagny");
    return null;
  } catch (error) {
    console.log(error);
  }
 
}
export default function Auth() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex flex-col items-center justify-center">
          <Title></Title>
          <Outlet />
        </div>
    </main>
  );
}

