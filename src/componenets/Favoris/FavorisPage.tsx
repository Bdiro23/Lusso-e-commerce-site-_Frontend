import {useCart} from "../../Context/Cart.tsx";
import {uploadUrl} from "../../Utils/Helpers.tsx";
import {TiDeleteOutline} from "react-icons/ti";
import "./FavorisPage.css"
import {Link} from "react-router-dom";
import {MdOutlineFavoriteBorder} from "react-icons/md";
export default function FavorisPage() {
    const {favoris,removeFromFavoris}=useCart();

    const getImageUrl = (imagePath: string): string => {
        return `${uploadUrl}${imagePath}`;
    };
    return(
        <div className="favoris-container">
            <h2 className="favoris-title">Favoris</h2>
            {favoris.length >0 ? (<div>
                <table className="favoris-table">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Prix</th>
                        <th>supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {favoris.map((item) => (
                        <tr key={item.id}>
                            <td className="product-cell">
                                <div className="product-info">
                                    <img src={getImageUrl(item.image)} alt={item.name}/>
                                    <span>{item.name}</span>
                                </div>
                            </td>
                            <td>{item.price} €</td>
                            <td>
                                <TiDeleteOutline onClick={() => removeFromFavoris(item)} className="remove-buttonf"/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>): (<>
                    <div className="empty-favoris">votre favoris est vide</div>
                    <Link to="/" className="back-buttonf"><MdOutlineFavoriteBorder className="iconfavoris"/><p>continuer shopping</p></Link>
                </>
            )}

        </div>
    )
}