import Logo from '../assets/Book-Tracking-logo.png';
import { Mail, Eye, Fingerprint, EyeOff } from "lucide-react";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { validateEmail, validatePassword } from "../utilities/validations.js";
import { loginAPI } from '../apis/authentication.js';
import useAuth from "../hooks/useAuth";

import Gmail from '/gmail-logo.svg';
import Facebook from '/fb-logo.svg';

const InitialErrorState = {
    email: '',
    password: [],
    api: ''
}

const Login = () => {
    const { user, handleAuth } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(InitialErrorState);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value
        setEmail(inputEmail)

        const errorMessage = validateEmail(inputEmail);
        setErrors({ ...errors, email: errorMessage });
    }

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value
        setPassword(inputPassword)

        const validationErrors = validatePassword(inputPassword);
        setErrors({
            ...errors,
            password: validationErrors
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password)
        };

        setErrors(newErrors);

        // Ensure there are no errors before making API request
        if (Object.values(newErrors).some(error => Array.isArray(error) ? error.length > 0 : Boolean(error))) {
            console.log("Form has errors:", newErrors);
            return;
        }

        // Call Register API
        await handleAuth(loginAPI, {user: {email, password}}, setErrors)
    }
    
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
                <img src={Logo} alt="logo" className="w-32 md:w-40 lg:w-48" />

                <h1 className="text-lg md:text-xl font-semibold">Welcome Back</h1>
                <p className="text-xs md:text-sm text-gray-500 text-center">
                    Don't have an account?&nbsp;
                    <Link to="/sign_up" className="text-white">Sign Up</Link>
                </p>

                {errors.api &&
                    <p className="italic text-sm ">
                        <span className="text-red-600">{errors.api}</span>
                    </p>
                }

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                            <Mail size={20} />
                            <input name="email"
                                   type="email"
                                   placeholder="Input your email address"
                                   className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
                                   value={email ?? ""}
                                   onChange={handleEmailChange}
                            />
                        </div>
                        {errors.email &&
                            <li className="italic text-sm ">
                                <span className="text-red-600">{errors.email}</span>
                            </li>
                        }


                        <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                            <Fingerprint size={20} />
                            <input name="password"
                                   type={showPassword ? "text" : "password"}
                                   placeholder="Input your password"
                                   className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
                                   value={password ?? ""}
                                   onChange={handlePasswordChange}
                            />

                            {showPassword ?
                                <EyeOff size={20} className="right-5 cursor-pointer" onClick={togglePasswordVisibility}/>
                                :
                                <Eye size={20} className="right-5 cursor-pointer" onClick={togglePasswordVisibility} />
                            }
                        </div>

                        {errors.password.length > 0 && (
                            <div>
                                {errors.password.map((error, index) => (
                                    <li className="italic text-sm" key={index}>
                                        <span className="text-red-600">{error}</span>
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit"
                            className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:to-blue-600 text-sm md:text-base">
                        Login
                    </button>
                </form>

                <div className="flex items-center my-1 w-full">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="mx-3 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <div className="relative w-full flex items-center justify-between pb-2 gap-2">
                    <button className="w-full p-2 bg-red-500 rounded-xl mt-3 hover:to-blue-600 text-sm md:text-base">
                        <span className="flex justify-center items-center gap-2">
                            <img src={Gmail} width="20px" className="text-lg md:text-xl" />
                            Gmail
                        </span>
                    </button>
                    <button className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:to-blue-600 text-sm md:text-base">
                        <span className="flex justify-center items-center gap-2">
                            <img src={Facebook} width="20px" className="text-lg md:text-xl" />
                            Facebook
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;