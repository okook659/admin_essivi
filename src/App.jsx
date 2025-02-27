import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Home from "./components/Home"
import ClientList from "./components/ClientList";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import CategoryForm from "./components/CategoryForm";
import ClientForm from "./components/ClientForm";
import CommandList from "./components/CommandList";
import CommandForm from "./components/CommandForm";

function App() {
  

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accueil" element={<Home />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/edit-client/:id" element={<ClientForm />} />
        <Route path='/categories' element={<CategoryList />} />
        <Route path="/edit-category/:id" element={<CategoryForm />} />
        <Route path='/produits' element={<ProductList />} />
        <Route path='/commandes' element={<CommandList />} />
        <Route path="/edit-command/:id" element={<CommandForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
