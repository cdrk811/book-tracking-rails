import Logo from '../assets/Book-Tracking-logo.png';
import { Mail, Eye, Fingerprint, EyeOff, User } from "lucide-react";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateUsername, validateEmail, validatePassword } from "../utilities/validations.js";
import { registerAPI } from '../apis/authentication.js';

const InitialErrorState = {
    username: '',
    email: '',
    password: [],
    confirmPassword: '',
    api: ''
}

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState(InitialErrorState);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleUsernameChange = (e) => {
        const inputUsername = e.target.value;
        setUsername(inputUsername);

        setErrors({
            ...errors,
            username: validateUsername(inputUsername)
        });
    };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value.trim()
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
            password: validationErrors,
            confirmPassword: confirmPassword && confirmPassword !== inputPassword
                ? "Passwords do not match"
                : ""
        });
    }

    const handleConfirmPasswordChange = (e) => {
        const inputConfirmPassword = e.target.value;
        setConfirmPassword(inputConfirmPassword);

        setErrors({
            ...errors,
            confirmPassword: inputConfirmPassword !== password
                ? "Passwords do not match"
                : ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            email: validateEmail(email),
            username: validateUsername(username) || "",
            password: validatePassword(password),
            confirmPassword: confirmPassword !== password ? "Passwords do not match" : ""
        };

        setErrors(newErrors);

        // Ensure there are no errors before making API request
        if (Object.values(newErrors).some(error => Array.isArray(error) ? error.length > 0 : Boolean(error))) {
            console.log("Form has errors:", newErrors);
            return;
        }

        // Call Register API
        const [result, error] = await registerAPI({
            user: { username, email, password }
        });

        console.log('Result:', result)

        if (error) {
            setErrors({ ...errors, api: error });
        } else {
            const message = result.message;
            const data = result.data;

            navigate('/');
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
                <img src={Logo} alt="logo" className="w-32 md:w-40 lg:w-48" />

                <h1 className="text-lg md:text-xl font-semibold">Register</h1>
                <p className="text-xs md:text-sm text-gray-500 text-center">
                    Already have an account?&nbsp;
                    <Link to="/sign_in" className="text-white">Sign In</Link>
                </p>

                {errors.api &&
                    <li className="italic text-sm ">
                        <span className="text-red-600">{errors.api}</span>
                    </li>
                }

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                            <User size={20} />
                            <input name="username"
                                   type="text"
                                   placeholder="Username"
                                   className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
                                   value={username}
                                   onChange={handleUsernameChange}
                            />
                        </div>
                        {errors.username &&
                            <li className="italic text-sm ">
                                <span className="text-red-600">{errors.username}</span>
                            </li>
                        }

                        <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                            <Mail size={20} />
                            <input name="email"
                                   type="email"
                                   placeholder="Email"
                                   className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
                                   value={email ?? ""}
                                   onChange={handleEmailChange}
                            />
                        </div>
                        {errors.email &&
                            <li className="italic text-sm">
                                <span className="text-red-600">{errors.email}</span>
                            </li>
                        }

                        <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                            <Fingerprint size={20} />
                            <input name="password"
                                   type={showPassword ? "text" : "password"}
                                   placeholder="Password"
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

                        <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                            <Fingerprint size={20} />
                            <input name="confirm-password"
                                   type={showConfirmPassword ? "text" : "password"}
                                   placeholder="Confirm Password"
                                   className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
                                   value={confirmPassword ?? ""}
                                   onChange={handleConfirmPasswordChange}
                            />

                            {showConfirmPassword ?
                                <EyeOff size={20} className="right-5 cursor-pointer" onClick={toggleConfirmPasswordVisibility}/>
                                :
                                <Eye size={20} className="right-5 cursor-pointer" onClick={toggleConfirmPasswordVisibility} />
                            }
                        </div>
                        {errors.confirmPassword &&
                            <li className="italic text-sm ">
                                <span className="text-red-600">{errors.confirmPassword}</span>
                            </li>
                        }
                    </div>

                    <button type="submit"
                            className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:to-blue-600 text-sm md:text-base">
                        Sign Up
                    </button>
                </form>

                <span className="pb-2"></span>
            </div>
        </div>
    )
}

export default Register;