import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

 const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        authType: "google", // optional
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // this matches your auth middleware
    res.json({ token: jwtToken });
  } catch (err) {
    console.error("Google login error", err);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
};

export{googleLogin}