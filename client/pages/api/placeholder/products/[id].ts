import { NextApiRequest, NextApiResponse } from "next";
import { data } from "./_data";

export function productByIdEndpoint(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const product = data.find((p) => p.id === Number(id));

  if (!product) {
    res.statusCode = 404;
    res.json({
      message: 'Product not found',
    });
    return;
  }

  res.statusCode = 200;
  res.json({
    product,
  });
}