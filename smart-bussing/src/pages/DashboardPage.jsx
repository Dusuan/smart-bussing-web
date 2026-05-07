import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAddRoute = () => {
    navigate("/new-route");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BAC5B3] to-[#9EBC8A] text-white">
      {/* Dashboard Header */}
      <nav className="bg-[#3B7C5F] p-4 shadow-md flex justify-between items-center">
        <div className="text-xl font-bold text-outline-sm">SmartBussing Dashboard</div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">{session?.user?.email}</span>
          <button 
            onClick={handleLogout}
            className="bg-[#66745d] hover:bg-[#BAC5B3] hover:text-[#3B7C5F] text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-outline-sm">Bienvenido Supervisor</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add New Route Card */}
          <div 
            onClick={handleAddRoute}
            className="bg-[#66745d]/80 hover:bg-[#66745d] rounded-xl p-6 shadow-lg cursor-pointer transition duration-300 flex flex-col items-center justify-center border-2 border-dashed border-[#BAC5B3] h-48"
          >
            <div className="text-5xl mb-4 text-[#BAC5B3]">+</div>
            <h2 className="text-xl font-semibold text-center text-outline-sm">Añadir nueva ruta</h2>
          </div>
          
          {/* Future cards can go here */}
        </div>
      </main>
    </div>
  );
}
