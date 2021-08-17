// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: any,
  res: NextApiResponse
) {

  const logo = await axios.get(
    `${process.env.SERVER_HOST}/blazon-workspace-backend/public/workspace/images/logo`,        
    {
      headers: {       
        Authorization: `Bearer ${req?.session?.passport?.AccessToken}`,
      },
      responseType: "arraybuffer"
    }
  );

  const buff = new Buffer(logo.data);   
  res.writeHead(200, {
    "Content-Type": "image/png"      
  });          
  res.end(buff);
}
