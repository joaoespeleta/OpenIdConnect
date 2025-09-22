// firebaseauth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {getFirestore, setDoc, doc, getDoc} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

// --- Config Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyCPWC4oGYk1wKUd0pMrPGWKSYFv5GfKXus",
  authDomain: "autenticacao-712a3.firebaseapp.com",
  projectId: "autenticacao-712a3",
  storageBucket: "autenticacao-712a3.appspot.com",
  messagingSenderId: "864513546164",
  appId: "1:864513546164:web:ac434f7184ce136ca784e1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- Função de mensagens ---
export function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  if (!messageDiv) return;
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => (messageDiv.style.opacity = 0), 5000);
}

// --- Cadastro ---
export async function signUpUser(firstName, lastName, email, password, photoBase64) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Cria documento no Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      firstName,
      lastName,
      photoURL: photoBase64 ?? null
    });

    localStorage.setItem("loggedInUserId", user.uid);
    showMessage("Conta criada com sucesso", "signUpMessage");
    window.location.href = "homepage.html";

  } catch (error) {
    console.error(error);
    if (error.code === "auth/email-already-in-use") {
      showMessage("Endereço de email já existe", "signUpMessage");
    } else {
      showMessage(`Não foi possível criar usuário: ${error.message}`, "signUpMessage");
    }
  }
}

// --- Login Normal ---
export async function signInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem("loggedInUserId", user.uid);
    showMessage("Usuário logado com sucesso", "signInMessage");
    window.location.href = "homepage.html";
  } catch (error) {
    console.error(error);
    showMessage("Email ou senha incorretos", "signInMessage");
  }
}

// --- Login Google ---
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("loggedInUserId", user.uid);

    // Cria ou atualiza documento no Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email || "",
      firstName: user.displayName ? user.displayName.split(" ")[0] : "",
      lastName: user.displayName ? user.displayName.split(" ").slice(1).join(" ") : "",
      photoURL: user.photoURL || ""
    }, { merge: true });

    window.location.href = "homepage.html";

  } catch (error) {
    console.error(error);
    showMessage(`Não foi possível entrar com Google: ${error.message}`, "signUpMessage");
  }
}

// --- Monitorar estado do usuário e preencher dados ---
export function monitorAuthState(displayElements = {}) {
  onAuthStateChanged(auth, async () => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (!loggedInUserId) return;

    try {
      const docRef = doc(db, "users", loggedInUserId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (displayElements.firstName) displayElements.firstName.innerText = data.firstName;
        if (displayElements.lastName) displayElements.lastName.innerText = data.lastName;
        if (displayElements.email) displayElements.email.innerText = data.email;
        if (displayElements.photo && data.photoURL) displayElements.photo.src = data.photoURL;
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  });
}

// --- Logout ---
export function logoutUser() {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => window.location.href = "index.html")
    .catch(error => console.error("Erro ao fazer logout:", error));
}
