import { useRef, useState, useEffect } from "react";
import validate from "../services/validateCredentials";
import {auth} from "../services/firebaseconfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getErrorMessage } from "../services/firebaseErrors";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/authSlice";
import { useNavigate } from "react-router";

const Login = () => {

    const logo = new URL("../assets/logo.png", import.meta.url).href;

    const [isSignup, setIsSignup] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const user = useSelector((state) => state?.user?.email);

    useEffect(() => {
    if (user) {
        navigate("/");
    }
    }, [user]);

    const handleSubmit = () => {
        const message = validate(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return;

        if(isSignup){
            // Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCred) => {
                    const user = userCred.user;

                    updateProfile(user, {
                        displayName: name.current.value,
                    })
                        .then(() => {
                            const {uid, email, displayName} = auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                })
                            )
                            navigate("/");
                        })
                        .catch((error) => {
                            setErrorMessage(error.code + " - " + error.message);
                        })
                })
                .catch((error) => {
                    const errorMsg = getErrorMessage(error.code);
                    setErrorMessage(errorMsg);
                });
        }
        else{
            // Login logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((user) => {
                    console.log(user);
                    const {uid, email, displayName} = auth.currentUser;
                    dispatch(
                        addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                        })
                    )
                    navigate("/");
                })
                .catch((error) => {
                    const errorMsg = getErrorMessage(error.code);
                    setErrorMessage(errorMsg);
                })
        }



    }

    const togglelogin = () => {
        setIsSignup(!isSignup);
    }

  return (
    <div>
        <div className="relative min-h-screen overflow-hidden">
            <div className="absolute w-screen bg-linear-to-b from-black flex justify-between px-8 py-4">
                <img src={logo} alt="logo-cineverse" className="w-28 sm:w-48"/>
            </div>
            <div className="absolute inset-0 -z-10">
                <img className="w-full h-full object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_large.jpg" alt="bg-img" />
            </div>
            <form 
                onSubmit={(e) => e.preventDefault()}
                className="w-10/12 sm:w-1/2 lg:w-3/12 bg-black/80 absolute text-white my-24 mx-auto right-0 left-0 p-8 rounded-lg"
            >
                {
                    isSignup ? (
                        <div>
                            <h1 className="text-2xl font-semibold py-4">Sign Up</h1>
                            <input ref={name} type="text" placeholder="Full Name" className="p-2 my-4 bg-gray-800 w-full rounded-xs"/>
                        </div>
                    ) : (
                        <h1 className="text-2xl font-semibold py-4">Sign In</h1>
                    )
                }
                <input ref={email} type="text" placeholder="Email" className="p-2 my-4 bg-gray-800 w-full rounded-xs"/>
                <input ref={password} type="text" placeholder="Password" className="p-2 my-4 bg-gray-800 w-full rounded-xs"/>

                <p className="text-red-500">{errorMessage}</p>
                
                <button 
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 my-4 rounded-lg w-full cursor-pointer"
                >
                    {
                        isSignup ? "Sign Up" : "Sign In"
                    }
                </button>
                <p className="py-4 px-4 cursor-pointer" onClick={togglelogin}>
                    {
                        isSignup ? "Already registered? Sign in now" : "New to Cineverse? Sign up now"
                    }
                </p>
                
            </form>
               
        </div>
    </div>
  )
}

export default Login;