import {useNavigate, useParams} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import './ProductPage.css'
import axios from "axios";
import { uploadUrl, apiUrl } from "../../Utils/Helpers.tsx";
import Loading from "../Loading/Loading.tsx";
import {useCart} from "../../Context/Cart.tsx";
import Footer from "../Footer/Footer.tsx";
import Navbar from "../Navbar/Navbar.tsx";
import {TiPlus} from "react-icons/ti";


interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    genderP: string;
    quantity: number;
}

const getImageUrl = (imagePath: string | undefined): string => {
    return `${uploadUrl}${imagePath}`;
};



const fetchProductById = async (id: string): Promise<Product> => {
    const res = await axios.get(`${apiUrl}/productss`, {
        params: { 'id': id }
    });
    return res.data['hydra:member'][0];
};

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const {addToCart}=useCart();
    const navigate = useNavigate();

    if (!id) {
        return <div>ID du produit manquant.</div>;
    }

    const { data: product, isLoading, error } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Erreur lors du chargement du produit.</div>;
    if (!product) {
        return <div>Produit non trouvé.</div>;
    }

    console.log(product);

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/panier');
    };

    const redirection=()=>{
        navigate('/');
    }

    const background="/women.jpg"


    return (<>
           <Navbar backgroundImage={background}/>
            <div className="product-detail-container">
                <div className="product-detail1">
                    <img src={getImageUrl(product.image)} alt={product.name}/>

                </div>
                <div className="product-detail2">
                    <h1>{product.name}</h1>
                    <p className="genderP">{product.genderP}</p>
                    <p className="price">{product.price}€</p>
                    <p className="description">{product.description}</p>
                    <div className="buttons">
                        <button className="add-button1" onClick={handleAddToCart}><TiPlus className="plus"/>commander
                            maintenant
                        </button>
                        <button className="button2" onClick={redirection}>Explorer d'autre produits</button>
                    </div>

                </div>
            </div>
            <Footer/>
        </>

    );
}
