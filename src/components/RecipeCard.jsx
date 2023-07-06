export default function RecipeCard(props) {
  const { strMeal, strMealThumb } = props.recipe;

  return (
    <div className="bg-white border rounded-xl shadow-xl flex flex-col ">
      <div>
        <img className="rounded-t-xl " src={strMealThumb} alt="thumbnail" />
      </div>
      <h1 className="font-bold my-2 text-gray-600 px-4 flex-1">
        {strMeal}
      </h1>
      <div className="px-4 w-full">
        <div className="border-t"></div>
      </div>
      <div className="px-4 pb-4">
        <div className=" mt-4">
          <button className="bg-red-600  text-sm text-white rounded-lg p-2 px-4">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
