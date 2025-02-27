import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CategoryList() {

  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  const navigate = useNavigate();

  
  const handleCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories/get_all')
      setCategories(response.data)
    } catch (err) {
      setError("Erreur de connexion, veuillez recharger la page")
    }
  }

  useEffect(() => {
    handleCategories()
  }, [])

  const handleAddCategory = () => {
    navigate("/edit-category/new", { state: { isEditing: false } });
  }

  const handleEdit = (categorie) => {
    navigate(`/edit-category/${categorie.id}`, { state: { isEditing: true, category: categorie } });
  }

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
        try {
            await axios.delete(`http://localhost:8000/categories/delete/${id}`);
            setCategories(categories.filter((categorie) => categorie.id !== id)); // Mise à jour de la liste
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des catégories</h2>
      <button 
    onClick={handleAddCategory} 
    className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
>
    Ajouter une catégorie
</button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Désignation</th>
              <th className='border p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(categorie => (
                <tr key={categorie.id}>
                  <td className="border p-2">{categorie.codeCategorie}</td>
                  <td className="border p-2">{categorie.designationCategorie}</td>
                  <td className="border p-2">
                  <button onClick={() => handleEdit(categorie)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">Modifier</button>
              &nbsp;
              <button onClick={() => handleDelete(categorie.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Supprimer</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CategoryList