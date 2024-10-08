import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {

      if (email === "" && password === "") {
      toast.error('Please fill all the input fields!');
    } 
    else if (email === ''){
      toast.error('Please fill Email input field!');
    } else if (password === ''){
      toast.error('Please fill Password input field!')
    } 
  }
  else {
    
    localStorage.setItem('login', true)
    navigate('/'); 
    window.location.reload();
    
    console.log("clicked");
    toast.success('Login Successfully')
  }
}

  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem('login')
    if (login) {
        navigate('/')
    }
});

  return (
    <>
      
    <div className="heading-login text-center">
        <h1>Login Page</h1>
    </div>
    <div className="login-page">
    <Form className='w-25 mt-5'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={loginSubmit}>
        Submit
      </Button>
    </Form>
    </div>

    
    </>
  );
}

export default Login;
