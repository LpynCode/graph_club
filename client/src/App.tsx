import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import PrivateRoute from "./modules/auth/components/PrivateRoute/PrivateRoute";
import AudiosPage from "./pages/Audios.page";
import VideosPage from "./pages/Videos.page";
import UsersPage from "./pages/Users.page";
import UserPage from "./pages/User.page";
import PlaylistInfoPage from "./pages/PlaylistInfo.page";
import {useAppDispatch} from "./hooks/redux";
import {useEffect} from "react";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<PrivateRoute page={<HomePage/>}/>}/>
              <Route path={'/audios/:userId'} element={<PrivateRoute page={<AudiosPage/>}/>}/>
              <Route path={'/login'} element={<LoginPage/>}/>
              <Route path={'/register'} element={<RegisterPage/>}/>
              <Route path={'/videos'} element={<PrivateRoute page={<VideosPage/>}/>}/>
              <Route path={'/users'} element={<PrivateRoute page={<UsersPage/>}/>}/>
              <Route path={'/:userId'} element={<PrivateRoute page={<UserPage/>}/>}/>
              <Route path={'/playlist/:playlistId'} element={<PrivateRoute page={<PlaylistInfoPage/>}/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
