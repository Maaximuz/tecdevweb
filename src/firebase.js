import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDddtCarxf0xOnW50r1Kp9CiUhow3P0J60",
  authDomain: "somativa2-9670b.firebaseapp.com",
  projectId: "somativa2-9670b",
  storageBucket: "somativa2-9670b.appspot.com",
  messagingSenderId: "660310176105",
  appId: "1:660310176105:web:ee3eba908e0a60358c8df8",
  measurementId: "G-7E0QHV8QL6"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(app);

// Função para criar um novo usuário com e-mail e senha
const cadastrarUsuario = async (email, senha, nome, sobrenome, dataNascimentoFormatted) => {
  try {
    await auth.createUserWithEmailAndPassword(email, senha).then(async(data) => {
      const uid = data.user.uid;

      const users = firebase.firestore().collection('users');
      users.doc(uid).set({
        dataNascimento: dataNascimentoFormatted, nome: nome, sobrenome: sobrenome, uid: uid
      })
    });
    return true;
  } catch (error) {
    throw error;
  }
};

// Função para criar um novo usuário com e-mail e senha
const loginSistema = async (auth, email, password) => {
  try {
    const userData = await auth.signInWithEmailAndPassword(email, password).then(async (data) => {
      const uid = data.user.uid;
      const doc = await db.doc(`users/${uid}`).get();
      return doc.data();
    });
    return userData;
  } catch (error) {
    throw error;
  }
};

const getUserDataFromFirestore = async (uid) => {
  try {
    const userRef = firebase.firestore().collection('users');
    const userDoc = await firebase.firestore().getDoc(firebase.firestore().doc(userRef, uid));
    console.log('Dados do usuário:', userRef, userDoc);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('Dados do usuário:', userData);
      return userData;
    } else {
      console.log('Documento de usuário não encontrado.');
      throw new Error('Documento de usuário não encontrado.');
    }
  } catch (error) {
    // Registre o erro no console ou exiba uma mensagem de erro
    console.error('Erro ao obter dados do Firestore:', error.message);
    throw error; // Rethrow o erro para que o chamador possa lidar com ele
  }
}

export { app, auth, db, cadastrarUsuario, loginSistema, getUserDataFromFirestore };