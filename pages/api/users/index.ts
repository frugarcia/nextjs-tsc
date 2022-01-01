import { NextApiRequest, NextApiResponse } from "next";
// import { sampleUserData } from '../../../utils/sample-data'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch("https://gorest.co.in/public/v1/users");
    const data = await response.json();
    const users = data["data"];
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
