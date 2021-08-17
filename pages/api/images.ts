// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: any, res: NextApiResponse) {
  const { url, type } = req.query;

  if (!url) {
    res.status(500).json("Url is required");
  }

  if (type === "binary") {
    const response = await axios.get(url, { responseType: 'arraybuffer' });    
    var buff = new Buffer(response.data);   
    res.writeHead(200, {
      "Content-Type": "image/png"      
    });          
    res.end(buff);
  } else {
    const result = await axios.get(url);
    const decoded = result.data.split("base64,")[1];
    const imageResp = new Buffer(decoded, "base64");
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": imageResp.length,
    });
    res.end(imageResp);
  }
}
