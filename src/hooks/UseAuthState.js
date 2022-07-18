import { useState,useEffect } from "react";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import React from 'react'

const useAuthState = () => {
    const [loggedin,setLoggedin]=useState(false)
    const [checkState,setCheckState]=useState(true)
    useEffect(()=>{
        const auth=getAuth()
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLoggedin(true)
            }
            setCheckState(false)
        })
    })
  return {loggedin,checkState};
}

export default useAuthState