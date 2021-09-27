// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: any, res: NextApiResponse) {
  
  const { token } = req.query;

  if (!token) {
    res.status(500).json("token is required");
  }

  const response = await axios.get(`${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/otptoken/qrcode?otpKey=${token}`, 
  { 
    headers: {       
      Authorization: `Bearer ${req?.session?.passport?.AccessToken}`,
    },
    responseType: 'arraybuffer' 
  });    
  const buff = new Buffer(response.data);   
  res.writeHead(200, {
    "Content-Type": "image/png"      
  });          
  res.end(buff);
}