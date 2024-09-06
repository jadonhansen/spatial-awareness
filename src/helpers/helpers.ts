import { Category } from "../types/types";

export const prettyCategory = (category: Category): string => {
	const splitString = category.split("_").map((subStr: string) => {
		return subStr[0].toUpperCase() + subStr.substring(1);
	});

	return splitString.join().replace(",", " ");
};
