document.addEventListener("DOMContentLoaded", function () {
  const customDrinkSection = document.querySelector(".custom-drink-section");
  const customButton = document.querySelector(".custom-button");

  customDrinkSection.style.display = "none";

  customButton.addEventListener("click", function () {
    customDrinkSection.style.display = "block";
  });
});
