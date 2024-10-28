import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Login.css';
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {apiUrl} from "../../Utils/Helpers.tsx";
import {useNavigate} from "react-router-dom";

interface LoginFormValues {
    email: string;
    password: string;
}

 export default function Login(): React.ReactElement {

    const loginValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email est obligatoire'),
        password: Yup.string().required('Mot de passe est obligatoire'),
    });

    const navigate= useNavigate();
    const [token,setToken] = useState<string>(()=>{
        const storedToken = localStorage.getItem('token');
        return storedToken ? JSON.parse(storedToken) : [];
    });

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    const loginFormik = useFormik<LoginFormValues>({
        initialValues: { email: '', password: '' },
        validationSchema: loginValidationSchema,
        onSubmit: async (values: LoginFormValues) => {
            try {
                const response = await axios.post(`${apiUrl}/login`, values, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Login successful:', response.data);
                navigate('/');

                const userResponse = await axios.get(`${apiUrl}/me`, {
                    headers: {
                        'Authorization': `Bearer ${response.data.token}`,
                    },
                });

                console.log('User data:', userResponse.data);
                setToken(response.data.token)

                loginFormik.resetForm();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Login error:', error.response?.data || error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        alert('Forgot password clicked');

    };

    const background= "/Login_images/login1.jpg";

    return (
        <>
            <div className="login-container" data-aos="fade-up" style={{backgroundImage:`url(${background})`}}>
                <div className="login-box" data-aos="fade-up">
                    <h2 data-aos="fade-down" className="login-title">S'identifier</h2>
                    <form onSubmit={loginFormik.handleSubmit}>
                        <div className="input-group" data-aos="fade-up">
                            <label htmlFor="email" className="input-label">Email<span className="required">*</span></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="input-field"
                                value={loginFormik.values.email}
                                onChange={loginFormik.handleChange}
                                onBlur={loginFormik.handleBlur}
                                aria-label="Email"
                            />
                            {loginFormik.touched.email && loginFormik.errors.email ? (
                                <div className="input-error">{loginFormik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="input-group" data-aos="fade-up">
                            <label htmlFor="password" className="input-label">Mot de passe<span className="required">*</span></label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input-field"
                                value={loginFormik.values.password}
                                onChange={loginFormik.handleChange}
                                onBlur={loginFormik.handleBlur}
                                aria-label="Password"
                            />
                            {loginFormik.touched.password && loginFormik.errors.password ? (
                                <div className="input-error">{loginFormik.errors.password}</div>
                            ) : null}
                        </div>

                        <p className="forgot-password" data-aos="fade-up">
                            <a onClick={handleForgotPassword} href="#">Mot de passe oublier?</a>
                        </p>

                        <button type="submit" className="login-button" data-aos="zoom-in">
                            s'identifier
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
