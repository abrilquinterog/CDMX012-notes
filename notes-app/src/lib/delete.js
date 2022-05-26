import { db } from "./firebaseConfig"
import { doc, deleteDoc } from "firebase/firestore"

export const deletePost = async (id) => {
 const userDoc = doc(db,"notes", id);
 await deleteDoc(userDoc);
}

