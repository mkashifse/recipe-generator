import { useEffect, useState } from 'react';
import './App.css';
import RecipeCard from './components/RecipeCard';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]); // [ {strIngredient1: "Chicken"}, {strIngredient2: "Beef"}  ]
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchRecipes = async (searchTerm) => {
    setSelectedIngredient(searchTerm)
    const response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
    const data = await response.json();
    setRecipes(data.meals);
    console.log(data.meals);
  }

  const fetchRecipe = async (id) => {
    const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
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

  const formatRecipe = (meal) => {
    meal.ingredients = []
    for (let i = 1; i <= 20; i++) {
      const key = "strIngredient" + i;
      if (meal[key]) {
        meal.ingredients.push({
          name: meal[key],
          measure: meal["strMeasure" + i],
          thumbnail: `https://www.themealdb.com/images/ingredients/${meal[key]}-Small.png`
        })
      }
    }
    return meal;
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



  const onViewRecipe = async (recipe) => {
    setShowModal(true);
    let recipeData = await fetchRecipe(recipe.idMeal);
    setSelectedRecipe(formatRecipe(recipeData));
    console.log(formatRecipe(recipeData))
  }

  return (
    <div className='flex h-screen py-8'>
      {
        showModal &&
        <div onClick={(e) => { setShowModal(false) }} className='fixed top-0  left-0 p-8 bg-black bg-opacity-80 w-full h-screen z-10'>
          <div onClick={(e) => e.stopPropagation()} className='w-3/4 flex space-x-4 p-8 h-full m-auto bg-white shadow-2xl rounded-3xl'>
            <div className='border'>
              <div>
                <h1 className='text-lg font-bold text-gray-600'>{selectedRecipe.strMeal}</h1>
                <p className='text-sm text-gray-500'>{selectedRecipe.strCategory}</p>
              </div>
              {
                selectedRecipe && selectedRecipe.ingredients.map((ingredient) => (
                  <div className='grid grid-cols-12 gap-2  w-full space-x-4 items-center' key={ingredient.name}>
                    <div className='col-span-1'>
                      <img className='w-8 rounded' src={ingredient.thumbnail} alt={ingredient.thumbnail}></img>
                    </div>
                    <div className='col-span-5'>
                      {ingredient.name}
                    </div>
                    <div className='col-span-5'>
                      {ingredient.measure}
                    </div>
                  </div>))
              }
            </div>
            <div className='flex-1'>
              {selectedRecipe && <textarea className='w-full h-full border-l px-4'>
                {selectedRecipe.strInstructions}
              </textarea>}
            </div>
          </div>
        </div>
      }

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
            recipes.map((recipe) => <RecipeCard onViewRecipe={(recipe) => onViewRecipe(recipe)} key={recipe.idMeal} recipe={recipe} />)
          }
        </div>
      </div>
    </div >
  );
}

export default App;
