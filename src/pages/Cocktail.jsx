import axios from "axios";
import { Link, useLoaderData, Navigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";

const singleDrinkUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const searchSingleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const response = await axios.get(`${singleDrinkUrl}${id}`);
      return response.data.drinks;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(searchSingleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data: drinks } = useQuery(searchSingleCocktailQuery(id));

  if (!drinks) return <Navigate to="/" />;

  const drink = drinks[0];
  const {
    strAlcoholic: info,
    strCategory: category,
    strDrink: name,
    strDrinkThumb: image,
    strInstructions: instructions,
    strGlass: glass,
  } = drink;

  const validIngredients = Object.keys(drink)
    .filter((key) => key.startsWith("strIngredient") && drink[key] !== null)
    .map((key) => drink[key]);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h2>{name}</h2>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {validIngredients.join(",  ")}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
