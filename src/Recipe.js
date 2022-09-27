import React from "react";
import style from "./recipe.module.css";
function Recipe({ recipe }) {
  return (
    <div className={style.container}>
      <h1>{recipe.recipe.label}</h1>
      <p>{recipe.recipe.calories.toFixed(2)}</p>
      <img src={recipe.recipe.image} alt={recipe.recipe.lable} />
      <ol>
        {recipe.recipe.ingredientLines.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ol>
    </div>
  );
}

export default Recipe;
