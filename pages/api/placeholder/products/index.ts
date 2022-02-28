import { IProduct } from "@app/typings/product";
import { NextApiRequest, NextApiResponse } from "next";
import { data } from "./_data";

export default function productsRoute(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200;
  res.json({
    products: data,
  });
}