import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthEnt } from "~/routes/AuthEntProvider";
import { useAuth } from "~/routes/AuthProvider";

interface User {
  name?: string;
  avatar?: string;
}

const NavBavMenu: React.FC = () => {
  const { logoutEnt, app,  } = useAuthEnt() as any;
  const { avatarUrl , user } = useAuth() as any;
  const navigate = useNavigate();
  const onLogout = (e: any) => { 
    e.preventDefault();
    logoutEnt();
    navigate('/compagny');
  };

  return (
    <header className={'bg-gray-900 text-white flex justify-between items-center p-4 shadow-md'}>
      {/* App Name */}
      <h1 className={'text-xl font-bold'}> MONKATA { (app) ? '-'+ (app as String).toUpperCase() : '' }</h1> 

      {/* User Info & Logout */}
      <div className={'flex items-center gap-4'}>
        <div className={'flex items-center gap-2'}>
          {/* User Avatar */}
        { user && avatarUrl && <img
            title={user?.lastName} 
            src={ avatarUrl }
            alt={ user?.firstName+' '+ user?.lastName || "Guest" }
            className={'w-10 h-10 rounded-full border border-gray-700'}
          />
        }
          {/* User Name */}
          <span className={'hidden sm:inline'} title={user?.lastName} >{user?.firstName || "Guest"}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className={'flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition'}
        >
          <LogOut className={'w-5 h-5'} />
          <span className={'hidden sm:inline'}>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default NavBavMenu;
