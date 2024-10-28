import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Login/Login.css';
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from 'react';
import axios from 'axios';
import {apiUrl} from "../../Utils/Helpers.tsx";
import {useNavigate} from "react-router-dom";

interface SignupFormValues {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}



export default function Signup(): React.ReactElement {
    const signupValidationSchema = Yup.object({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

   // const [isRegistred, setIsRegistred] = useState(false);

    const navigate=useNavigate();


    const signupFormik = useFormik<SignupFormValues>({
        initialValues: { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' },
        validationSchema: signupValidationSchema,
        onSubmit: async (values: SignupFormValues) => {
            try {
                const response = await axios.post(`${apiUrl}/user-register`, values, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Signup successful:', response.data);
                signupFormik.resetForm();
                navigate('/login');
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Signup error:', error.response?.data || error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);



    const background= "/Login_images/signup.jpg";

    return (
        <>
            <div className="login-container" data-aos="fade-up" style={{backgroundImage:`url(${background})`}}>
                <div className="login-box" data-aos="fade-up">
                    <h2 data-aos="fade-down" className="login-title">S'inscrire</h2>
                    <form onSubmit={signupFormik.handleSubmit}>
                        <div className="input-group" data-aos="fade-up">
                            <label htmlFor="firstname" className="input-label">Nom<span className="required">*</span></label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                className="input-field"
                                value={signupFormik.values.firstname}
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                aria-label="First Name"
                            />
                            {signupFormik.touched.firstname && signupFormik.errors.firstname ? (
                                <div className="input-error">{signupFormik.errors.firstname}</div>
                            ) : null}
                        </div>
                        <div className="input-group" data-aos="fade-up">
                            <label htmlFor="lastname" className="input-label">Prénom<span className="required">*</span></label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="input-field"
                                value={signupFormik.values.lastname}
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                aria-label="Last Name"
                            />
                            {signupFormik.touched.lastname && signupFormik.errors.lastname ? (
                                <div className="input-error">{signupFormik.errors.lastname}</div>
                            ) : null}
                        </div>
                        <div className="input-group" data-aos="fade-up">
                            <label htmlFor="email" className="input-label">Email<span className="required">*</span></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="input-field"
                                value={signupFormik.values.email}
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                aria-label="Email"
                            />
                            {signupFormik.touched.email && signupFormik.errors.email ? (
                                <div className="input-error">{signupFormik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="input-group" data-aos="fade-up">
                            <label htmlFor="password" className="input-label">Mot de passe<span className="required">*</span></label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input-field"
                                value={signupFormik.values.password}
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                aria-label="Password"
                            />
                            {signupFormik.touched.password && signupFormik.errors.password ? (
                                <div className="input-error">{signupFormik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="input-group" data-aos="fade-up">
                            <label htmlFor="confirmPassword" className="input-label">Confirme Mot de passe<span className="required">*</span></label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="input-field"
                                value={signupFormik.values.confirmPassword}
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                aria-label="Confirm Password"
                            />
                            {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword ? (
                                <div className="input-error">{signupFormik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                        <button type="submit" className="login-button" data-aos="zoom-in">
                            s'inscrire
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
