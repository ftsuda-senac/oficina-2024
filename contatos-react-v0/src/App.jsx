import { useState } from 'react'

import './App.css'
import PessoaForm from './pages/pessoas/Form'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PessoaLista from './pages/pessoas/Lista'

function App() {

  return (
    <>
      <Navbar />
      <PessoaLista />
      <Footer />
    </>
  )
}

export default App
