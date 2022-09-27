import "./App.css";
import axios from "axios";
import Recipe from "./Recipe";
import Loader from "./Loader";
import { useEffect, useState } from "react";

function App() {
  const appID = "4e067d47";
  const appKey = "15ce2faae661c7487d322c7e0144dfb5";
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
    getRecipes();
    setSearchTerm("");
  };

  const getRecipes = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appID}&app_key=${appKey}`
    );
    setLoading(true);
    setRecipes(response.data.hits);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    getRecipes();
  }, [query]);

  return (
    <div onSubmit={handleSubmit}>
      <form className="search-form">
        <input
          type="text"
          className="search-input"
          onChange={handleSearchTerm}
          value={searchTerm}
        />

        <input type="submit" value="Search" className="search-btn" />
      </form>
      {loading && <Loader />}
      {recipes.length && (
        <div className="container">
          {recipes.map((recipe, index) => (
            <Recipe key={index} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
