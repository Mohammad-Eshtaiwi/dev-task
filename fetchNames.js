export function fetchData(selectedCategories = []) {
    // URL to fetch data from
    // URL to fetch data from
    let url = 'http://filltext.com/?rows=20&fname={firstName}&lname={lastName}';

    // Append selected categories to the URL
    if (selectedCategories.length > 0) {
        url += '&category=' + encodeURIComponent(JSON.stringify(selectedCategories));
    }
    if (selectedCategories.length === 0) {
        url = 'http://filltext.com/?rows=20&fname={firstName}&lname={lastName}&category=[%22category1%22,%20%22category2%22%20,%20%22category3%22%20]';
    }

    // Fetch data
    fetch(url)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse response as JSON
            return response.json();
        })
        .then(data => {
            // Data fetched successfully, do something with it
            console.log(data);
            // Example: Display data on the webpage
            displayData(data);
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
}
function displayData(data) {
    const container = document.getElementById('cards');
    container.innerHTML = ''; // Clear previous data

    data.forEach(item => {
        // Create card element
        const card = document.createElement('li');
        card.classList.add('card');

        // Create avatar section
        const avatar = document.createElement('aside');
        avatar.classList.add('card__avatar');

        // Create span elements for each letter
        const firstNameLetter = document.createElement('span');
        firstNameLetter.textContent = item.fname.charAt(0);
        const lastNameLetter = document.createElement('span');
        lastNameLetter.textContent = item.lname.charAt(0);

        // Append both span elements to the avatar
        avatar.appendChild(firstNameLetter);
        avatar.appendChild(lastNameLetter);

        card.appendChild(avatar);

        // Create content section
        const content = document.createElement('div');
        content.classList.add('card__content');
        const firstNameSpan = document.createElement('span');
        firstNameSpan.textContent = item.fname;
        const lastNameSpan = document.createElement('span');
        lastNameSpan.textContent = item.lname;
        content.appendChild(firstNameSpan);
        content.appendChild(lastNameSpan);
        card.appendChild(content);

        // Create category section
        const category = document.createElement('div');
        category.classList.add('card__category');
        category.textContent = category.textContent = item.category;
        card.appendChild(category);

        // Append card to container
        container.appendChild(card);
    });
}



function setupFilterButtons() {
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

setupFilterButtons()