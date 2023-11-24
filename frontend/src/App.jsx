import React from "react";
import Map from "./components/Map";
import Sidebar from './components/Sidebar';
import Header from './components/header';

function App() {
  return (
    <div className='flex flex-col bg-blue-950 h-screen'>
      <Header />
      <div className='flex flex-row bg-white'>
        <div>
          <Sidebar />
        </div>
        <div className='flex-grow'>
          <Map />
        </div>
      </div>
    </div>
    )
}

export default App;