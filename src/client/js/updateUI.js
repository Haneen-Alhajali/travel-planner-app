const DEFAULT_IMAGE_URL = 'https://dummyimage.com/300x200/000/fff&text=No+Image+Found';

const updateUI = (data) => {
    // Check if essential data exists
    if (!data || !data.destination || !data.weather) {
        window.alert("❗ Missing trip data! Please ensure all fields are correctly filled. 🚫");
        return;
    }

    const tripList = document.getElementById("trip-list");

    // 🛑 Check if the same trip is already added before appending
    const existingTrips = Array.from(tripList.getElementsByClassName("trip-card"));
    const isDuplicate = existingTrips.some(trip =>
        trip.dataset.destination === data.destination &&
        trip.dataset.travelDate === data.travelDate
    );

    if (isDuplicate) {
        alert("🚨 This trip has already been added! Please check your entries. 🚫");
        return; // Prevent adding the same trip twice
    }

    const tripCard = document.createElement("div");
    tripCard.classList.add("trip-card");

    tripCard.dataset.destination = data.destination;
    tripCard.dataset.travelDate = data.travelDate;

    tripCard.innerHTML = `
        <img src="${data.imageUrl || DEFAULT_IMAGE_URL}" alt="Trip Image">
        <div class="trip-info">
            <h2>My trip to: <strong>${data.destination}</strong></h2>
            <h2>Departing:  ${data.travelDate}</h2>
            <div class="buttons">
                <button class="remove-btn">Remove Trip</button>
            </div>
            <p class="distance">${data.destination} is ${data.countdown} days away</p>
            <p class="weather-title">Typical weather for then is:</p>
            <p class="weather">High: ${data.weather.highTemp}°C, Low: ${data.weather.lowTemp}°C</p>
            <p class="weather-detail">${data.weather.description}</p>
        </div>
    `;


    try {
        tripList.appendChild(tripCard);
    } catch (error) {
        alert("⚠️ There was an issue adding the trip to the list. Please try again. 😥");
    }
};

export { updateUI };