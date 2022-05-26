import { useState, useEffect} from "react"
import { db, auth } from "./firebaseConfig"
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, where } from "firebase/firestore"
import { deletePost } from "./delete"
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom"


const MySwal = withReactContent(Swal);


export const SaveNotes = () => {

const [newTittle, setNewTittle]= useState ("");
const [newDescription, setNewDescription]= useState ("");
//Estado de las notas
const [notes, setNotes] = useState([]);
//Referencia de la database
const notesCollectionRef = collection(db, "notes")

const createNote = async () =>{
 await addDoc(notesCollectionRef,{ tittle: newTittle, description: newDescription, createdAt: serverTimestamp(), user: auth.currentUser.email});
};

useEffect(() => {

    const getNotes = async () => {
         const userNow = auth.currentUser.email;
         const data= await getDocs(query(notesCollectionRef, orderBy('createdAt', "desc")));
         setNotes(data.docs.map((doc) =>({...doc.data(), id: doc.id} )));
         
    }

    getNotes()


}, [])

const navigate= useNavigate();
const confirmDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to see this note anymore!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B96ADF",
      cancelButtonColor: "#FEAC5E",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id);
        navigate("/");
        MySwal.fire("Deleted!", "Your note has been deleted.", "success");
      }
    });
  };


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
        <button className='deleteBtn' onClick={() => {confirmDelete(note.id)}}> Delete </button>
        </div>})}
</div>
</>


);


}