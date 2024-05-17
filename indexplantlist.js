
// Retrieve stored plant data from localStorage
const storedPlants = JSON.parse(localStorage.getItem("plants")) || [];
const plants = [...storedPlants];

// Function to add a plant to the table
function addPlant() {
    const name = document.getElementById("plant-name").value;
    const location = document.getElementById("plant-location").value;
    const batch = document.getElementById("batch-number").value;
    const description = document.getElementById("plant-description").value;

    if (name && location && batch && description) {
        plants.push({ name, location, batch, description });
        updateTable();
        clearForm();
        saveToLocalStorage(); // Save data to localStorage
    }
}

// Function to update the table
function updateTable() {
    const tableBody = document.querySelector("#plant-table tbody");
    tableBody.innerHTML = "";

    plants.forEach((plant, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${plant.name}</td>
            <td>${plant.location}</td>
            <td>${plant.batch}</td>
            <td>${plant.description}</td>
            <td><button class="remove-button" onclick="removePlant(${index})">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to remove a plant from the table
function removePlant(index) {
    plants.splice(index, 1);
    updateTable();
    saveToLocalStorage(); // Save data to localStorage
}

// Function to clear the input form
function clearForm() {
    document.getElementById("plant-name").value = "";
    document.getElementById("plant-location").value = "";
    document.getElementById("batch-number").value = "";
    document.getElementById("plant-description").value = "";
}

// Save plant data to localStorage whenever it changes
function saveToLocalStorage() {
    localStorage.setItem("plants", JSON.stringify(plants));
}

// Initial table update
updateTable();
