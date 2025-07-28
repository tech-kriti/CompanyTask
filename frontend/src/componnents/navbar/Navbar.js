
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(){
  return (
    <nav className="navbar bg-white shadow-sm px-4 py-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">

        
        <div className="d-flex align-items-center gap-2">
          <img src="logo.png" alt="logo" width={50} height={45} />
          <span className=" fs-4">
            Review<span className='and'>&</span><span className="text-primary text-dark fw-bold">RATE</span>
          </span>
        </div>

       
        <div className="input-group" style={{width:'400px',marginLeft:'400px'}}>
          <input type="text" className="form-control" placeholder="Search..." />
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
        </div>

        
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none text-dark me-4 fw-semibold">SignUp</Link>
          <Link to="/" className="text-decoration-none text-dark me-5 pe-4 fw-semibold">Login</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
