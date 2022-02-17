export type CategoriesString = "videogames" | "tickets" | "tech" | "other";

export interface IProduct {
  id: number;
	name: string;
	currentBid: number;
  category: CategoriesString;
}
