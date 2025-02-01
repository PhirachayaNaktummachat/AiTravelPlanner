import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/custom/Hero'
import { Toaster } from "react-hot-toast";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/*Hero*/}
    <Hero/>
    
    <div>
    <Toaster position="top-center" reverseOrder={false} />
    </div>
    </>
    
  );
}

export default App
