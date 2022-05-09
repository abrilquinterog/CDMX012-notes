export const NoteScreen = ({logOut}) => 
{
    return(
    <>
    <h1>Aquí ya es la vista de la notitas </h1>
    <button onClick={()=>{logOut()}}>LogOut</button>
    </>    
    );
}