import React from "react";
import Card from "./Card";
const Cards = ({ data, isError, error }) => {

  if (isError) {
    return <h1 className="text-red-600 text-3xl">{error.message}</h1>;
  }

  const allCards = data.map((product) => (
    <Card key={product.id} product={product} />
  ));
  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {allCards}
    </div>
  );
};

export default Cards;
