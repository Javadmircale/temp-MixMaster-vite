import React from "react";
import Wrapper from "../assets/wrappers/CocktailList";
import CocktailCard from "./CocktailCard";

const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return <h2 style={{ textAlign: "center" }}>there is no drink</h2>;
  }
  const editedDrinks = drinks.map((item) => {
    const { strDrinkThumb, strDrink, strGlass, strAlcoholic, idDrink } = item;
    return {
      id: idDrink,
      glass: strGlass,
      info: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
  });
  return (
    <Wrapper>
      {editedDrinks.map((drink) => {
        return <CocktailCard key={drink.id} {...drink} />;
      })}
    </Wrapper>
  );
};

export default CocktailList;
