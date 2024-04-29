import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Context, initialContext } from "./context/";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <Context.Provider value={initialContext}>
      <MainPage />
    </Context.Provider>
  );
}

export default App;
