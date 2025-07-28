
import React from 'react';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import {Link} from 'react-router-dom';

const CompanyCard = ({ company }) => {
  const {
    _id,
    name,
    location,
    foundedOn,
    logo,
    avgRating,
    totalReviews,
    city
  } = company;

  return (
    <div className="card mb-4 shadow-sm rounded-3">
      <div className="row g-1 align-items-center p-1 m-2">
        {/* Logo */}
        <div className="col-md-2 text-center">
          <img
            src={`http://localhost:5000${logo}`}
            className="img-fluid border rounded-1"
            alt="logo"
            style={{ width: '110px', height: '110px' }}
          />
        </div>

        {/* Company Details */}
        <div className="col-md-7">
          <h5 className="fw-bold mb-1">{name}</h5>
          <p className="mb-1 text-muted">
            <FaMapMarkerAlt /> {`${location} ,${city}`}
          </p>
          <div className="d-flex align-items-center">
            <span className="fw-bold me-2">{avgRating}</span>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < Math.round(avgRating) ? '#ffc107' : '#e4e5e9'} />
            ))}
            <span className="ms-2 text-muted">{totalReviews} Reviews</span>
          </div>
        </div>

        {/* Reg Date + Button */}
        <div className="col-md-3 text-end">
          <p className="text-muted mb-5">
            Founded on
            <strong> {new Date(foundedOn).toLocaleDateString()}</strong>
          </p>
          <Link to={`/reviews/${_id}`} className="btn btn-dark ps-4 pe-4 rounded-1">Detail Review</Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
