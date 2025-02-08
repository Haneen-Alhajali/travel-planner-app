import { handleSubmit } from '../client/js/formHandler';
import { updateUI } from '../client/js/updateUI';

// Generate a dynamic future date (current date +1 day)
const today = new Date();
const nextDay = new Date(today);
nextDay.setDate(today.getDate() + 1);
const futureDate = nextDay.toISOString().split('T')[0]; // Formats as YYYY-MM-DD

// Mock DOM elements
document.body.innerHTML = `
  <form id="trip-form">
    <input id="location" value="Paris" />
    <input id="depart" value="${futureDate}" />
    <button id="submit-btn">Add Trip</button>
  </form>
  <div id="trip-list"></div>
`;

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        destination: "Paris",
        travelDate: futureDate,
        countdown: 10,
        weather: {
          highTemp: 15,
          lowTemp: 5,
          description: "Sunny",
        },
        imageUrl: "https://example.com/paris.jpg",
      }),
  })
);

// Mock window.alert
global.alert = jest.fn();

beforeEach(() => {
  fetch.mockClear();
  global.alert.mockClear();
});

describe('handleSubmit', () => {
  it('should fetch data and call updateUI on valid input', async () => {
    const event = { preventDefault: jest.fn() };
  
    // Manually trigger handleSubmit
    await handleSubmit(event);
  
    // Check that fetch is called with the correct arguments
    expect(fetch).toHaveBeenCalledWith("http://localhost:8082/getTripData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination: "Paris", travelDate: futureDate }),
    });
  
    // Check that the UI update was triggered
    const tripList = document.getElementById("trip-list");
    expect(tripList.innerHTML).toContain("Paris");
    expect(tripList.innerHTML).toContain(futureDate);
  });

  it('should show an alert if location is empty', async () => {
    document.getElementById("location").value = '';
    const event = { preventDefault: jest.fn() };

    await handleSubmit(event);

    expect(global.alert).toHaveBeenCalledWith("⛔ Please make sure to enter both a location and a departure date. 🌍✈️");
  });

  it('should show an alert if departure date is in the past', async () => {
    document.getElementById("location").value = 'Paris';
    document.getElementById("depart").value = '2020-01-01';
    const event = { preventDefault: jest.fn() };

    await handleSubmit(event);

    expect(global.alert).toHaveBeenCalledWith("⚠️ The departure date is in the past! Please choose a future date. 📅⏳");
  });

  it('should show an alert if location contains invalid characters', async () => {
    document.getElementById("location").value = 'Paris123';
    document.getElementById("depart").value = futureDate;
    const event = { preventDefault: jest.fn() };

    await handleSubmit(event);

    expect(global.alert).toHaveBeenCalledWith("⚠️ Please enter a valid location name (letters, spaces, and commas only). 🌍");
  });
});

describe("updateUI", () => {
  it("should add a trip card to the DOM", () => {
    const data = {
      destination: "Paris",
      travelDate: futureDate,
      countdown: 10,
      weather: {
        highTemp: 15,
        lowTemp: 5,
        description: "Sunny",
      },
      imageUrl: "https://example.com/paris.jpg",
    };

    updateUI(data);

    const tripList = document.getElementById("trip-list");
    expect(tripList.innerHTML).toContain("Paris");
    expect(tripList.innerHTML).toContain(futureDate);
    expect(tripList.innerHTML).toContain("Sunny");
  });

  it("should handle missing data", () => {
    const data = null;
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    updateUI(data);

    expect(alertSpy).toHaveBeenCalledWith(
      "❗ Missing trip data! Please ensure all fields are correctly filled. 🚫"
    );
  });

  it("should prevent duplicate trips", () => {
    const data = {
      destination: "Paris",
      travelDate: futureDate,
      countdown: 10,
      weather: {
        highTemp: 15,
        lowTemp: 5,
        description: "Sunny",
      },
      imageUrl: "https://example.com/paris.jpg",
    };

    updateUI(data);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    updateUI(data);

    expect(alertSpy).toHaveBeenCalledWith(
      "🚨 This trip has already been added! Please check your entries. 🚫"
    );
  });
});
