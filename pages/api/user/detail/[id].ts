// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Link = {
  rel: string;
  href: string;
};

type Data = {
  name: string;
  label: string;
  value: string | number | undefined;
};

export default async function handler(
  req: any,
  res: NextApiResponse<Data>
) {

  const { id, type } = req.query;

  const url = type === "request" ? `/blazon-workspace-backend/workspace/requests/userdatas/${Number(id)}` : `/blazon-workspace-backend/workspace/tasks/userdatas/${Number(id)}`;

  const user = await axios.get(
    `${process.env.SERVER_HOST}${url}`,        
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${req?.session?.passport?.AccessToken}`,
      },
    }
  );
  res.status(200).json(user?.data);
}
