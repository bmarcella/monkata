import { Navigate } from "react-router";
import { useAuth } from "~/routes/AuthProvider";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Monkata Console" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (  ( isAuthenticated ) ? 
     <Navigate to="/dashboard" /> 
     : <Navigate to="/auth" /> );
}
