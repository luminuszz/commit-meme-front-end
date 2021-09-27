import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ResponseData = {
  translatedMessage: string;
  originalMessage: string;
};

const methodMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "allow GET",
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  methodMiddleware(req, res);

  try {
    const { LAMBDA_URL } = process.env;

    const { data } = await axios.get<ResponseData>(LAMBDA_URL as string);

    return res.status(200).json({
      ...data,
    });
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
}
