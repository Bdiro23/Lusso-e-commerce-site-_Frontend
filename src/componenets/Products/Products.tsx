import { useQuery } from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './Products.css';
import "aos/dist/aos.css";
import { TiPlus } from "react-icons/ti";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { apiUrl, uploadUrl } from "../../Utils/Helpers.tsx";
import Loading from "../Loading/Loading.tsx";
import Navbar from "../Navbar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";
import { useCart } from "../../Context/Cart.tsx";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    genderP: string;
    quantity:number;

}

const getImageUrl = (imagePath: string): string => {
    return `${uploadUrl}${imagePath}`;
};

const fetchProductsByCategory = async (categoryId: string | undefined): Promise<Product[]> => {
    try {
        const res = await axios.get(`${apiUrl}/productss`, {
            params: { 'categorie.id': categoryId }
        });
        return res.data['hydra:member'] || [];
    } catch (error) {
        throw new Error('Erreur lors de la récupération des produits');
    }
};

const getNavbarData = (categorieId: string | undefined) => {
    switch (categorieId) {
        case '1': return { title: 'Parfums Sensuels', backgroundImage: '/Parfums_images/cover_parfum.jpg', paragraph: 'Laissez votre présence se faire sentir avec une touche d\'élégance.' };
        case '2': return { title: 'Sacs Élégants', backgroundImage: '/Shoes_Images/cover.jpg', paragraph: 'Emportez le style avec vous partout où vous allez.' };
        case '3': return { title: 'Bagues Précieuses', backgroundImage: '/Shoes_Images/cover.jpg', paragraph: 'Exprimez votre élégance avec des bijoux d’exception.' };
        case '4': return { title: 'Chaussures Tendance', backgroundImage: '/Shoes_Images/cover.jpg', paragraph: 'Marchez vers l\'originalité avec confort et allure.' };
        case '5': return { title: 'Lunettes Stylées ', backgroundImage: '/Lunettes_images/maquinlunette.jpg', paragraph: 'Protégez vos yeux tout en affichant un style audacieux.' };
    }
};

export default function Products(): React.ReactElement {
    const { categoryId } = useParams<{ categoryId: string }>();
    const { data, status, isLoading, error } = useQuery<Product[]>({
        queryKey: ['products', categoryId],
        queryFn: () => fetchProductsByCategory(categoryId),
        staleTime: 5000,
    });

    const { addToCart,addToFavoris } = useCart();
    const categoryData = getNavbarData(categoryId);
    const navigate = useNavigate();

    if (!categoryData) {
        return <div>Excusez-nous mais cette categorie n'existe pas dans notre site</div>;
    }

    if (status === "error") return <div>{error.message}</div>;

    // @ts-ignore
    return (
        <div>
            {isLoading ? (<Loading />) : (
                <>
                    <Navbar backgroundImage={categoryData.backgroundImage}
                            title={categoryData.title}
                            sentence={categoryData.paragraph} />
                    <h2 className="title_product">Produits</h2>
                    <div className="products-container" data-aos="fade-up" data-aos-delay="200">
                        {status === "success" && data && (
                            data.length > 0 ? (
                                data.map((product) => (
                                    <div className="product-card" key={product.id} >
                                        <div className="product-icon">
                                            <TiPlus className="ti-plus" onClick={() => addToCart(product)} />
                                            <FaHeartCirclePlus className="ti-heart" onClick={()=>addToFavoris(product)} />
                                        </div>
                                        <div onClick={() => navigate(`/product/${product.id}`)}>
                                            <img src={getImageUrl(product.image)} alt={product.name}/>
                                            <h3>{product.name}</h3>
                                            <p>{product.genderP}</p>
                                            <p className="price">{product.price}€</p>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="no-products">Aucun produit disponible.</div>
                            )
                        )}
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
}
