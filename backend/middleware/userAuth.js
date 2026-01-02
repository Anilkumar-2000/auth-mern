import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Unauthenticated user. Login again" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken) {
      req.user = { id: decodedToken.id };
    } else {
      res
        .status(400)
        .json({ success: false, message: "Unauthenticated user login again" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default userAuth;
