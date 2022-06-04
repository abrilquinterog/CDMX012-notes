import { HomeScreen } from './HomeScreen';
import {Route, Routes} from 'react-router-dom';
import { NoteScreen } from '../autenticate/NoteScreen';
import { loginWithGoogle, logOut} from '../../lib/firebaseAuth';
import { EditNote } from '../autenticate/EditNote';

export const Paths = ({isAutenticate}) =>
 { 
    return (<div>{isAutenticate?
      <Routes>
      <Route path="/" element={<NoteScreen logOut={logOut}/>} />
      <Route path="/edit/:id" element={<EditNote logOut={logOut}/>} />
      </Routes>:
      <Routes>
      <Route path="/" element={<HomeScreen loginWithGoogle={loginWithGoogle}/>} />
      </Routes>}</div>

    );
 }