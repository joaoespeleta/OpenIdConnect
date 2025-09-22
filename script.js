import { signUpUser, signInUser, signInWithGoogle } from "./firebaseauth.js";

const signUpContainer = document.getElementById("signup");
const signInContainer = document.getElementById("signIn");

document.getElementById("signUpButton").addEventListener("click", () => {
  signInContainer.style.display = "none";
  signUpContainer.style.display = "block";
});

document.getElementById("signInButton").addEventListener("click", () => {
  signUpContainer.style.display = "none";
  signInContainer.style.display = "block";
});

// Cadastro
document.getElementById("submitSignUp").addEventListener("click", () => {
  const firstName = document.getElementById("fName").value.trim();
  const lastName = document.getElementById("lName").value.trim();
  const email = document.getElementById("rEmail").value.trim();
  const password = document.getElementById("rPassword").value.trim();
  const photoFile = document.getElementById("profilePhoto").files[0];

  let photoBase64;

  if (!firstName || !lastName || !email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  if (photoFile) {
    const reader = new FileReader();

    reader.onload = (ev) => {
        signUpUser(firstName, lastName, email, password, ev.target.result);
    }

    reader.readAsDataURL(photoFile)
    return;
  }
  
  signUpUser(firstName, lastName, email, password, photoBase64);
  
});

// Login Normal
document.getElementById("submitSignIn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  signInUser(email, password);
});

// Login Google
document.getElementById("googleLoginBtn").addEventListener("click", () => {
  signInWithGoogle();
});
