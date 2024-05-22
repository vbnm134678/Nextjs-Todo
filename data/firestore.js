import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// 모든 할일 가져오기
export async function fetchTodos() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const fetchedTodos = [];

  if (querySnapshot.empty) {
    return [];
  }

  querySnapshot.forEach((doc) => {
    const aTodo = {
      id: doc.id,
      title: doc.data()["title"],
      is_done: doc.data()["is_done"],
      created_at: doc.data()["created_at"].toDate(),
      // .toLocaleTimeString('ko') - 한국 시간으로 표현
    };
    fetchedTodos.push(aTodo);
  });

  return fetchedTodos;
}

// 할일 추가
export async function addTodos({ title }) {
  const newTodoRef = doc(collection(db, "todos"));
  const createdAtTimestamp = Timestamp.fromDate(new Date());
  const newTodoData = {
    id: newTodoRef.id,
    title: title,
    is_done: false,
    created_at: createdAtTimestamp,
  };

  await setDoc(newTodoRef, newTodoData);

  return newTodoData;
}

export default { fetchTodos, addTodos };
