
const searchMeal = () => {
    const searchInput = document.getElementById("meal-search").value.trim(); 

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals) {
                displayMeals(data.meals); 
            } 
            else 
            {
                const cont = document.getElementById("meal-container");
                cont.innerHTML = `
                <p class="meal-p">The food is not found</p>
                `;
            }
        });
};


const displayMeals = (meals) => {
    const mealContainer = document.getElementById("meal-container");
    mealContainer.innerHTML = ""; 

    meals.forEach((meal) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img" onclick="showMealDetails('${meal.idMeal}')">
            <h3>${meal.strMeal}</h3>
        `;
        mealContainer.appendChild(div);
    });
};

const showMealDetails = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];

            const single = document.getElementById("single-meal");
            single.innerHTML = "";
            const div = document.createElement("div");
            div.classList.add("si-card");
            div.innerHTML = `
            <img src="${meal.strMealThumb}" class="meal-img">
            <h3>Meal: ${meal.strMeal} </h3>
            <p>Category: ${meal.strCategory}</p>
            <p>Area: ${meal.strArea}</p>
            <p>Description: ${meal.strInstructions.slice(0,70)}</p>
            `;
            single.appendChild(div);
        });
};

document.getElementById("search-btn").addEventListener("click", searchMeal);
searchMeal();