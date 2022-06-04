import './EditNote.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getDoc, updateDoc, doc} from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig';

export const EditNote = (prop) => {
    //let location = useLocation();
    //console.log(location);
    const [newTittle, setNewTittle]= useState ("");
    const [newDescription, setNewDescription]= useState ("");

    const navigate= useNavigate()
    const {id}= useParams()
    //console.log({id})

    const  update = async (e) =>{
      e.preventDefault()
      const note = doc(db, 'notes', id)
      const data = {tittle: newTittle, description: newDescription}
      await updateDoc(note, data)
      navigate('/')

    }

    const getNotesById = async (id) =>{
      const note = await getDoc(doc(db, 'notes',id))
      if(note.exists()){
        //console.log(note.data())
        setNewTittle(note.data().tittle)
        setNewDescription(note.data().description)

      } else{
        console.log('Esta nota no existe')
      }

    }

    useEffect( () => {
      getNotesById(id)
    }, [])


    return(
    <>
    <header className='headblock'>
        <h1 className='headerTittle'> Notes </h1>
    </header>
    <section className='editingBoard'> 
    <h1 className='updateTittle'>Edit your note</h1>
    <form className='inputs2'onSubmit={update}>
    <input className='writeTittleU' placeholder='Tittle'
    value={newTittle}
    onChange={(event)=>{setNewTittle(event.target.value);
    }}></input>
    <textarea className='writeNoteU' placeholder='Write your note'
    value={newDescription}
    onChange={(event)=>{setNewDescription(event.target.value);
    }}></textarea>
    <button type='submit' className='btnUpdate'> UPDATE 💜</button>
    </form>
    </section>
    <footer className="footNotes">
      <h4 className="made">Made with 💛 by Abril Quintero</h4>
    </footer>
    </>    
    );
}