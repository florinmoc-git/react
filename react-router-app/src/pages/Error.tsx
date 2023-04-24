import React from "react";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An error has occured!</h1>
        <p>Page not found!</p>
      </main>
    </>
  );
}

export default ErrorPage;
