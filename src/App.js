import React from 'react';
import Header from './Components/Header'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <Router>
            <Header />
            
      </Router>
      
    </div>
  )
}

export default App
