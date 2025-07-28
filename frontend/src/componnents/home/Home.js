
import React, { useEffect, useState } from 'react';
import CompanyCard from './ComapnyCard';
import Navbar from '../navbar/Navbar';
import AddCompanyModal from '../AddCompany';
import './Home.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

function Home(){
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCompanyAdded = (newCompany) => {
    console.log('Company Added:', newCompany);
    setCompanies((prev) => [...prev, newCompany]);
    setShowModal(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/company/getall');
      console.log(res.data);
      setCompanies(res.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container-fluid py-3 border-bottom bg-light">
      <div className="d-flex flex-wrap align-items-center px-4">

      
        <div className="align-items-center gap-2 flex-wrap">
          <label htmlFor="citySelect" className="form-label fw-semibold mb-0" style={{marginLeft:'100px'}}>Select City</label>
          <select id="citySelect" className="form-select" style={{ width: '350px',marginLeft:'100px' }}>
            <option>Indore, Madhya Pradesh, India</option>
            <option>Bhopal, Madhya Pradesh, India</option>
            <option>Mumbai, Maharashtra, India</option>
            <option>Pune, Maharashtra, India</option>
          </select>
        </div>

         <FaMapMarkerAlt className="text-primary mt-3 "/>
          <button className="btn btn-purple mt-3 ms-3" style={{color:"white"}}>Find Company</button>
          <button className="btn btn-purple mt-3 ps-3"  onClick={() => setShowModal(true)} style={{marginLeft:'120px',color:"white"}}>+ Add Company</button>
        

        {/* Right: Sort Dropdown */}
        <div className=" align-items-end gap-2 mt-2 mt-md-0" style={{marginLeft:'120px'}}>
          <label className="fw-semibold mb-0">Sort:</label>
          <select className="form-select" style={{ width: '160px' }}>
            <option>Name</option>
            <option>Average</option>
            <option>Rating</option>
            <option>Location</option>
          </select>
        </div>
      </div>
    </div> 
    <div className="container mt-4">
      <h6 className="text-muted">Results Found: {companies.length}</h6>
      {companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>

     {/* Modal */}
     <AddCompanyModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onCompanyAdded={handleCompanyAdded}
      />
    </>
  );
};

export default Home;
