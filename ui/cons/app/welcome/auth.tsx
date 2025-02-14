

import { Button } from "~/components/ui";
import FreeRoute from "./FreeRoute";
import Title from "./Title";


export default function Auth() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
        <div className="flex flex-col items-center justify-center">
          <Title></Title>
       
             <FreeRoute />
        </div>
    </main>
  );
}

