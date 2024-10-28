import { Link } from 'react-router-dom';
import './Footer.css';
import { MdOutlineFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer:React.FC = () => {
    return (
        <footer className="footer" data-aos="fade-up" data-aos-delay="200">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Liens rapides</h3>
                    <ul className="links">
                        <Link  className="link" to="/shop">shop</Link>
                        <Link  className="link" to="/about">A propos</Link>
                        <Link  className="link" to="/contact">Contact</Link>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contactez-nous</h3>
                    <ul className='links2'>
                        <li> info@losso.com</li>
                        <li> +212604078600</li>
                        <li> 124 Hay Riadh, Rabat, Maroc</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>suivez-nous</h3>
                    <ul className="social-links">
                        <li><a href="https://facebook.com"><i className="fab fa-facebook-f"><MdOutlineFacebook/></i> Facebook</a></li>
                        <li><a href="https://instagram.com"><i className="fab fa-instagram"> <FaInstagram/></i> Instagram</a></li>
                        <li><a href="https://twitter.com"><i className="fab fa-twitter"><FaXTwitter/></i> X</a></li>
                    </ul>
                </div>


                <div className="footer-section">
                    <h3>Newsletter</h3>
                    <p>Inscrivez-vous </p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Votre Email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Votre boutique. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
