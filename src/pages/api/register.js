import { API_URL } from "config";
import axios from "axios";
import cookie from 'cookie';
export default async (req, res) => {
  if (req.method === "POST") {
    const { username,email, password } = req.body;
    try {
      const strapiRes = await axios.post(`${API_URL}/auth/local/register`, {
        username, 
        email,
        password,
      });
      res.setHeader("Set-Cookie", cookie.serialize('token',strapiRes.data.jwt,{
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60*60*24*7,
        sameSite: 'strict',
        path: '/',
      }))
      res.status(200).json({ user: strapiRes.data.user });
    } catch (error) {
      res.status(error.response.status).json({ message: error.response.data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
