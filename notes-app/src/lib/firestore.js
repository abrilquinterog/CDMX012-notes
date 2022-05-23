import { useState, useEffect} from "react"
import { db } from "./firebaseConfig"
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore"




export const SaveNotes = () => {

const [newTittle, setNewTittle]= useState ("");
const [newDescription, setNewDescription]= useState ("");

const [notes, setNotes] = useState([]);
const notesCollectionRef = collection(db, "notes")

const createNote = async () =>{
 await addDoc(notesCollectionRef,{ tittle: newTittle, description: newDescription, createdAt: serverTimestamp()});
};

useEffect(() => {

    const getNotes = async () => {
         const data= await getDocs(query(notesCollectionRef, orderBy('createdAt', "desc")));
         setNotes(data.docs.map((doc) =>({...doc.data(), id: doc.id} )));

    }

    getNotes()


}, [])

return (
<>
<div className='creationContainer'>
<form className='inputs'>
    <input className='writeTittle' placeholder='Tittle'onChange={(event)=>{setNewTittle(event.target.value);
    }}></input>
    <textarea className='writeNote' placeholder='Write your note'onChange={(event)=>{setNewDescription(event.target.value);
    }}></textarea>
    </form>
    <button className='btnCreate' onClick={createNote}> CREATE 💛</button>
</div>   
<div className="postWall">
{notes.map((note)=>{
    return <div className="post">
        <h1 className="noteTittle">{note.tittle}</h1>
        <p className="noteDescription">{note.description}</p>
        <button>Editar</button>
        <button>Borrar</button>
        </div>})}
</div>
</>


);


}