
const serachButton = document.getElementById('search-btn');
const foodItems = document.getElementById('food-items');
const megError = document.getElementById('error-message');
const mealDeatilsContainer = document.getElementById('meal-deatils-container');
const showAllContainer = document.getElementById('showAll-conatiner');
const showAllBtn = document.getElementById('btn-showAll');

 const getAllFood =()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.trim();
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
    fetch(url)
    .then(respons => respons.json())
    .then(data => getItemsData(data.meals))

    foodItems.innerHTML = '';
    searchField.value = '';
 }
 
 const getFoodDetails = (e)=>{

    if(e.target.classList.contains('get-recipe-btn')){
        let foodItem =e.target.parentElement.parentElement.parentElement;
        const foodItemUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`;
        fetch(foodItemUrl)
        .then(res => res.json())
        .then(data => getMealItemDetails(data.meals[0]))
    }
 }


 serachButton.addEventListener('click', getAllFood);
 foodItems.addEventListener('click', getFoodDetails);

const getItemsData =(data)=>{
    
    if(data){
        
        data.forEach(meal => {
             megError.classList.add('hidden');

            foodItems.innerHTML += `
            <div data-id="${meal.idMeal}" class="card w-full md:w-96  lg:w-96 xl:w-96 glass">
                <figure><img src="${meal.strMealThumb}" alt="Not Found Image" /></figure>
                    <div class="card-body">
                        <h2 class="card-title text-center">${meal.strMeal}</h2>
                    <div class="card-actions justify-center">
                        <button
                        class="btn btn-primary text-white get-recipe-btn"
                        onclick="my_modal_1.showModal()"
                        >
                        Get Recipe
                        </button>
                </div>
             </div>
            </div>
    `;

        });
    } else{
        megError.classList.remove('hidden');
        foodItems.innerHTML ='';
    }

    return data;
}

const getMealItemDetails =(data)=>{
    console.log(data);
    document.getElementById('food-name').innerText = data.strMeal;
    document.getElementById('food-category').innerText = data.strCategory;
    document.getElementById('food-instruction').innerText = data.strInstructions;
    document.getElementById('food-img').src = data.strMealThumb;
    document.getElementById('btn-youtube').href = data.strYoutube;
}


    getAllFood(); 
    