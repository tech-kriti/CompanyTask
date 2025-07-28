
import { review } from '../models/reviewModel.js';



export const createReview = async (req, res) => {
    console.log(req.body);
    try {
        const { companyId, rating } = req.body;

        const newReview = {
            companyId: companyId,
            fullName: req.body.fullName,
            subject: req.body.subject,
            reviewText: req.body.reviewText,
            rating: parseInt(rating),
        };

        const result = await review.create(newReview);

        res.status(201).json({
            msg: "Review created successfully",
            review: result
        });
    } catch (err) {
        console.error("error in creation:", err);
        res.status(500).json({ message: "Server error" });

    }
};


export const getReviewsByCompanyId = async (req, res) => {
    const { companyId } = req.params;

    try {
        if (!companyId) {
            return res.status(400).json({
                msg: "Company ID is required"
            });
        }

        const reviews = await review.find({ companyId }).sort({ createdAt: -1 });

        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : 0;

        return res.status(200).json({
            msg: "Reviews fetched successfully",
            avgRating: parseFloat(avgRating),
            totalReviews: reviews.length,
            reviews
        });
    } catch (err) {
        console.error("error in creation:", err);
        res.status(500).json({ message: "Server error" });
    }
};
