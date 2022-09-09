import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

//Get Elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const logout = document.getElementById("logout");
const loginMsg = document.getElementById("loginMsg");
const routeMsg = document.getElementById("routeMsg");
const openRoute = document.getElementById("openRoute");
const authRoute = document.getElementById("authRoute");

const firebaseConfig = {
  // .
  // .
  // .
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize firebase authentication
const auth = getAuth(app);

//Login event
login.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("idToken", user.accessToken);
    })
    .catch((e) => {
      const errorCode = error.errorCode;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

//Sign up
signup.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.errorCode;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

//Logout
logout.addEventListener("click", () => {
  localStorage.removeItem("idToken");
  signOut(auth)
    .then(() => {
      console.log("Successfully signed out");
    })
    .catch((error) => {
      const errorCode = error.errorCode;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

//Login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    console.log("User is logged in");
    loginMsg.innerHTML = `Authentication Success`;
    email.style.display = "none";
    password.style.display = "none";
    logout.style.display = "inline";
    login.style.display = "none";
    signup.style.display = "none";
  } else {
    console.log("User is not logged in");
    loginMsg.innerHTML = "User is not logged in";
    email.style.display = "inline";
    password.style.display = "inline";
    logout.style.display = "none";
    login.style.display = "inline";
    signup.style.display = "inline";
  }
});

openRoute.addEventListener("click", async () => {
  const response = await fetch("/open");
  const text = await response.text();
  console.log("response:", response);
  routeMsg.innerHTML = text;
});

authRoute.addEventListener("click", async () => {
  const idToken = localStorage.getItem("idToken");
  try {
    const response = await fetch("/auth", {
      method: "GET",
      headers: {
        Authorization: idToken,
      },
    });
    const text = await response.text();
    console.log("response:", response);
    routeMsg.innerHTML = text;
  } catch (error) {
    console.log(error);
  }
});
