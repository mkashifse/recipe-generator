import { useEffect, useState } from 'react';
import './App.css';
import RecipeCard from './components/RecipeCard';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]); // [ {strIngredient1: "Chicken"}, {strIngredient2: "Beef"}  ]
  const [search, setSearch] = useState('');


  const fetchRecipes = async (searchTerm) => {
    const response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
    const data = await response.json();
    setRecipes(data.meals);
    console.log(data.meals);
  }

  const onKeyUp = (e) => {
    const { value } = e.target;
    const filtered = ingredients.filter((ingredient) => {
      if (ingredient.strIngredient.toLowerCase().includes(value.toLowerCase())) {
        return ingredient
      }
    })
    setFilteredIngredients(filtered)
  }

  useEffect(() => {

    const fetchIngredients = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setIngredients(data.meals);
    }

    fetchIngredients()
  }, [])


  return (
    <main className="bg-yellow-50 min-h-screen flex">
      <div className='p-4 border-r w-1/5 flex flex-col h-screen space-y-2'>
        <div>
          <h2 className='text-2xl font-bold'>Ingredients</h2>
          <input type='text' placeholder='Search' className='border p-2' onKeyUp={(e) => onKeyUp(e)} />
        </div>
        <div className='bg-white h-screen overflow-scroll flex-1 border cursor-pointer'>
          {
            filteredIngredients.map((ingredient) => <div onClick={() => fetchRecipes(ingredient.strIngredient)} className='p-2 rounded-lg px-4 hover:bg-blue-100' key={ingredient.idIngredient}>{ingredient.strIngredient}</div>)
          }
        </div>
      </div>
      <div className='overflow-scroll h-screen'>
        <div className='grid grid-cols-4 gap-4 p-4 '>
          {
            recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
          }
        </div>
      </div>
    </main>
  );
}

export default App;
