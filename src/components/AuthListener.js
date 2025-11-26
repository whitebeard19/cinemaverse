import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../store/authSlice';
import { auth } from "../services/firebaseconfig";

const AuthListener = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                const {uid, email, displayName} = user;
                dispatch(addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                }));
            }
            else {
                dispatch(removeUser());
            }
        });

        return () => unsubscribe();
    }, [])

  return null;
};

export default AuthListener;