export default function RecipeCard(props) {
  const { strMeal, strMealThumb } = props.recipe;

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 flex flex-col ">
      <div >
        <img className="rounded-lg m-auto shadow" src={strMealThumb} alt="thumbnail" />
      </div>
      <h1 className="font-bold my-2 text-gray-600 text-center flex-1">{strMeal}</h1>
      <div className="border-t pt-4 flex justify-center">
        <button className="bg-red-600 w-full text-sm text-white rounded-lg p-2 px-4">
          View Recipe
        </button>
      </div>
    </div>
  );
}
