import axios from "axios";
import { useLoaderData } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import CocktailList from "../components/CocktailList";
import { useQuery } from "@tanstack/react-query";
const searchCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const searchCocktailQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${searchCocktailUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const searchUrl = new URL(request.url);
    const searchTerm = searchUrl.searchParams.get("search") || "";
    await queryClient.ensureQueryData(searchCocktailQuery(searchTerm));
    return { searchTerm };
  };
const Landing = () => {
  const item = useLoaderData();
  const { searchTerm } = item;
  const { data: drinks } = useQuery(searchCocktailQuery(searchTerm));
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
