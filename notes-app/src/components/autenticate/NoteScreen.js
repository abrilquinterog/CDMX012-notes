import './NoteScreen.css'
import { SaveNotes } from '../../lib/firestore';

export const NoteScreen = ({logOut}) => 
{
    return(
    <>
    <header className='headblock'>
        <h1 className='headerTittle'> Notes</h1>
        <button className='btnLogOut' onClick={()=>{logOut()}}>LogOut</button>
    </header>
    <section className='notesBoard'> 
        <SaveNotes/>
    </section>
    <footer className="footNotes">
      <h4 className="made">Made with 💛 by Abril Quintero</h4>
    </footer>
    </>    
    );
}