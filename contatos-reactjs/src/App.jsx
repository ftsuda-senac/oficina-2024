
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Lista from './pages/pessoas/Lista';
import Form from './pages/pessoas/Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Navbar />
        <div className="container-lg mb-3">
          <Routes>
            <Route path="/pessoas">
              <Route path="novo" element={<Form />} />
              <Route path="alterar/:id" element={<Form />} />
              <Route path="" element={<Lista />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
  
}

export default App;