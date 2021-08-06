// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Link = {
  rel: string;
  href: string;
};

type Data = {
  identifier: number;
  createdAt: string;
  modifiedAt: string;
  certificatedAt: string;
  risk: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  lastAccess: string;
  status: string;
  email: string;
  personalEmail: string;
  displayName: string;
  primaryPhone: string;
  locked: boolean;
  links: Link[];
};

export default async function handler(
  req: any,
  res: NextApiResponse<Data>
) {

  const { id } = req.query;

  const user = await axios.get(
    `${process.env.SERVER_HOST}/blazon-workspace-backend/workspace/directory/users/${Number(id)}`,        
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
