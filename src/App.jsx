import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import Footer from './Footer'
import MusicGen from './MusicGen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <MusicGen></MusicGen>
      <Footer></Footer>
    </>
  )
}

export default App
