import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavBarComponent } from './components/NavBarComponent'

function App() {


  return (
    <>
      <NavBarComponent/>
      <div>
        <h1>Carbon Tracker</h1>
        <p>Track your carbon footprint</p>
        <p>Smarter</p>

      </div>
      
    </>
  );
}

export default App;
