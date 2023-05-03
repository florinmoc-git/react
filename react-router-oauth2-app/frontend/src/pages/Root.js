import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import MainNavigation from "../components/MainNavigation";


function RootLayout() {
  
  return (
      <AuthProvider>
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </AuthProvider>
  );
}

export default RootLayout;
