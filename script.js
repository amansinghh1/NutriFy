const apiKey = "API-KEY"; // Add Spoonacular Api key
  const ingredientList = document.getElementById("ingredient-list");
  let total = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 };

  const pcsToGrams = {
  egg: 50,
  banana: 120,
  apple: 150,
  bread: 30,
  chapati: 40,
  roti: 50
  // You can add more as needed
};


  async function addIngredient() {
  const input = document.getElementById("ingredient-input");
  const fullInput = input.value.trim().toLowerCase();
  if (!fullInput) return;

  const match = fullInput.match(/^([\d.]+)\s*(g|ml|pcs)?\s*(.+)$/i);
  let amount = 100, unit = "g", query;

  if (match) {
  amount = parseFloat(match[1]);
  unit = match[2] || "g";
  query = match[3];

  if (unit === "pcs") {
    const grams = pcsToGrams[query] || 100; // fallback to 100g if unknown
    amount = amount * grams;
    unit = "g";
  }
} else {
  query = fullInput;
}


  const searchRes = await fetch(
    `https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${encodeURIComponent(query)}&number=1`
  );
  const searchData = await searchRes.json();
  if (!searchData.results || searchData.results.length === 0) {
    alert("Ingredient not found.");
    return;
  }

  const ingredientId = searchData.results[0].id;
  const infoRes = await fetch(
    `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?apiKey=${apiKey}&amount=${amount}&unit=${unit}`
  );
  const infoData = await infoRes.json();
  const nutrients = infoData.nutrition.nutrients;

  const get = (name) => nutrients.find(n => n.name === name)?.amount || 0;

  const cal = get("Calories");
  const protein = get("Protein");
  const carbs = get("Carbohydrates");
  const fat = get("Fat");
  const fiber = get("Fiber");
  const sodium = get("Sodium");

  total.calories += cal;
  total.protein += protein;
  total.carbs += carbs;
  total.fat += fat;
  total.fiber += fiber;
  total.sodium += sodium;

  const div = document.createElement("div");
  div.className = "flex justify-between items-center border-b pb-1 text-sm text-gray-700";
  div.innerHTML = `
    <span>${amount}${unit} ${query}</span>
    <span>${Math.round(cal)} cal | ${protein.toFixed(1)}g protein | ${carbs.toFixed(1)}g carbs | ${fat.toFixed(1)}g fat</span>
    <button onclick="deleteItem(this, ${cal}, ${protein}, ${carbs}, ${fat}, ${fiber}, ${sodium})" class="ml-2 text-red-500 hover:text-red-700">✖</button>
  `;
  ingredientList.appendChild(div);
  input.value = "";
  updateTotals();
}



  function deleteItem(button, cal, protein, carbs, fat, fiber, sodium) {
    total.calories -= cal;
    total.protein -= protein;
    total.carbs -= carbs;
    total.fat -= fat;
    total.fiber -= fiber;
    total.sodium -= sodium;
    button.parentElement.remove();
    updateTotals();
  }

  function updateTotals() {
  // Update values
  document.getElementById("total-calories").textContent = `${Math.round(total.calories)} kcal`;
  document.getElementById("total-protein").textContent = `${total.protein.toFixed(1)}g`;
  document.getElementById("total-carbs").textContent = `${total.carbs.toFixed(1)}g`;
  document.getElementById("total-fat").textContent = `${total.fat.toFixed(1)}g`;
  document.getElementById("total-fiber").textContent = `${total.fiber.toFixed(1)}g`;
  document.getElementById("total-sodium").textContent = `${Math.round(total.sodium)}mg`;

  // Update daily % progress bars
  document.getElementById("bar-protein").style.width = `${Math.min((total.protein / 50) * 100, 100)}%`;
  document.getElementById("bar-carbs").style.width = `${Math.min((total.carbs / 250) * 100, 100)}%`;
  document.getElementById("bar-fat").style.width = `${Math.min((total.fat / 65) * 100, 100)}%`;

  // Update daily % text below each nutrient
  document.getElementById("calorie-percent").textContent = `${Math.round((total.calories / 2000) * 100)}% of 2000 cal daily target`;
  document.getElementById("protein-percent").textContent = `${Math.round((total.protein / 50) * 100)}% of daily target 50g`;
  document.getElementById("carbs-percent").textContent = `${Math.round((total.carbs / 250) * 100)}% of daily target 250g`;
  document.getElementById("fat-percent").textContent = `${Math.round((total.fat / 65) * 100)}% of daily target 65g`;
  document.getElementById("fiber-percent").textContent = `${Math.round((total.fiber / 25) * 100)}% of daily target 25g`;
  document.getElementById("sodium-percent").textContent = `${Math.round((total.sodium / 2300) * 100)}% of daily target 2300mg`;
}


  function clearAll() {
    ingredientList.innerHTML = "";
    total = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 };
    updateTotals();
  }

  function saveMeal() {
    alert("Meal saved locally! (To connect DB, add backend later)");
  }

  function shareMeal() {
    alert("Sharing feature coming soon!");
  }
