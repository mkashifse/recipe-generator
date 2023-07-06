import { useEffect, useState } from 'react';
import './App.css';
import RecipeCard from './components/RecipeCard';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]); // [ {strIngredient1: "Chicken"}, {strIngredient2: "Beef"}  ]
  const [selectedIngredient, setSelectedIngredient] = useState('');


  const fetchRecipes = async (searchTerm) => {
    setSelectedIngredient(searchTerm)
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
      const meals = data.meals.map((meal) => {
        return {
          ...meal,
          thumbnail: `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png`
        }
      })
      if (data.meals) {

        setIngredients(meals);
        setFilteredIngredients(meals);
      } else {
        setIngredients([]);
        setFilteredIngredients([]);
      }
    }

    fetchIngredients()
  }, [])

  return (
    <div className='flex h-screen py-8'>
      <div className='w-1/5 px-4 flex flex-col'>
        <h2 className='text-gray-700 font-bold'>Ingredients</h2>
        <div>
          <input type='text' placeholder='Search' className='border w-full p-2 rounded-lg' onKeyUp={(e) => onKeyUp(e)} />
        </div>
        <div className='flex-1 overflow-scroll cursor-pointer'>
          {
            filteredIngredients.map((ingredient) => <div onClick={() => fetchRecipes(ingredient.strIngredient)}
              className='p-2 rounded-lg px-2 space-x-4 border-b border-gray-100 hover:bg-blue-100 flex  items-center' key={ingredient.idIngredient}>
              <div>
                <img className='w-8 rounded' src={ingredient.thumbnail} alt={ingredient.thumbnail}></img>
              </div>
              <div>
                {ingredient.strIngredient}
              </div>

            </div>)
          }
        </div>
      </div>
      <div className='w-4/5 px-4 border-l overflow-scroll'>
        <div className='justify-between mb-2 -ml-4 fixed bg-white px-4 border p-2 rounded-r-xl shadow-xl'>
          <h2 className='text-gray-700 font-bold text-lg'>Recipes with {selectedIngredient}</h2>
          <div className='text-gray-500 text-sm'> Total Number of Recipes {recipes.length} </div>
        </div>
        <div className='grid grid-cols-4 gap-8 mt-20'>
          {
            recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
