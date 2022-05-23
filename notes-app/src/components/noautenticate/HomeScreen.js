//import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

export const HomeScreen = ({loginWithGoogle}) => 
{
    /*const navigate = useNavigate();
    const handleOnClick = () =>
    {
      navigate('/notes');
    }*/
    return(
    <>
    <section className= "Home">
      <section className="imageContainer">
        <img alt="" src="/assets/notas.png" className="appLogo"></img>
      </section>
      <section className="appName">
    <h1 className="tittle">Notes</h1>
    <h2 className="subtittle">Keep all your ideas in one place</h2>
    <button onClick= {()=>{loginWithGoogle()}} className="btnGoogle">Sign in with Google<img alt="" src="/assets/google.png" className="iconG"></img></button>
    </section>
    </section>
    <footer className="foot">
      <h4 className="made">Made with 💛 by Abril Quintero</h4>
    </footer>
    </>    
    );
}