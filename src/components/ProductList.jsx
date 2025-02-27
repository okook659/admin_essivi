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

  return (
    <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Liste des produits</h2>

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
              <button>Modifier</button>
              <button>Supprimer</button>
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