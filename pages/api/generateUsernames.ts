// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"

export default async function handler(
  req: any,
  res: NextApiResponse
) {

  const { id, payload } = req.query;

  const response = await axios.post(
    `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/forms/${id}/generateUsernames?amountSuggestions=2&usernamePolicyId=1`,        
    {values: {
      firstName: "Marcos"
    }},
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