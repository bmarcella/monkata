import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { StorageService as store } from '../services/storage';
import { environment, getURL } from "~/services/environments/environment.prod";

const AuthContext = createContext(null);

interface Props {
    children : ReactNode
}
 function AuthProvider({ children } : Props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [ gateway ] = useState(environment.gateway);

  useEffect(() => {
    const _token = store.get("_token");  
    const profil = store.getJson("_profil");

    if(_token && profil) { 
      setIsAuthenticated(true);
      setToken(_token);
      setUser(profil);
      setAvatar();
    }
    
  }, []); 
  

  const setAvatar = async () => {
    const url = await getURL("memploi","cv/avatar/0");
    const fullUrl = gateway+url;
    setAvatarUrl(fullUrl);
    console.log(fullUrl);
  }

  const setLogin = (res: any) => { 
    setUser( res.profil  as any);  
    store.setJson("_profil", res.profil);
    setAvatar();
    setIsAuthenticated(true);
  }
  const logout = () => { 
    setUser(null); 
    setIsAuthenticated(false);
  }

  const refreshNewToken = (data: any) => {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + (data.expires_in * 1000)); // Convert seconds to milliseconds
    const rexpirationDate = new Date(now.getTime() + (data.refresh_expires_in * 1000)); // Convert seconds to milliseconds
    localStorage.setItem('token_expiration', expirationDate.toString());
    localStorage.setItem('refresh_token_expiration', rexpirationDate.toString());
    store.set("_token", data.access_token);
    store.set("_refresh_token", data.refresh_token);
    store.set("_session_state", data.session_state);
  }

 

  return (
    <AuthContext.Provider value={{ user, avatarUrl, setLogin, logout, refreshNewToken,  isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

 const useAuth = () => {
  
        const context = useContext(AuthContext);
        if (!context) {
          throw new Error('useAuth must be used within an AuthProvider');
        }
        return context;
}

export { AuthProvider, useAuth };