import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CommandList () {
    const [commandes, setCommandes] = useState([]);
    const [clients, setClients] = useState({});
    const [produits, setProduits] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchCommandes = async () => {
        setError("");
        try {
            const response = await axios.get("http://localhost:8000/commandes/get_all");
            setCommandes(response.data);
        } catch (err) {
            setError("Erreur veuillez recharger la page");
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get("http://localhost:8000/clients/get_all");
            const clientsMap = response.data.reduce((acc, client) => {
                acc[client.id] = client.designationClient; // Stocke l'id du client avec son nom
                return acc;
            }, {});
            setClients(clientsMap);
        } catch (err) {
            console.error("Erreur lors du chargement des clients", err);
        }
    };

    const fetchProduits = async () => {
        try {
            const response = await axios.get("http://localhost:8000/produits/get_all");
            const produitsMap = response.data.reduce((acc, produit) => {
                acc[produit.id] = produit.designationProduit; // Stocke l'id du produit avec sa désignation
                return acc;
            }, {});
            setProduits(produitsMap);
        } catch (err) {
            console.error("Erreur lors du chargement des produits", err);
        }
    };

    useEffect(() => {
        fetchCommandes();
        fetchClients();
        fetchProduits();
    }, []);

    const handleAddCategory = () => {
        navigate("/edit-command/new", { state: { isEditing: false } });
      }
    
      const handleEdit = (commande) => {
        navigate(`/edit-command/${commande.id}`, { state: { isEditing: true, command: commande } });
      }

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette commande ?")) {
            try {
                await axios.delete(`http://localhost:8000/commandes/delete/${id}`);
                setCommandes(commandes.filter((commande) => commande.id !== id));
            } catch (err) {
                console.error("Erreur lors de la suppression :", err);
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Liste des Commandes</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
                    <thead className="bg-gray-200 text-black">
                        <tr>
                            <th className="border p-2">Client</th>
                            <th className="border p-2">Produit</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.map((commande) => (
                            <tr key={commande.id}>
                                <td className="border p-2">{clients[commande.idClient] || "Inconnu"}</td>
                                <td className="border p-2">{produits[commande.idProduit] || "Inconnu"}</td>
                                <td className="border p-2">{commande.dateCommande}</td>

                                <td className="border p-2">
                                    <button
                                        onClick={() => handleEdit(commande)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                                    >
                                        Modifier
                                    </button>
                                    &nbsp;
                                    <button
                                        onClick={() => handleDelete(commande.id)}
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
        </div>
    );
}

export default CommandList;
