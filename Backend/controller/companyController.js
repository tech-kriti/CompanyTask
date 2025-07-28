import { company } from "../models/companyModel.js";
import { validationResult } from "express-validator";

export const createCompany = async (req, res) => {
    console.log(req.body);
     const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
   try{
     const {foundedOn} = req.body;
    const logoPath = req.file ? `/uploads/${req.file.filename}` : ''; // for single file upload

    const newCompany = {
        name: req.body.name,
        location: req.body.location,
        foundedOn: new Date(foundedOn),
        city: req.body.city,
        description: req.body.description,
        logo: logoPath,
        createdAt: new Date()
    };


    const result = await company.create(newCompany);

   res.status(201).json({
        msg: "Company created successfully",
        newCompany: { _id: result.insertedId, ...newCompany }
    });
   }catch(err){
     console.error("error in creation:", err);
    res.status(500).json({ message: "Server error" });
   }
};

export const getAllCompanies = async(req,res)=>{
    try{
        const companies = await company.find({}).sort({ createdAt: -1 });

         res.status(200).json(companies);
    }catch(err){
     console.error("error in fetching company:", err);
      res.status(500).json({ message: "Server error" });
    }
    
};