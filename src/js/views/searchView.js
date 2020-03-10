import { elements } from './base';

// When arrorw function is 1 line it is implicit return 
// Will automatically return the value
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    // We wrapped this into brackets insted of single line
    // A single line fun automatically returns that we dont want here 
    elements.searchInput.value = '';
};

export const clearResults = () => {
    // to delete li elements of previous search
    elements.searchResList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
    
    // Here we are actually adding things in an array which is
    // not changing the underlying variable thats why we can use const here
    // same can be done with objs
    const newTitle = [];

    // First check if length of text is longer than limit not
    if (title.length > limit) {
        // Split title which gives an array then using reduce bass callback fun
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit ) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        // reduce has a acc by default
        // acculumator starts from 0

        // return result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    //href=#23456 is the id for recipe
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt=${limitRecipeTitle(recipe.title)}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    // Call render recipe for each recipe
    recipes.forEach(renderRecipe);
};