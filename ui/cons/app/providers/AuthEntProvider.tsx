import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { StorageService as store } from '../services/storage';
import { menuConfig } from "~/configs/menu";
import { getMenu } from "~/services/Http";

const AuthContext = createContext(null);

interface Props {
    children : ReactNode
}
 function AuthEntProvider({ children } : Props) {
  const [ent, setEnt] = useState<number>();
  const [app, setApp] = useState<string>();
  const [menuItems, setMenu] = useState([]);
  const [tokenEnt, setTokenEnt] = useState<any>({});
  const [isAuthenticatedEnt, setIsAuthenticatedEnt] = useState(false);

  useEffect(  () => {
     const  initToken = async () => {
      const _token = await store.getJson("entToken") as any ;  
      if(_token) { 
        setEnt(_token.appEnt.entId);
        setApp(_token.appEnt.appName);
        const  m : any = menuConfig.menus.map((menu: any) => ({
          ...menu,
          isOpen: false
        }));
        setMenuData(_token.appEnt.appName);
        setIsAuthenticatedEnt(true);
        setTokenEnt(_token);
      }
     }
    initToken();
  }, []); 
  
  const isApp = (name: string) => {
     return (app == name);
  }

  const setMenuData = (name: string) => {
   
    const  m : any = menuConfig.menus.map((menu: any) => ({
      ...menu,
      isOpen: false
    }));
    const data: any = getMenu(name);
    if(data) {
      m.push(
        {
          ...data,
          isOpen: false
        }
      )
    }
    setMenu(m);
  }

  const setLoginEnt = async (r: any, ent: number , app: string) => { 
   
    const t = { appEnt:  r.appEnt , appEntToken :  r.token };
    setEnt(t.appEnt.entId);
    setApp(t.appEnt.appName);
    setMenuData(r.appEnt.appName);
    setTokenEnt(t);
    setIsAuthenticatedEnt(true);
    await store.setJson("entToken",  t );
  }

  const logoutEnt = async () => { 
    setEnt(undefined); 
    setApp(""); 
    setIsAuthenticatedEnt(false);
    await store.remove("entToken");
  }

  
  

 

  return (
    <AuthContext.Provider value={{ isApp, ent, app, setLoginEnt, logoutEnt ,  isAuthenticatedEnt, menuItems , tokenEnt }}>
      {children}
    </AuthContext.Provider>
  );
}

 const useAuthEnt = () => {
  
        const context = useContext(AuthContext);
        if (!context) {
          throw new Error('useAuthEnt must be used within an AuthProvider');
        }
        return context;
}

export { AuthEntProvider, useAuthEnt };