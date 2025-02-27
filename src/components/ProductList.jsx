import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/produits/get_all");
      setProducts(response.data);
    } catch (err) {
      setError("Erreur de connexion, veuillez recharger la page");
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await axios.delete(`http://localhost:8000/produits/delete/${id}`);
        setProducts(products.filter((product) => product.id !== id)); // Mise à jour de la liste
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des produits</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="border p-2">Désignation</th>
              <th className="border p-2">Prix</th>
              <th className="border p-2">Format</th>
              <th className="border p-2">Modèle</th>
              <th className="border p-2">Quantité en stock</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.designationProduit}</td>
                <td className="border p-2">{product.prixProduit}</td>
                <td className="border p-2">{product.formatProduit}</td>
                <td className="border p-2">{product.modeleProduit}</td>
                <td className="border p-2">{product.qteStock}</td>
                <td className="border p-2">
                  <button
                    onClick={() => setSelectedImage(product.imageProduit)}
                    className="text-blue-500 underline"
                  >
                    Voir image
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup d'affichage de l'image */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
            >
              ✖
            </button>
            <img src={selectedImage} alt="Produit" className="max-w-full max-h-[80vh] rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
