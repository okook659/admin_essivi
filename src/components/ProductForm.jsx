import React from 'react'

function ProductForm() {
  const [error, setError] = useState("")
    const location = useLocation();
    const navigate = useNavigate();

    const isEditing = location.state?.isEditing || false;
    const product = location.state?.product || { codeCategorie: "", designationProduit: "" };

    const [formData, setFormData] = useState({
        codeCategorie: product.codeCategorie,
        designationProduit: product.designationProduit,
        formatProduit: product.formatProduit,
        imageProduit: product.imageProduit,
        modeleProduit: product.modeleProduit,
        prixProduit: product.prixProduit
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                try{
                 await axios.put(`http://localhost:8000/produits/update/${product.id}`, formData);
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
    <div>ProductForm</div>
  )
}

export default ProductForm