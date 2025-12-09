import ranks from "../utils/ranks.js";

export const requireRank = (minimumRankName) => {
    return (req, res, next) => {
        const userRank = req.user.rank;
        const userWeight = ranks[userRank];
        const requiredWeight = ranks[minimumRankName];

        if (userWeight === undefined || requiredWeight === undefined) {
            return res.status(500).json({ message: "Rank system misconfigured." });
        }

        if (userWeight < requiredWeight) {
            return res.status(403).json({
                message: `Insufficient rank. Required: ${minimumRankName}.`
            });
        }

        next();
    };
};
