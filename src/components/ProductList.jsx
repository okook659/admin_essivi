import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ProductList() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    const handleProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/produits/get_all')
            setProducts(response.data)
        } catch (err) {
            setError("Erreur de connexion, veuillez recharger la page")
        }
    }

    useEffect(() => {
        handleProducts()
    }, [])

    const handleAddProduct = () => {
      navigate("/edit-product/new", { state: { isEditing: false } });
    }
  
    const handleEdit = (product) => {
      navigate(`/edit-product/${product.id}`, { state: { isEditing: true, product: product } });
    }

    const handleDelete = async (id) => {
      if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
          try {
              await axios.delete(`http://localhost:8000/produits/delete/${id}`);
              setProducts(products.filter((product) => product.id !== id)); // Mise à jour de la liste
          } catch (err) {
              console.error("Erreur lors de la suppression :", err);
          }
      }
    }

  return (
    <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Liste des produits</h2>
    {/* <button 
    onClick={handleAddProduct} 
    className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
>
    Ajouter un produit
</button> */}
    {error && <p className="text-red-500 mb-4">{error}</p>}

    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead className="bg-gray-200 text-black">
        <tr>
          <th  className="border p-2">Désignation</th>
          <th  className="border p-2">Prix</th>
          <th  className="border p-2">Format</th>
          <th  className="border p-2">Modèle</th>
          <th  className="border p-2">Quantité en stock</th>
          <th className='border p-2'>Image</th>
          <th className='border p-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
       {
        products.map(product => (
          <tr key={product.id}>
            <td  className="border p-2">{product.designationProduit}</td>
            <td  className="border p-2">{product.prixProduit}</td>
            <td  className="border p-2">{product.formatProduit}</td>
            <td  className="border p-2">{product.modeleProduit}</td>
            <td  className="border p-2">{product.qteStock}</td>
            <td className="border p-2">
              Voir image
            </td>
            <td className="border p-2">
            {/* <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">Modifier</button> */}
              &nbsp;
              <button onClick={() => handleDelete(product.id)}
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

export default ProductList