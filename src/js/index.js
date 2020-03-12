import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';


// Global state of the app
// -> Search object
// -> Current recipe object
// -> Shopping list object
// -> Liked recipes
const state = {};


// ----- SEARCH CONTROLLER -----
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add it to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // try catch for if the promise | getResult fails
        try {
            // 4) Search for recipes
            await state.search.getResults(); // Returns a promise as getResult is async fun
            // So we need to wait for the getResult/promise to come too

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something wrong with the search...');
            clearLoader();
        }
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    // prevent page to reload on refresh
    e.preventDefault();   
    controlSearch(); 
});

// Use event deligation for pagination buttons as 
// they are not already present on the page
elements.searchResPages.addEventListener('click', e => {
    // Closest finds the closest element which Has btn-inline class
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        // dataset.goto to access data-goto attribute
        const goToPage = parseInt(btn.dataset.goto, 10);
        // Clear previous buttons before calling new
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});

// ----- RECIPE CONTROLLER -----
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

    // Only do if we have an ID
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) { // only if a search exist 
            searchView.highlightSelected(id);
        }
        
        // Create new recipe object
        state.recipe = new Recipe(id);


        // Adding try catch to handle error if we the promise/getRecipe() fails 
        try {
            // Get recipe data and parse Ingredients| await as we have to wait for promise to come back from getRecipe()
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error processing recipe!');
        }
        
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));