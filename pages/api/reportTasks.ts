// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: any,
  res: NextApiResponse
) {

  const { type, ord, filter, id } = req.query;

  const report = await axios.get(
    `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/reports/tasks/${type}${(id && `/${id}/`) || ""}?ord=${ord}&filter=${filter}`,        
    {
      headers: {       
        Authorization: `Bearer ${req?.session?.passport?.AccessToken}`,
      },
      responseType: "arraybuffer"
    }
  );  

  const buff = new Buffer(report.data);
  res.writeHead(200, res.getHeaders());          
  res.end(buff);
}