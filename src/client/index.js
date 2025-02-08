import './styles/main.scss';
import { handleSubmit } from './js/formHandler';


document.addEventListener("DOMContentLoaded", () => {
    const saveTripBtn = document.getElementById("saveTrip");
  
    if (saveTripBtn) {
        // Remove any existing event listeners before adding a new one
        saveTripBtn.replaceWith(saveTripBtn.cloneNode(true));
        
        // Select the new button after replacing
        const newSaveTripBtn = document.getElementById("saveTrip");
        newSaveTripBtn.addEventListener("click", handleSubmit);
    }
  });
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
        event.target.closest(".trip-card").remove();
    }
});
