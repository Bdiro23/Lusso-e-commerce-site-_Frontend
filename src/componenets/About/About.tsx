import React, {useEffect, useRef} from 'react';
import './About.css';
import Navbar from "../Navbar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";
 import "aos/dist/aos.css";




const About: React.FC = () => {
    const title='À propos de nous';
    const sentence='Chez Lusso, chaque produit est conçu pour allier élégance et exclusivité, afin de vous offrir une expérience unique de luxe au quotidien.';
    const Image='/About_images/sacabout.jpg'

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);
    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    return (
        <div>
            <Navbar backgroundImage={Image} title={title} sentence={sentence}  />
            <div className="about-container">
                <div className="about-content">
                    <div className="first-container" data-aos="fade-up" data-aos-delay="200">
                        <h2 className="title_about" data-aos="fade-up" data-aos-delay="200">Nous sommes là pour sublimer
                            votre style avec élégance et authenticité.</h2>
                        <div className="about-description">
                            <p className="first_paragraph" data-aos="fade-up" data-aos-delay="200">Bienvenue chez Lusso,
                                où la mode devient un art de vivre. Notre passion est de vendre des
                                vêtements qui racontent votre histoire et subliment chaque instant de votre vie. Que
                                vous
                                soyez à la recherche de pièces tendances ou de classiques intemporels, nous avons ce
                                qu’il vous faut.</p>

                            <p className="first_paragraph" data-aos="fade-up" data-aos-delay="200">Inspirés par les
                                dernières tendances internationales et ancrés dans un savoir-faire artisanal, nous
                                concevons chaque collection avec une attention particulière aux détails. Nous offrons
                                une large gamme de vêtements qui s’adaptent à chaque occasion, des tenues décontractées
                                aux pièces élégantes pour des moments spéciaux.</p>
                        </div>
                    </div>
                    <img src="/About_images/about2.jpg" className="img_about1" alt="about_femme" data-aos="fade-down"
                         data-aos-delay="200"/>
                </div>

                <div className="about-content">
                    <img src="/About_images/about8.jpg" alt="about5" className="img_about2" data-aos="fade-up" data-aos-delay="200"/>
                    <div className="about-description2" data-aos="fade-up" data-aos-delay="200">
                        <p>Lusso se distingue par une sélection de vêtements qui inspire confiance et authenticité. Nos collections sont le reflet d’une mode accessible, éthique et pensée pour vous. Parce que chaque détail compte, nous nous engageons à offrir des créations qui sont à la fois élégantes et respectueuses de l’environnement.</p>
                        <p>Nous croyons que la mode est une expression personnelle. C’est pourquoi nous mettons un point d’honneur à vous proposer des tenues qui s'adaptent à votre style unique, quelles que soient les tendances du moment. Laissez-nous vous accompagner dans votre aventure mode, jour après jour.</p>
                        <p>Notre passion pour la mode nous pousse à sélectionner des pièces qui allient qualité, confort et tendance. Nous croyons que chaque détail compte et nous nous engageons à vous offrir le meilleur.</p>
                        <video src="/About_images/jaune.mp4" width="780" height="450"  className="video" muted style={{
                            outline: 'none',
                            objectFit: 'cover'
                        }}
                               autoPlay  ref={videoRef} onMouseEnter={handleMouseEnter}></video>
                    </div>

                </div>
                <Footer/>
            </div>

        </div>
    );
};

export default About;
