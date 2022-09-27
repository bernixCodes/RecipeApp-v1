import "./App.css";
import axios from "axios";
import Recipe from "./Recipe";
import { useEffect, useState } from "react";

function App() {
  const appID = "4e067d47";
  const appKey = "15ce2faae661c7487d322c7e0144dfb5";
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
    setSearchTerm("");
    getRecipes();
  };

  const getRecipes = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appID}&app_key=${appKey}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };
  useEffect(() => {
    getRecipes();
  }, [query]);

  return (
    <div className="app" onSubmit={handleSubmit}>
      <form className="search-form">
        <input
          type="text"
          className="search-inpt"
          onChange={handleSearchTerm}
          value={searchTerm}
        />

        <input type="submit" value="Search" className="search-btn" />
      </form>

      {recipes.map((recipe, index) => (
        <Recipe key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default App;
