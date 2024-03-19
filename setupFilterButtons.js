import { fetchData } from "./fetchNames";



export function setupFilterButtons() {
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.btn');
    // Initialize array to store selected categories
    const selectedCategories = [];

    // Add click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle button state
            button.dataset.state = button.dataset.state === 'selected' ? 'not-selected' : 'selected';

            // Update selectedCategories array based on button state
            const category = button.textContent.trim();
            const index = selectedCategories.indexOf(category);
            if (index === -1) {
                selectedCategories.push(category);
            } else {
                selectedCategories.splice(index, 1);
            }

            // Fetch data with updated selected categories, or fetch all data if no categories are selected
            fetchData(selectedCategories.length > 0 ? selectedCategories : []);
        });
    });
}

