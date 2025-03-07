import Logo from '../assets/Book-Tracking-logo.png';
import { Mail, Eye, Fingerprint, EyeOff, User, UploadCloud } from "lucide-react";
import {useState} from "react";
import {Link} from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file ? file.name : null);
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
                <img src={Logo} alt="logo" className="w-32 md:w-40 lg:w-48" />

                <h1 className="text-lg md:text-xl font-semibold">Register</h1>
                <p className="text-xs md:text-sm text-gray-500 text-center">
                    Already have an account?&nbsp;
                    <Link to="/sign_in" className="text-white">Sign In</Link>
                </p>

                <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                        <User size={20} />
                        <input type="text"
                               placeholder="Fullname"
                               className="bg-transparent border-0 w-full outline-none text-sm md:text-base" />
                    </div>

                    <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                        <User size={20} />
                        <input type="text"
                               placeholder="Username"
                               className="bg-transparent border-0 w-full outline-none text-sm md:text-base" />
                    </div>

                    <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                        {/*<Phone size={20} />*/}
                        <PhoneInput
                            country={'ph'}
                            enableSearch
                            placeholder="Contact Number"
                            pattern="[0-9]{10,15}"
                            inputClass="!bg-transparent !border-0 !w-full !outline-none !text-white !text-sm md:!text-base"
                            containerClass="!w-full"
                            buttonClass="!border-0 !bg-transparent hover:!bg-transparent focus:!bg-transparent"
                        />
                    </div>

                    <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                        <Mail size={20} />
                        <input type="email"
                               placeholder="Email"
                               className="bg-transparent border-0 w-full outline-none text-sm md:text-base" />
                    </div>

                    <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                        <Fingerprint size={20} />
                        <input type={showPassword ? "text" : "password"}
                               placeholder="Password"
                               className="bg-transparent border-0 w-full outline-none text-sm md:text-base" />

                        {showPassword ?
                            <EyeOff size={20} className="right-5 cursor-pointer" onClick={togglePasswordVisibility}/>
                            :
                            <Eye size={20} className="right-5 cursor-pointer" onClick={togglePasswordVisibility} />
                        }
                    </div>

                    <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                        <Fingerprint size={20} />
                        <input type={showConfirmPassword ? "text" : "password"}
                               placeholder="Confirm Password"
                               className="bg-transparent border-0 w-full outline-none text-sm md:text-base" />

                        {showConfirmPassword ?
                            <EyeOff size={20} className="right-5 cursor-pointer" onClick={toggleConfirmPasswordVisibility}/>
                            :
                            <Eye size={20} className="right-5 cursor-pointer" onClick={toggleConfirmPasswordVisibility} />
                        }
                    </div>

                    <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-2">
                        <UploadCloud size={20} />
                        <label
                            htmlFor="file-upload"
                            className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white cursor-pointer"
                        >
                            {avatar ? avatar : "Upload File"}
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>

                <button className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:to-blue-600 text-sm md:text-base">
                    Sign Up
                </button>

                <span className="pb-2"></span>
            </div>
        </div>
    )
}

export default Register;