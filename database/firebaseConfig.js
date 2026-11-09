import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // NUEVO: Importar autenticación

const firebaseConfig = {
  apiKey: "AIzaSyCuIGVenXl9k9VldOh_JNabvvhFg9FHH8k",
  authDomain: "tuconsumobd.firebaseapp.com",
  databaseURL: "https://tuconsumobd-default-rtdb.firebaseio.com",
  projectId: "tuconsumobd",
  storageBucket: "tuconsumobd.firebasestorage.app",
  messagingSenderId: "488736738886",
  appId: "1:488736738886:web:123d1e37d9ceb31c4ec447",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app); // NUEVO: Exportar auth para usarlo en el login