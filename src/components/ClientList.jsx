import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


function ClientList() {
  const [clients, setClients] = useState([])
  const [error, setError] = useState("")
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoad = async () => {
    setError("");
    
    try{
      const response = await axios.get('http://localhost:8000/clients/get_all')
      setClients(response.data)
     
    }catch(err){
      setError("Erreur veuillez recharger la page")
    }
  }

  useEffect(() => {
    handleLoad()
  }, [])

  const handleAddClient = () => {
    navigate("/edit-client/new", { state: { isEditing: false } });
  }

  const handleEdit = (client) => {
    navigate(`/edit-client/${client.id}`, { state: { isEditing: true, client: client } });
  }

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
        try {
            await axios.delete(`http://localhost:8000/clients/delete/${id}`);
            setCategories(categories.filter((client) => client.id !== id)); // Mise à jour de la liste
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    }
  }

  return (
    <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Liste des Clients</h2>
    {/* <button 
    onClick={handleAddClient} 
    className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
>
    Ajouter un client
</button> */}

    {error && <p className="text-red-500 mb-4">{error}</p>}

    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
        <thead className="bg-gray-200 text-black">
        <tr>
          <th  className="border p-2">Désignation</th>
          <th  className="border p-2">Email</th>
          <th  className="border p-2">Téléphone</th>
          <th  className="border p-2">Adresse</th>
          <th className='border p-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
       {
        clients.map(client => (
          <tr key={client.id}>
            <td  className="border p-2">{client.designationClient}</td>
            <td  className="border p-2">{client.email}</td>
            <td  className="border p-2">{client.telephoneClient}</td>
            <td  className="border p-2">{client.adresseClient}</td>
            <td className="border p-2">
                  <button onClick={() => handleEdit(client)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">Modifier</button>
              &nbsp;
              <button onClick={() => handleDelete(client.id)}
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

export default ClientList