import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientForm() {
  const [error, setError] = useState("")
    const location = useLocation();
    const navigate = useNavigate();

    const isEditing = location.state?.isEditing || false;
    const client = location.state?.client || { email: "", designationClient: "", telephoneClient: "", adresseClient: "" };

    const [formData, setFormData] = useState({
        designationClient: client.designationClient,
        telephoneClient: client.telephoneClient,
        email: client.email,
        adresseClient: client.adresseClient
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                try{
                 await axios.put(`http://localhost:8000/clients/update/${client.id}`, formData);
                }catch(err){
                    console.log(err)
                    setError("Erreur lors de la modification")
                }
            } else {
             
                await axios.post("http://localhost:8000/clients/create", formData);
                
            }
            navigate("/clients"); 
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Modifier le client" : "Ajouter un client"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block">Désignation:</label>
                    <input 
                        type="text" 
                        name="designationClient"
                        value={formData.designationClient} 
                        onChange={handleChange} 
                        className="border p-2 w-75 rounded bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block">Adresse:</label>
                    <input 
                        type="text" 
                        name="adresseClient"
                        value={formData.adresseClient} 
                        onChange={handleChange} 
                        className="border p-2 w-75 rounded bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block">Téléphone:</label>
                    <input 
                        type="text" 
                        name="telephoneClient"
                        value={formData.telephoneClient} 
                        onChange={handleChange} 
                        className="border p-2 w-75 rounded bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label className="block">Email:</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        className="border p-2 w-75 rounded bg-white text-black"
                        required
                    />
                </div>

                <button className='mt-4 bg-white text-black px-4 py-2 rounded'>
                    <a href="/clients">Retour</a>
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

export default ClientForm