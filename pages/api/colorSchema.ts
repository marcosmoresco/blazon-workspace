// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"

export default async function handler(
  req: any,
  res: NextApiResponse
) {

  const response = await axios.get(
    `${process.env.SERVER_HOST}/blazon-workspace-backend/public/workspace/images/colorSchema`,        
    {
      headers: {    
        Accept: "application/json",
        "Content-Type": "application/json",   
        Authorization: `Bearer ${req?.session?.passport?.AccessToken}`,
      },      
    }
  );

  res.status(200).json(response?.data);
}