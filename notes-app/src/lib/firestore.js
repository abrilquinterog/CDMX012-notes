import { useState, useEffect} from "react"
import { db, auth } from "./firebaseConfig"
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore"
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

const createNote = async (e) =>{
 await addDoc(notesCollectionRef,{ tittle: newTittle, 
  description: newDescription, 
  createdAt: serverTimestamp(), 
  user: auth.currentUser.email});
};



    const getNotes = async () => {
         //const userNow = auth.currentUser.uid;
         const data= await getDocs(query(notesCollectionRef, orderBy('createdAt', "desc")));
         setNotes(data.docs.map((doc) =>({...doc.data(), id: doc.id} )));
         
    }

    useEffect(() => {
     getNotes()

}, [])


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
        MySwal.fire("Deleted!", "Your note has been deleted.", "success");
        getNotes();
      }
    });
  };

const navigate = useNavigate();
    const handleOnClick = (id) =>
    {
      navigate('/edit/'+ id ,{state:{test:'prop'}});
      //objeto de la nota
      
    }

return (
<>
<div className='creationContainer'>
<form className='inputs'onSubmit={createNote}>
    <input className='writeTittle' placeholder='Tittle'
    value={newTittle}
    onChange={(event)=>{setNewTittle(event.target.value);
    }}></input>
    <textarea className='writeNote' placeholder='Write your note'
    value={newDescription}
    onChange={(event)=>{setNewDescription(event.target.value);
    }}></textarea>
    <button className='btnCreate'type='submit' > CREATE 💛</button>
    </form>
</div>   
<div className="postWall">
{notes.map((note)=>{
    return <div className="post" >
        <h1 className="noteTittle">{note.tittle}</h1>
        <p className="noteDescription">{note.description}</p>
        <section className="buttonsBox">
        <button className='editBtn' onClick={() => {handleOnClick(note.id)}}> Edit </button>
        <button className='deleteBtn' onClick={() => {confirmDelete(note.id)}}> Delete </button>
        </section>
        </div>})}
</div>
</>


);


}