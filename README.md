# Sistema de Autenticação com Firebase

![Firebase](https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge\&logo=firebase\&logoColor=white)

Este projeto implementa um sistema de autenticação de usuários utilizando **Firebase Authentication**, **Firestore** e **Firebase Storage**, com login via formulário próprio (e-mail e senha) e login com Google.

---

## Funcionalidades

1. **Cadastro com E-mail e Senha**

   * Usuário preenche formulário com nome, sobrenome, e-mail, senha e foto opcional.
   * `signUpUser` cria a conta no Firebase Authentication.
   * Foto enviada para Firebase Storage e URL salva no Firestore.
   * UID do usuário é salvo no `localStorage` e usuário é redirecionado para `homepage.html`.

2. **Login com E-mail e Senha**

   * `signInUser` autentica usuário com Firebase Authentication.
   * UID salvo no `localStorage` e usuário redirecionado para `homepage.html`.

3. **Login com Google**

   * `signInWithGoogle` autentica usuário via Google com Firebase Authentication.
   * Dados do usuário (nome, sobrenome, email, foto) são criados ou atualizados no Firestore.
   * UID salvo no `localStorage` e usuário redirecionado para `homepage.html`.

4. **Monitoramento de Sessão e Logout**

   * `monitorAuthState` busca dados do Firestore para exibir na interface se usuário autenticado.
   * `logoutUser` remove UID do `localStorage` e realiza logout, redirecionando para página de login.

---

## Estrutura do Projeto

```
/project-root
│
├─ index.html          # Página de login e cadastro
├─ homepage.html       # Página após login
├─ style.css           # Estilo das páginas
├─ script.js           # Script principal de interação com formulários
├─ firebaseauth.js     # Métodos de autenticação e Firestore
└─ README.md           # Documentação do projeto
```

---

## Tecnologias Utilizadas

* Firebase Authentication (E-mail/Senha e Google)
* Firebase Firestore
* Firebase Storage
* HTML, CSS e JavaScript ES Modules

---

## Observações

* Login via Google já cria/atualiza corretamente o documento no Firestore.
* No login via formulário próprio, garanta que todos os campos estejam preenchidos, senha com mínimo de caracteres e e-mail não cadastrado.
* Fotos de perfil são armazenadas no Firebase Storage e URLs são salvos no Firestore.

---

## Setup

1. Clonar o repositório.
2. Configurar o Firebase e substituir as credenciais no arquivo `firebaseauth.js`.
3. Abrir `index.html` em um servidor local ou deploy.
4. Testar cadastro, login e logout.

---

**Autor:** João Pedro Espeleta
