import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Details from './pages/details/Details';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import Account from './pages/account/Account';
import Create from './components/create/Create';
import EditPost from './components/create/EditPost';
import { Footer } from './components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/details/:id" element={<Details />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/blogs" element={<Home />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
