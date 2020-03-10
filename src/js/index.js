import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


// Global state of the app
// -> Search object
// -> Current recipe object
// -> Shopping list object
// -> Liked recipes
const state = {};

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

        // 4) Search for recipes
        await state.search.getResults(); // Returns a promise as getResult is async fun
        // So we need to wait for the getResult/promise to come too

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();   
    controlSearch(); 
});

// Use event deligation for pagination buttons as 
// they are not already present on the page
elements.searchResPages.addEventListener('click', e => {
    // Closest finds the closest element which jas btn-inline class
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