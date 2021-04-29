// take input
const inputItem = document.getElementById("input");

document.getElementById("search-button").addEventListener("click",() => {
    document.getElementById("show-item").innerHTML = "";
        if (inputItem.value != "" && inputItem.value.length ) {
            searchFoodBySingleAlphabet(inputItem.value); 
        }

        inputItem.value = "";
})
// show item when input first letter of food
input.addEventListener("input",() => {
    document.getElementById("show-item").innerHTML = "";
    searchFoodBySingleAlphabet(input.value);
    inputItem.value = "";
})
// convert data into jason 
const searchFoodBySingleAlphabet = food => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${food}`)
    .then(response => response.json())
    .then(data => showFood(data))
}
// show data
const showFood = data => {
//    if data is null
    const foodItems = document.getElementById("show-item");

    if (data.meals === null) {
        
        foodItems.style.display = "none";
        document.getElementById("input").style.display = "none";
        document.getElementById("search-button").style.display = "none";

        const showErrorMessage = document.getElementById("error-message");

        const h3 = document.createElement("h3");
        const img = document.createElement("img");

        img.setAttribute("src","error-search.png")
        img.className = "img-color";
        h3.innerText = "Opps ! something wrong";
        h3.className = "error-messege-color";

        showErrorMessage.appendChild(img);
        showErrorMessage.appendChild(h3);
        
// back button
        const button = document.createElement("button");
        button.innerText = "Back";
        button.className = "back-btn";
        button.addEventListener("click",() => {
            showErrorMessage.style.display = "none";

            document.getElementById("input").style.display = "block";
            document.getElementById("search-button").style.display = "block";
        })

        showErrorMessage.appendChild(button);

        
    }
// if data is not null
    else{
        data.meals.forEach(food => {
            const singleItem = document.createElement("div");
            singleItem.className = "single-div"
            foodInfo = `
                <img class ="image" src = "${food.strMealThumb}">
                <p class = "text">${food.strMeal}<p>

            `
            singleItem.innerHTML = foodInfo;
            foodItems.appendChild(singleItem);
// when click in a item
            singleItem.addEventListener("click",() =>{
                const ul = document.createElement("ul");
                

                foodItems.style.display = "none";
                document.getElementById("input").style.display = "none";
                document.getElementById("search-button").style.display = "none";

                const showIngredients = document.getElementById("ingredients");

                const arrayOfStrIngredient = [];
                const arrayOfStrMeasure = [];

                const key = Object.keys(food);
                const value = Object.values(food);
// about ingredients
                const ingredientsTitle = `
                <img class ="image" src = "${food.strMealThumb}">
                <h3 class = "text-style">${food.strMeal}</h3>
                <h4 class = "text-style">ingredients:</h4>
                `
                for (let i in key,value) {
                    if (key[i].startsWith("strIngredient") && value[i] != "" && value[i] != null) {
                        arrayOfStrIngredient.push(key[i]);
                    }
                    else if(key[i].startsWith("strMeasure") && value[i] != "" && value[i] != null){
                        arrayOfStrMeasure.push(key[i]); }
                }

                
                for (var j = 0; j < arrayOfStrIngredient.length; j++) {  
                    const li = document.createElement("li");
                    li.className = "li-text";
                    
                    li.innerText = `${food[arrayOfStrIngredient[j]]} ${food[arrayOfStrMeasure[j]]}`
                    ul.appendChild(li);
// back button
                const button = document.createElement("button");
                    button.innerText = "Back";
                    button.className = "back-btn";
                    button.addEventListener("click", () => {
                        showIngredients.style.display = "none";

                        foodItems.style.display = "none";
                        document.getElementById("input").style.display = "block";
                        document.getElementById("search-button").style.display = "block";
                     });

                     
                    showIngredients.style.display = "block";
                    showIngredients.innerHTML = ingredientsTitle;

                    showIngredients.appendChild(ul);
                    showIngredients.appendChild(button);
                    }
            })
     
        });
}

}


// /////////////////////////////////

// fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
// .then(response => response.json())
// .then(data =>displayFood(data))


// const displayFood = data =>{
//     const showFoodInDisplay = document.getElementById("food-item");
//     data.meals.forEach(food => {
//         const createNewDiv = document.createElement("div");
//         const foodItem  = `
//                 <img class ="image" src = "${food.strMealThumb}">
//                 <p class = "text">${food.strMeal}<p>
//             `
//         createNewDiv.innerHTML = foodItem;
//         showFoodInDisplay.appendChild(createNewDiv)

//     })
// }

