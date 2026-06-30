

const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        console.log("Received Token:", token);

        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            console.log("VERIFY ERROR:", err);
            console.log("DECODED:", decoded);

            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized user"
                });
            }

            req.user = decoded;
            next();
        });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Error In Auth API"
        });
    }
};





