import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import firebaseConfig from "./firebase.Config";

const firebaseApp =initializeApp(firebaseConfig);

const db= getFirestore(firebaseApp);

export {db};
 