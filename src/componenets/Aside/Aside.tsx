import './Aside.css'
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
import {Link} from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import {useEffect} from "react";
export default function Aside():React.ReactElement{

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);



    return(
        <div>
            <div className="Aside" >
                <img src="/Aside_images/adidaslemon.jpg" className="image_aside" alt="shoes1" data-aos="fade-up" data-aos-delay="200"/>
                <div className="sous-Aside" data-aos="fade-down" data-aos-delay="200">
                    <h2 className="title-aside">Nouveautés en chaussures</h2>
                    <p className="p-aside">Découvrez des modèles soigneusement conçus, inspirés des dernières tendances modernes, qui combinent à la perfection l'élégance et le confort. Nos collections offrent des looks raffinés, idéals pour s'adapter à toutes les occasions, que ce soit pour une journée décontractée ou un événement spécial</p>
                    <div className="sous-Aside2" >
                        <Link to="/products/4" className="link-aside">Découvrir nos chaussures</Link>
                        <FaArrowRightLong className='icon-arrow'/>
                    </div>
                </div>
                <img src="/Aside_images/chic.jpg" className="image_chic" alt="shoes2" data-aos="fade-up" data-aos-delay="300"/>
            </div>
            <div className="collection_image">
                <img src="/Aside_images/manquis1.jpg" alt="manquin1" className="manqui" data-aos="fade-up" data-aos-delay="200"/>
                <img src="/Aside_images/manquis2.jpg" alt="manquin2" className="manqui" data-aos="fade-up" data-aos-delay="200"/>
                <img src="/Aside_images/manquis3.jpg" alt="manquin3" className="manqui" data-aos="fade-up" data-aos-delay="200"/>
                <img src="/Aside_images/manquis4.jpg" alt="manquin4" className="manqui" data-aos="fade-up" data-aos-delay="200"/>
                <img src="/Aside_images/manquis5.jpg" alt="manquin5" className="manqui" data-aos="fade-up" data-aos-delay="200"/>
                <img src="/Aside_images/manquis6.jpg" alt="manquin6" className="manqui" data-aos="fade-up" data-aos-delay="200"/>
            </div>

            <div className="AsideP">
                <img src="/Aside_images/parfumAside.jpg" alt="parfum1" data-aos="fade-up" data-aos-delay="300" className="imageP2"/>
                <div className="sous-Aside" data-aos="fade-down" data-aos-delay="200">
                    <h2 className="title-aside">L'art du parfum : élégance et émotion</h2>
                    <p className="p-aside">Découvrez des parfums qui éveillent vos sens et vous transportent dans un univers olfactif unique. Chaque fragrance est soigneusement conçue pour refléter des émotions et des souvenirs, en alliant des notes subtiles et audacieuses</p>
                    <div className="sous-AsideP">
                        <Link to="/products/1" className="link-asideP">Plongez maintenant</Link>
                        <FaArrowRightLong className='icon-arrowP'/>
                    </div>
                </div>
                <img src="/Aside_images/dc.jpg" alt="dc" className="imageP1" data-aos="fade-up" data-aos-delay="300"/>
            </div>
            <div className="AsideL">
                <img src="/Aside_images/lunettehAside.jpg" alt="parfum1" data-aos="fade-up" data-aos-delay="300"
                     className="imageP2"/>
                <div className="sous-Aside" data-aos="fade-down" data-aos-delay="200">
                    <h2 className="title-aside">Élégance et vision</h2>
                    <p className="p-aside">le style réinventé Découvrez des lunettes qui allient sophistication et confort, créées pour éveiller vos sens et sublimer votre regard. Chaque monture est conçue avec soin pour exprimer à la fois votre personnalité et votre élégance, en mêlant des détails subtils à des touches audacieuses.</p>
                    <div className="sous-AsideP">
                        <Link to="/products/5" className="link-asideP">Plongez maintenant</Link>
                        <FaArrowRightLong className='icon-arrowP'/>
                    </div>
                </div>
                <img src="/Aside_images/lunettefAside.jpg" alt="dc" className="imageP1" data-aos="fade-up" data-aos-delay="300"/>
            </div>

        </div>
    )
}