import './App.css'
import Pokemons from "./pages/Pokemons/Pokemons";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Status from './pages/Status/Status';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Pokemons/>} />
            <Route path="/Status/:id" element={<Status/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
