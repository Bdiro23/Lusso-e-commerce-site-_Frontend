import Navbar from "../Navbar/Navbar";
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Footer from "../Footer/Footer";
import axios from 'axios';
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';
import {apiUrl} from "../../Utils/Helpers.tsx";

interface ContactFormValues {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const Contact: React.FC = () => {
    const contactValidationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Adresse e-mail invalide').required('L\'email est requis'),
        phone: Yup.string().required('Le numéro de téléphone est requis'),
        message: Yup.string().required('Le message est requis'),
    });

    const formik = useFormik<ContactFormValues>({
        initialValues: { name: '', email: '', phone: '', message: '' },
        validationSchema: contactValidationSchema,
        onSubmit: async (values: ContactFormValues) => {
            try {
                const response = await axios.post(`${apiUrl}/contact`, values);

                if (response.status === 201) {
                    alert('Votre message a été envoyé avec succès !');
                    formik.resetForm();
                }
            } catch (error: any) {
                if (error.response && error.response.data.errors) {
                    alert('Erreur lors de l\'envoi : ' + error.response.data.errors.join(', '));
                } else {
                    alert('Erreur lors de l\'envoi. Veuillez réessayer plus tard.');
                }
            }
        },
    });

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const bgImage1: string = '/Contact_images/contact.jpg';
    const titre: string = 'Restons Connectés';
    const paragraphe: string = 'Pour toute question ou suggestion, n\'hésitez pas à nous contacter. Nous sommes là pour vous aider !';

    return (
        <>
            <div className="allcon" style={{ backgroundImage: `url(${bgImage1})` }}>
                <Navbar title={titre} sentence={paragraphe} />

                <div className="contact-form-container" data-aos="fade-up">
                    <h2 className="contact_title" data-aos="fade-down">Contactez-nous</h2>
                    <form onSubmit={formik.handleSubmit} className="contact-form" data-aos="fade-up">
                        <div className="field-wrap">
                            <label htmlFor="name">Nom<span className="req">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="error">{formik.errors.name}</div>
                            ) : null}
                        </div>

                        <div className="field-wrap">
                            <label htmlFor="email">Email<span className="req">*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="field-wrap">
                            <label htmlFor="phone">Téléphone<span className="req">*</span></label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="error">{formik.errors.phone}</div>
                            ) : null}
                        </div>

                        <div className="field-wrap">
                            <label htmlFor="message">Message<span className="req">*</span></label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.message && formik.errors.message ? (
                                <div className="error">{formik.errors.message}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="button-b" data-aos="zoom-in">
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
