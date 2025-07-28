
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const AddCompanyModal = ({ show, handleClose, onCompanyAdded }) => {
    const [companyData, setCompanyData] = useState({
        name: '',
        location: '',
        foundedOn: '',
        description: '',
        city: '',
        logo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo') {
            setCompanyData({ ...companyData, logo: files[0] });
        } else {
            setCompanyData({ ...companyData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (let key in companyData) {
                formData.append(key, companyData[key]);
            }

            const res = await axios.post('http://localhost:5000/company/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            onCompanyAdded(res.data.newCompany); // optional callback
            handleClose();
        } catch (err) {
            console.error('Error adding company:', err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="w-100 text-center fw-bold mt-3">Add Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="px-2">
                    <Form.Group className="mb-3">
                        <Form.Label className="text-muted">Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter..."
                            name="name"
                            value={companyData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            rows='2'
                            placeholder="description"
                            name="description"
                            value={companyData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex align-items-center position-relative">
                        <Form.Control
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={companyData.location}
                            onChange={handleChange}
                            required
                        />
                        <FaMapMarkerAlt className="position-absolute end-0 me-3 text-secondary" />
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex align-items-center position-relative">
                        <Form.Control
                            type="date"
                            placeholder="Founded on"
                            name="foundedOn"
                            value={companyData.foundedOn}
                            onChange={handleChange}
                            required
                        />
                        {/* <FaCalendarAlt className="position-absolute end-0 me-3 text-secondary" /> */}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"




                            placeholder="City"
                            name="city"
                            value={companyData.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Upload Logo</Form.Label>
                        <Form.Control
                            type="file"
                            name="logo"
                            onChange={handleChange}
                            accept="image/*"
                            required
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="align-items-center mx-auto d-block mt-3 ps-5 pe-5"
                        style={{
                            background: 'linear-gradient(to right, #7b2ff7, #f107a3)',
                            border: 'none',
                        }}
                    >
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddCompanyModal;
