import Search from './models/Search';

// Global state of the app
// -> Search object
// -> Current recipe object
// -> Shopping list object
// -> Liked recipes
const state = {};

const controlSearch = async () => {
    // 1) Get query from view
    const query = 'pizza'; //TODO for view model

    if (query) {
        // 2) New search object and add it to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults(); // Returns a promise as getResult is async fun
        // So we need to wait for the getResult/promise to come too

        // 5) Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();   
    controlSearch(); 
});