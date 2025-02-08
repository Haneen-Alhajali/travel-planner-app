import { updateUI } from './updateUI';
const handleSubmit = async (event) => {

    event.preventDefault();

    const locationInput = document.getElementById("location");
    const departDateInput = document.getElementById("depart");

    const location = locationInput.value.trim();
    const departDate = departDateInput.value.trim();

    if (!location || !departDate) {
        alert("⛔ Please make sure to enter both a location and a departure date. 🌍✈️");
        return;
    }

    // Check if the departure date is before the current date
    const today = new Date();
    const travelDate = new Date(departDate);

    if (travelDate < today) {
        alert("⚠️ The departure date is in the past! Please choose a future date. 📅⏳");
        return;
    }

    // Check if the location contains only letters and spaces
    const locationRegex = /^[A-Za-z\s,]+$/;
    if (!locationRegex.test(location)) {
        alert("⚠️ Please enter a valid location name (letters, spaces, and commas only). 🌍");
        return;
    }
    

    try {
        const response = await fetch("http://localhost:8082/getTripData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ destination: location, travelDate: departDate }),
        });

        if (!response.ok) {
            throw new Error("⚠️ Something went wrong with the server. Please try again later. 🚧");
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        updateUI(data);  // Update UI with fetched data

        // Clear form fields after successful submission
        locationInput.value = "";
        departDateInput.value = "";

    } catch (error) {
        // Handle different error types and display appropriate messages
        if (error.message.includes("NetworkError")) {
            alert("🌐 It seems there was an issue connecting to the server. Please check your internet connection or try again later. 🔌");
        } else if (error.message.includes("Server error")) {
            alert("🚨 We couldn't retrieve your trip data right now. Please try again later. ⏳");
        } else {
            alert("😥 Oops! Something went wrong. ⚠️ Server issue detected. Please try again later. 🔄");
        }
    }
};

export { handleSubmit };