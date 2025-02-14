// import Button from "~/components/shared/Button";

import { Button } from "~/components/ui";
import { getURL, getRURL } from "~/services/environments/environment.prod";
import { httpGet, Services } from "~/services/Http";


export default function Login() {
const AuthlLogin = (event?: any) => {
    const URL = getURL(Services.USERS, "cross-token/addCT/console")
    httpGet(URL).then((res: any) => {
      const  r = res.data;
      const URL = getRURL(r.cross_token, r.monkata_auth);
      console.log(res, URL);
      window.location.href = URL;
    }).catch((e) => console.log(e));

}
  return (
    <>  

    {/* <Button  onBtnClick={(event) => { AuthlLogin(event) }}>
            Login to your account
    </Button> */}
    <div className="flex flex-col items-center justify-center">
      <Button onClick={(event) => { AuthlLogin(event) }}>
            Login to your account
      </Button>
    </div>
    <Button color="error">Error</Button> 
   
    </>
         
   );
}

