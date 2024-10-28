import {createContext, useContext, useState, ReactNode, useEffect} from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: Product[];
    favoris : Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    addToFavoris: (product: Product) => void;
    removeFromFavoris: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>(()=>{
        const storedcart=localStorage.getItem("cart");
        return storedcart ? JSON.parse(storedcart) : [];
    });

    const [favoris, setFavoris] = useState<Product[]>(()=>{
        const storedfavoris=localStorage.getItem('favoris');
        return storedfavoris? JSON.parse(storedfavoris) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    },[cart])

    useEffect(() => {
        localStorage.setItem("favoris", JSON.stringify(favoris));
    }, [favoris]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existing_product= cart.find(item=>item.id === product.id);
            if(existing_product){
                return [...prevCart];
            }else{
                return [...prevCart, product];
            }
        });
    };

    const addToFavoris = (product: Product) => {
        setFavoris((prevFavoris)=>{
            const existing_favoris=favoris.find(item=>item.id===product.id);
            if(existing_favoris){
                return [...prevFavoris];
            }else{
                return [...prevFavoris, product];
            }
        });
    };


    const removeFromCart = (product: Product) => {
        setCart(prevCart => {
            return prevCart.filter(item=>item.id!==product.id);
        })
    }

    const removeFromFavoris = (product: Product) => {
        setFavoris(prevFavoris=>{
            return prevFavoris.filter(item=>item.id!==product.id);
        })
    }



    return (
        <CartContext.Provider value={{ cart,favoris, addToCart,removeFromCart, removeFromFavoris, addToFavoris }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
