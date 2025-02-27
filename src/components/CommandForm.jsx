import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function CommandForm() {
    const [error, setError] = useState("")
    const [clients, setClients] = useState([]);
    const [produits, setProduits] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const isEditing = location.state?.isEditing || false;
    const commande = location.state?.commande || { idClient: "", idProduit: "", dateCommande: "" };

    const [formData, setFormData] = useState({
        idClient: commande.idClient,
        idProduit: commande.idProduit,
        dateCommande: commande.dateCommande
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientsRes = await axios.get("http://localhost:8000/clients/get_all");
                const produitsRes = await axios.get("http://localhost:8000/produits/get_all");
                
                setClients(clientsRes.data);
                setProduits(produitsRes.data);
            } catch (error) {
                setError("Erreur lors du chargement des données.");
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                try {
                    await axios.put(`http://localhost:8000/commandes/update/${commande.id}`, formData);
                } catch (err) {
                    console.log(err)
                    setError("Erreur lors de la modification")
                }
            } else {
                // Ajouter une nouvelle catégorie
                await axios.post("http://localhost:8000/commandes/create", formData);

            }
            navigate("/commandes"); // Retour à la liste
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }
    };
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Modifier la commande" : "Ajouter une commande"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label className="block">Client :</label>
                    <select
                        name="idClient"
                        value={formData.idClient}
                        onChange={handleChange}
                        className="border p-2 w-75 rounded bg-white text-black mb-3"
                        required
                    >
                        <option value="">Sélectionner un client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.designationClient}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                <label className="block">Produit :</label>
                    <select
                        name="idProduit"
                        value={formData.idProduit}
                        onChange={handleChange}
                        className="border p-2 w-75 rounded bg-white text-black mb-3"
                        required
                    >
                        <option value="">Sélectionner un produit</option>
                        {produits.map(produit => (
                            <option key={produit.id} value={produit.id}>
                                {produit.designationProduit}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="" className="block">Date de commande :</label>
                    <input type="date" name="dateCommande" id="dateCommande" 
                    onChange={handleChange}
                    value={formData.dateCommande}
                    className="border p-2 w-75 rounded bg-white text-black mb-3"
                    required
                    />
                </div>
                <button className='mt-4 bg-white text-black px-4 py-2 rounded'>
                    <a href="/commandes">Retour</a>
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

export default CommandForm