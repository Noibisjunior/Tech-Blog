import  { useState } from 'react'
import './login.css';
import back from '../../assets/images/register.jpg';
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
 const [email,setEmail] = useState('')
 const [username,setUsername] = useState('')
 const [password,setPassword] = useState('')

const Navigate = useNavigate()

 async function register(event){
  event.preventDefault(); //prevent the default behaviour of the browser

const response = await fetch('http://localhost:5000/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email,username, password }),
});
const result = await response.json()


if(response.status === 200) {
  toast.success('Registration was successful');
  Navigate('/');
}else{
  toast.error('Please provide all the required information');
}
 }


  return (
     <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Register</h3>
              <h1>My account</h1>
            </div>
            </div>
    <form onSubmit={register}>
      <h1>Register</h1>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='button'>Register</button>
    </form>
    <p>Already Have an Account,please <Link to='/login'>Login</Link></p>
    </div>
    </section>
  );
}

export default Register;
