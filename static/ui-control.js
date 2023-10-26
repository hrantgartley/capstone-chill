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
