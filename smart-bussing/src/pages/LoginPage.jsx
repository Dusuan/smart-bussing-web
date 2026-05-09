import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const { session } = useAuth();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      console.error("Error logging in:", error.message);
    }
  };

  // Redirect to dashboard if already logged in
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#BAC5B3] to-[#9EBC8A]">
      <div className="bg-[#66745d] p-10 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full mx-4">
        <h1 className="text-3xl text-white text-outline-sm mb-6 text-center font-bold">
          Acceso Supervisor
        </h1>
        <p className="text-white text-center mb-8">
          Inicia sesión para gestionar las rutas y paradas.
        </p>
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-white text-[#3B7C5F] font-bold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-3"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-5 h-5" />
          Ingresar con Google
        </button>

        <a href="/" className="mt-6 text-sm text-white/80 hover:text-white underline decoration-1 underline-offset-2">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
