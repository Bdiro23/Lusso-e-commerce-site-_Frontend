import './Navbar.css';
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
//import { useTranslation } from 'react-i18next';
import { BsCart3 } from "react-icons/bs";
import {GiDiamonds} from 'react-icons/gi';
import {useCart} from "../../Context/Cart.tsx";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useAuth } from "../../Context/Auth.tsx";
import {FaUserCircle} from "react-icons/fa";

interface NavbarProps {
    backgroundImage?: string;
    title?: string;
    sentence?: string;
}

const Navbar: React.FC<NavbarProps> = ({backgroundImage,title,sentence}) => {


    const[currentImage, setCurrentImage] = useState<number>(0);

    const {cart,favoris}=useCart();
    const { isAuthenticated, logout,login } = useAuth();
    const [loggedIn, setLoggedIn] = useState(isAuthenticated);
    const [showLogout, setShowLogout] = useState(false);

    const handleLogin = () => {
        login();
        setLoggedIn(true);
    };

    const toggleLogout =()=>{
        setShowLogout(!showLogout);
    }

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
    };

    const handleScroll = () => {
        window.scrollBy({ top: 600, behavior: 'smooth' });
    };

    const defBackImage = ['/public/Navbar_images/sacfemme.jpg',
                          '/public/Navbar_images/diamond.jpg',
                          'public/Navbar_images/maria.jpg',
                           'public/Navbar_images/parfumchic.jpg'];

    const deftitle='Explorer notre produits';
    const defsentence='Retrouvez les dernières tendances, les nouveautés à ne pas rater et notre sélection exclusives rien que pour vous.';

    useEffect(() => {
        const intervallId=setInterval(()=>{
            setCurrentImage((previmage)=>(previmage + 1)%defBackImage.length);
    },4000);
        return () => clearInterval(intervallId);


    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
   const iscontact=location.pathname === '/contact';
    const backgroundStyle = iscontact ? {} : { backgroundImage: `url(${backgroundImage || defBackImage[currentImage]})` };

    return (
        <div className={`all ${iscontact ? 'contact-page' : 'has-before'}`} style={backgroundStyle}>

            <div className='navbar'>
                <div className='navbar-brand'>
                    <GiDiamonds className="icon"/>
                    <h1>Lusso</h1>
                </div>
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/about">A propos</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
                <div className='navbar-buttons'>
                    {isAuthenticated ? (
                        <div className="user-menu">
                            <FaUserCircle className="user-icon" onClick={toggleLogout} />
                            {showLogout && (
                                <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/signup" className="nav-button">S'inscrire</Link>
                            <Link to="/login" className="nav-button1" onClick={handleLogin}>S'identifier</Link>
                        </>
                    )}
                    <Link to="/panier" className="panier-link">
                        <BsCart3 className="panier"/>
                        {cart.length > 0 && (
                            <div className="cart-count">
                                {cart.length}
                            </div>
                        )}
                    </Link>
                    <Link to="/favoris" className="favoris-link">
                        <MdOutlineFavoriteBorder className="favoris-icon"/>
                        {favoris.length > 0 &&(
                            <div className="cart-count">{favoris.length}</div>
                        )}
                    </Link>
                </div>
            </div>
            <section className="section" data-aos="fade-up" data-aos-delay="200">
                <h2>{title || deftitle}</h2>
                <p>{sentence || defsentence}</p>
                <button onClick={handleScroll} className="scroll-button">Désendre</button>
            </section>
        </div>
    );
};

export default Navbar;
