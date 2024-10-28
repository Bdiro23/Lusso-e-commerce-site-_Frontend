import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Checkout.css';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
    const [subtotal, setSubtotal] = useState<number>(0);

    useEffect(() => {
        const storedSubtotal = localStorage.getItem('subtotal');
        if (storedSubtotal) {
            setSubtotal(parseFloat(storedSubtotal));
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            cardholder: '',
            postcode: '',
            cardnumber: '',
            exp: '',
            cvv: '',
        },
        validationSchema: Yup.object({
            cardholder: Yup.string().required('Ce champ doit etre rempli'),
            postcode: Yup.string().required('Ce champ doit etre rempli'),
            cardnumber: Yup.string().required('Ce champ doit etre rempli'),
            exp: Yup.string().required('Ce champ doit etre rempli'),
            cvv: Yup.string().required('Ce champ doit etre rempli'),
        }),
        onSubmit: (values) => {
            alert('c est bon!');
            console.log(values);
        },
    });

    const backgroundimg = "/Checkout_images/check.jpg";

    return (
        <div className="checkout-container" style={{backgroundImage: `url(${backgroundimg})`}}>
            <h2 className="checkout-title">Paiement</h2>
            <div className="checkout-content">
                <div className="checkout-card">
                    <div className="checkout-form-grid">
                        <div className="checkout-payment">
                            <h3 className="checkout-subheading">Choisissez votre méthode de paiement</h3>
                            <div className="checkout-payment-options">
                                <div className="checkout-payment-option">
                                    <input type="radio" className="checkout-radio" id="visa" name="payment" />
                                    <label htmlFor="visa" className="checkout-label">
                                        <img src="https://readymadeui.com/images/visa.webp" className="checkout-payment-img" alt="Visa" />
                                    </label>
                                </div>
                                <div className="checkout-payment-option">
                                    <input type="radio" className="checkout-radio" id="amex" name="payment" />
                                    <label htmlFor="amex" className="checkout-label">
                                        <img src="https://readymadeui.com/images/american-express.webp" className="checkout-payment-img" alt="American Express" />
                                    </label>
                                </div>
                                <div className="checkout-payment-option">
                                    <input type="radio" className="checkout-radio" id="mastercard" name="payment" />
                                    <label htmlFor="mastercard" className="checkout-label">
                                        <img src="https://readymadeui.com/images/master.webp" className="checkout-payment-img" alt="Mastercard" />
                                    </label>
                                </div>
                            </div>
                            <form className="checkout-form" onSubmit={formik.handleSubmit}>
                                <div className="checkout-input-grid">
                                    <input
                                        type="text"
                                        placeholder="Nom du titulaire de la carte"
                                        className="checkout-input"
                                        name="cardholder"
                                        value={formik.values.cardholder}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.cardholder && formik.errors.cardholder ? (
                                        <div className="checkout-input-error">{formik.errors.cardholder}</div>
                                    ) : null}
                                    <input
                                        type="number"
                                        placeholder="Code Postale"
                                        className="checkout-input"
                                        name="postcode"
                                        value={formik.values.postcode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.postcode && formik.errors.postcode ? (
                                        <div className="checkout-input-error">{formik.errors.postcode}</div>
                                    ) : null}
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Numéro de carte"
                                        className="checkout-input-full"
                                        name="cardnumber"
                                        value={formik.values.cardnumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.cardnumber && formik.errors.cardnumber ? (
                                        <div className="checkout-input-error">{formik.errors.cardnumber}</div>
                                    ) : null}
                                    <input
                                        type="number"
                                        placeholder="EXP."
                                        className="checkout-input"
                                        name="exp"
                                        value={formik.values.exp}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.exp && formik.errors.exp ? (
                                        <div className="checkout-input-error">{formik.errors.exp}</div>
                                    ) : null}
                                    <input
                                        type="number"
                                        placeholder="CVV"
                                        className="checkout-input"
                                        name="cvv"
                                        value={formik.values.cvv}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.cvv && formik.errors.cvv ? (
                                        <div className="checkout-input-error">{formik.errors.cvv}</div>
                                    ) : null}
                                </div>
                                <div className="checkout-summary">
                                    <h3 className="checkout-subheading">Résumé</h3>
                                    <ul className="checkout-summary-list">
                                        <li className="checkout-summary-item">
                                            Tax <span className="checkout-summary-price">2.99 €</span>
                                        </li>
                                        <hr/>
                                        <li className="checkout-summary-total">
                                            Total <p>{(subtotal + 2.99).toFixed(2)} €</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="checkout-actions">
                                    <Link to="/" className="checkout2-button">Pay later</Link>
                                    <button type="submit" className="checkout-submit">Submit</button>

                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
