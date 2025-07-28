
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import './review.css';

function Reviews() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [fullName, setFullName] = useState('');
  const [subject, setSubject] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/company/getall`).then(res => {
      const found = res.data.find(c => c._id === id);
      setCompany(found);
    });

    axios.get(`http://localhost:5000/review/${id}`).then(res => {
      setReviews(res.data.reviews);
      setAvgRating(res.data.avgRating);
      setTotalReviews(res.data.totalReviews);
    });
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/review/postreview`, {
        companyId: id,
        fullName,
        subject,
        reviewText,
        rating
      });

      setShowModal(false);
      setFullName('');
      setSubject('');
      setReviewText('');
      setRating(0);
    } catch (err) {
      console.error('Error adding review', err);
    }
  };

  if (!company) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="review container py-4">
        {/* Company Card */}
        <div className="bg-white rounded shadow p-3 mb-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={`http://localhost:5000${company.logo}`}
                alt="Company Logo"
                className="rounded-1 me-3"
                style={{ width: '100px', height: '100px' }}
              />
              <div>
                <h5 className="mb-0 fw-bold">{company.name}</h5>
                <small className="text-muted">
                  {`${company.location} ,${company.city}`}
                </small>
                <div className="mt-2 d-flex align-items-center">
                  <strong>{avgRating.toFixed(1)}</strong>
                  <div className="ms-2 text-warning">
                    {'★'.repeat(Math.floor(avgRating))}{'☆'.repeat(5 - Math.floor(avgRating))}
                  </div>
                  <small className="ms-2 fw-bold">{totalReviews} Reviews</small>
                </div>
              </div>
            </div>
            <div className="text-end">
              <small className="text-muted d-block mb-5">
                Founded on {company.foundedOn ? new Date(company.foundedOn).toLocaleDateString() : 'N/A'}
              </small>
              <button className="btn btn-sm btn-purple mt-1 ps-3 pe-3" onClick={() => setShowModal(true)}>+ Add Review</button>
            </div>
          </div>

        </div>

        {/* Review List */}
        <p className="text-muted mb-1">Result Found: {reviews.length}</p>

        {reviews.map((r, index) => (
          <div key={r._id} className="bg-white rounded shadow-sm p-3 mb-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <img
                  src={`https://i.pravatar.cc/40?img=${index + 3}`}
                  alt="user"
                  className="rounded-circle me-3"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  <strong>{r.fullName}</strong>
                  <br />
                  <small className="text-muted">
                    {new Date(r.createdAt).toLocaleDateString()} -{' '}
                    {new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
              </div>
              <div className="text-warning align-self-start fs-4">
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </div>
            </div>
            <p className="mt-2 mb-0 text-muted" style={{marginLeft:'60px'}}>{r.reviewText}</p>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center mt-3'>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                value={subject}
                required
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Enter your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={reviewText}
                required
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-muted">Rating</Form.Label>
              <div>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={24}
                    style={{ cursor: 'pointer', marginRight: 5 }}
                    color={i < rating ? '#ffc107' : '#e4e5e9'}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Reviews;
