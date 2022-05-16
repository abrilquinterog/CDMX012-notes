import { useState, useEffect} from "react"
import { db } from "./firebaseConfig"
import { collection, getDocs, addDoc } from "firebase/firestore"




export const SaveNotes = () => {

const [newTittle, setNewTittle]= useState ("");
const [newDescription, setNewDescription]= useState ("");

const [notes, setNotes] = useState([]);
const notesCollectionRef = collection(db, "notes")

const createNote = async () =>{
 await addDoc(notesCollectionRef,{ tittle: newTittle, description: newDescription});
};

useEffect(() => {

    const getNotes = async () => {
         const data= await getDocs(notesCollectionRef);
         setNotes(data.docs.map((doc) =>({...doc.data(), id: doc.id} )));

    }

    getNotes()


}, [])

return (
<>
<div>
<form className='inputs'>
    <input className='tittle02' placeholder='Tittle'onChange={(event)=>{setNewTittle(event.target.value);
    }}></input>
    <textarea className='writeNote02' placeholder='Write your note'onChange={(event)=>{setNewDescription(event.target.value);
    }}></textarea>
    </form>
    <button onClick={createNote}>Create note</button>
</div>    
<div>
{notes.map((note)=>{
    return <div>
        <h1>{note.tittle}</h1>
        <h1>{note.description}</h1>
        </div>})}
</div>
</>


);


}