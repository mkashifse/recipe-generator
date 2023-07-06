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
      setIngredients(data.meals);
      setFilteredIngredients(data.meals);
    }

    fetchIngredients()
  }, [])

  /*
  <main className="bg-yellow-50 min-h-screen ">
        <div className='flex justify-between items-center p-4 fixed bg-white w-full'>
          <h2 className='text-2xl font-bold'>{selectedIngredient}</h2>
          <div className='text-sm text-gray-600 font-medium'>Total Recipes Found {recipes.length} </div>
        </div>
        <div className='flex pt-16'>
          <div className='p-4 border-r w-1/5 flex flex-col h-screen space-y-2'>
            <div>
              <h2 className='font-bold'>Ingredients</h2>
              <input type='text' placeholder='Search' className='border w-full p-2 rounded-lg' onKeyUp={(e) => onKeyUp(e)} />
            </div>
            <div className='bg-white p-2 rounded-lg h-screen overflow-scroll flex-1 border cursor-pointer'>
              
            </div>
          </div>
          <div className='overflow-scroll h-screen w-4/5'>
  
            
          </div>
        </div>
      </main>
  
  */
  return (
    <div className='flex h-screen py-8'>
      <div className='w-1/5 px-4 flex flex-col'>
        <h2 className='text-gray-700 font-bold'>Ingredients</h2>
        <div>
          <input type='text' placeholder='Search' className='border w-full p-2 rounded-lg' onKeyUp={(e) => onKeyUp(e)} />
        </div>
        <div className='flex-1 overflow-scroll cursor-pointer'>
          {
            filteredIngredients.map((ingredient) => <div onClick={() => fetchRecipes(ingredient.strIngredient)} className='p-2 rounded-lg px-4 hover:bg-blue-100' key={ingredient.idIngredient}>{ingredient.strIngredient}</div>)
          }
        </div>
      </div>
      <div className='w-4/5 px-4 border-l overflow-scroll'>
        <div className='grid grid-cols-4 gap-4'>
          {
            recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
