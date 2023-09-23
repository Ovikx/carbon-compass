import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FileProvider } from "./components/FileContext.tsx";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL1xP5iEVz7h8yYSDTrNhSB85e2AWvx8k",
  authDomain: "carbon-tracker-399904.firebaseapp.com",
  projectId: "carbon-tracker-399904",
  storageBucket: "carbon-tracker-399904.appspot.com",
  messagingSenderId: "159251576211",
  appId: "1:159251576211:web:db0bcfe78d3d8ead05e466",
};

// Initialize Firestore
export const firestore = getFirestore(initializeApp(firebaseConfig));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FileProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FileProvider>
  </React.StrictMode>,
);
