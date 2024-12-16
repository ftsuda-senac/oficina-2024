import { BrowserRouter,  Route, Routes } from 'react-router-dom';

import PessoaForm from './pages/pessoas/Form'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PessoaLista from './pages/pessoas/Lista'
import './App.css'

function App() {

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Navbar />
        <div className="container-lg mb-3">
          <Routes>
            <Route path="/pessoas">
              <Route path="novo" element={<PessoaForm />} />
              <Route path="alterar/:id" element={<PessoaForm />} />
              <Route path="" element={<PessoaLista />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
