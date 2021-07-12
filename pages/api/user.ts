// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    identifier: 1,
    createdAt: "04/08/2020 17:11:26",
    modifiedAt: "01/06/2021 08:46:30",
    certificatedAt: "24/08/2020 08:27:28",
    risk: "LOW",
    username: "teste",
    firstName: "Marcos",
    middleName: "Alberto",
    lastName: "Lopes",
    lastAccess: "09/07/2021 15:53:49",
    status: "ACTIVE",
    email: "malopes21@gmail.com",
    personalEmail: "malopes21@gmail.com",
    displayName: "MARCOS LOPES",
    primaryPhone: "998780925",
    locked: false,
    links: [
      {
        rel: "thumb",
        href: "https://i.ibb.co/nwV8d4s/Avatar.png",
      },
      {
        rel: "photo",
        href: "https://i.ibb.co/nwV8d4s/Avatar.png",
      },
      {
        rel: "self",
        href: "http://localhost:8087/blazon-workspace-backend/workspace/directory/users/1?expand=false",
      },
      {
        rel: "changepassword",
        href: "http://localhost:8087/blazon-workspace-backend/workspace/directory/users/changepassword",
      },
      {
        rel: "accounts",
        href: "http://localhost:8087/blazon-workspace-backend/workspace/directory/accounts/user{?page,size,expand,ord}",
      },
      {
        rel: "roles",
        href: "http://localhost:8087/blazon-workspace-backend/workspace/directory/roles/user{?page,size,expand,q,ord}",
      },
    ],
  });
}
