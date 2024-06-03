import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LandingPage from "./screens/landing page/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/mynotes/MyNotes";
import LoginScreen from "./screens/login screen/LoginScreen";
import RegisterScreen from "./screens/register screen/RegisterScreen";
import CreateNewNote from "./screens/create note/CreateNewNote";
import SingleNote from "./screens/single note/SingleNote";
import { useState } from "react";
import UserProfile from "./screens/edit user/UserProfile";
import Account from "./screens/account/Account";

const App = () => {
  const [ search, setSearch ] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" Component={LandingPage} exact />
          <Route path="/login" Component={LoginScreen} />
          <Route path="/register" Component={RegisterScreen} />
          <Route path="/profile" Component={UserProfile} />
          <Route path="/account" Component={Account} />
          <Route path="/mynotes" Component={() => <MyNotes search={search}/>} />
          <Route path="/createnewnote" Component={CreateNewNote} />
          <Route path="/note/:id" Component={SingleNote} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
