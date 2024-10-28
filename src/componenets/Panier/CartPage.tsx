import { useCart } from "../../Context/Cart.tsx";
import { uploadUrl } from "../../Utils/Helpers.tsx";
import './CartPage.css';
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

export default function CartPage() {
    const { cart, removeFromCart } = useCart();
    const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

    const getImageUrl = (imagePath: string): string => {
        return `${uploadUrl}${imagePath}`;
    };

    const ChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
        const newQuantity: number = parseInt(e.target.value, 10);
        setQuantities({
            ...quantities,
            [itemId]: newQuantity > 0 ? newQuantity : 1
        });
    };

    const getItemSubtotal = (price: number, quantity: number): number => {
        return price * quantity;
    };

    const getSubtotal = (): number => {
        return cart.reduce((total, item) => {
            const itemQuantity = quantities[item.id] || 1;
            return total + getItemSubtotal(item.price, itemQuantity);
        }, 0);
    };

    const subtotal=getSubtotal();
    localStorage.setItem('subtotal', subtotal.toString());


    return (

        <div className="cart-container">
            <h2 className="cart-title">Panier</h2>
            {cart.length > 0 ? (<div className="cart-content">
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Subtotal</th>
                        <th>Supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td className="product-cell">
                                <div className="product-info">
                                    <img src={getImageUrl(item.image)} alt={item.name}/>
                                    <span>{item.name}</span>
                                </div>
                            </td>
                            <td>{item.price} €</td>
                            <td>
                                <input
                                    type="number"
                                    value={quantities[item.id] || 1}
                                    min="1"
                                    className="quantity-input"
                                    onChange={(e) => ChangeQuantity(e, item.id)}
                                />
                            </td>
                            <td>{getItemSubtotal(item.price, quantities[item.id] || 1).toFixed(2)} €</td>
                            <td>
                                <TiDeleteOutline onClick={() => removeFromCart(item)} className="remove-button"/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <table className="cart-totals">
                    <thead className="table-header">
                    <tr className="table-row-header">
                        <th className="table-header-item">totaux du Panier</th>
                        <th className="table-header-item"></th>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                    <tr className="table-row">
                        <th className="table-item">Total</th>
                        <td id="Subtotal" className="table-item">{getSubtotal().toFixed(2)} €</td>
                    </tr>
                    <tr>
                        <th className="checkout-links">
                            <div className="links-container">
                                <Link to="/checkout" className="checkout-button">Passez à la caisse</Link>
                                <Link to="/" className="shopping-button">Continuer Shopping</Link>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>) : (<>
                    <div className="empty-cart">votre panier est vide</div>
                        <Link to="/" className="back-button"><BsCart3 className="iconcart"/><p>continuer shopping</p></Link>
                </>
            )}

        </div>
    );
}


