import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../auth/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    // if (token === "EXPIRED") {
    //   submit(null, { action: "/logout", method: "POST" });
    //   return;
    // }

    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      // submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);
  return (
    <>
      <AuthProvider>
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
}

export default RootLayout;
