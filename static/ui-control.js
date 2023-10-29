document.addEventListener("DOMContentLoaded", function () {
  const selectedDrink = document.getElementById("selectedDrink");
  const customDrinkSection = document.querySelector(".custom-drink-section");
  const setFreezingTimeSection = document.querySelector(
    ".set-freezing-time-section"
  );
  customDrinkSection.style.display = "none";
  setFreezingTimeSection.style.display = "none";

  selectedDrink.addEventListener("change", function () {
    if (selectedDrink.value === "Custom") {
      customDrinkSection.style.display = "block";
      setFreezingTimeSection.style.display = "block";
    } else {
      customDrinkSection.style.display = "none";
      setFreezingTimeSection.style.display = "none";
    }
  });
});

// Functions for applying responsive styles into area-section
function updateAreaStyle() {
  const area = document.querySelector(".area");
  if (area) {
    // Get screen height
    const screenHeight = window.innerHeight;

    //Set the area height according to the screen height
    area.style.height = `${screenHeight}px`;
  }
}

// Update styles every time the screen size changes
window.addEventListener("resize", updateAreaStyle);

//Set styles also on page load
window.addEventListener("load", updateAreaStyle);

// Perform initial settings
updateAreaStyle();
