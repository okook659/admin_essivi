import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


function CategoryForm() {
    const [error, setError] = useState("")
    const location = useLocation();
    const navigate = useNavigate();

    const isEditing = location.state?.isEditing || false;
    const category = location.state?.category || { codeCategorie: "", designationCategorie: "" };

    const [formData, setFormData] = useState({
        codeCategorie: category.codeCategorie,
        designationCategorie: category.designationCategorie,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                try{
                 await axios.put(`http://localhost:8000/categories/update/${category.id}`, formData);
                }catch(err){
                    console.log(err)
                    setError("Erreur lors de la modification")
                }
            } else {
             
                await axios.post("http://localhost:8000/categories/create", formData);
                
            }
            navigate("/categories"); 
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Modifier la catégorie" : "Ajouter une catégorie"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block">Code Catégorie:</label>
                    <input 
                        type="text" 
                        name="codeCategorie"
                        value={formData.codeCategorie} 
                        onChange={handleChange} 
                        className="border p-2 w-75 rounded bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block">Désignation:</label>
                    <input 
                        type="text" 
                        name="designationCategorie"
                        value={formData.designationCategorie} 
                        onChange={handleChange} 
                        className="border p-2 w-75 rounded bg-white text-black"
                        required
                    />
                </div>
                <button className='mt-4 bg-white text-black px-4 py-2 rounded'>
                    <a href="/categories">Retour</a>
                </button>
                &nbsp;
                <button 
                    type="submit" 
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                >
                    {isEditing ? "Modifier" : "Ajouter"}
                </button>
            </form>
        </div>
  )
}

export default CategoryForm