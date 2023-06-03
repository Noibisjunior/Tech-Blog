import './login.css';
import back from '../../assets/images/login.jpg';
import  {  useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  

  const Navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const response = await fetch('https://backend-pmep.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
const data = await response.json()
console.log(data);

    if(response.status === 200) {
   toast.success('Login was successful');
   Navigate('/');
}else{
  toast.error('Please provide all the required information');
}
    
  }

  // if (redirect) {
  //   return <Navigate to={'/'} />;
  // }

  return (
    <>
    <form className="login" onSubmit={login}>
     <div className="container">
           <div className="backImg">
             <img src={back} alt="img" />
             <div className="text">
      <h1>Login</h1>
      </div>
      </div>
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
      <button className='button'>Login</button>
      </div>
    </form>
     <p>Dont have  an Account,please <Link to='/register'>Register</Link></p>
     </>
  );
};

export default LoginPage;




//  const Login = () => {
//   return (
//     <>
//       <section className="login">
//         <div className="container">
//           <div className="backImg">
//             <img src={back} alt="" />
//             <div className="text">
//               <h3>Login</h3>
//               <h1>My account</h1>
//             </div>
//           </div>

//           <form>
//             <span>Username or email address *</span>
//             <input type="text" required />
//             <span>Password *</span>
//             <input type="password" required />
//             <button className="button">Log in</button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;