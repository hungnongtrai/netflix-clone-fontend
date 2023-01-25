import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA1kAK51bVe5zTNIz0P7MMmoL5aO7UfacU",
  authDomain: "react-netflix-clone-83210.firebaseapp.com",
  projectId: "react-netflix-clone-83210",
  storageBucket: "react-netflix-clone-83210.appspot.com",
  messagingSenderId: "689268677617",
  appId: "1:689268677617:web:0952619a584aacea524250",
  measurementId: "G-W5TE03SNJG",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
