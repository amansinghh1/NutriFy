
# 🥗 NuriFy – Meal Tracker Web App

**NuriFy** is a responsive web application that helps users calculate nutritional values of their meals in real-time based on ingredients they input. Built with HTML, Tailwind CSS, and JavaScript, the app integrates with the Spoonacular API to fetch live nutritional data.

---

## 🚀 Features

- 🔍 Ingredient search with support for quantities (e.g., `100g rice`, `2 pcs egg`)
- 📊 Real-time nutrient updates (Calories, Protein, Carbs, Fats, Fiber, Sodium)
- 📈 Macronutrient distribution bars
- 📦 Daily intake target tracking
- 💾 Save and share meal features

---


## 📦 Technologies Used

- HTML5
- Tailwind CSS
- JavaScript (Vanilla)
- [Spoonacular API](https://spoonacular.com/food-api)

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/amansinghh1/Nutrify.git
cd Nutrify
```

### 2. Open the Project

You can open `index.html` directly in your browser.

---

## 🔑 Get a Free Spoonacular API Key

This project uses the Spoonacular Food API for ingredient search and nutrition data.

### Steps to Get Your API Key:

1. Go to [https://spoonacular.com/food-api](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Once logged in, go to the **Dashboard**
4. Copy your free API key
5. In `script.js` or wherever the key is referenced, **replace this line**:

```js
const apiKey = "your_api_key_here";
```

✅ Done! You’re now ready to use the app.

---

## 📌 Notes

- Free tier of Spoonacular has a daily request limit (~150/day)
- If requests fail or say "ingredient not found", it may be due to API quota being exceeded
- You can customize ingredient unit-to-grams conversion in the `pcsToGrams` object

---

## 🛠️ Future Improvements

- 🔄 Persistent meal history (localStorage or database)
- 📷 Barcode scanner for packaged foods (mobile)
- 📋 PDF report export
- 🌐 Multiple language support
- 🧠 AI diet suggestions

---

## 🙌 Contributing

Feel free to fork the repo and submit a pull request. All contributions are welcome!

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

## ✨ Author

Made with ❤️ by [Aman Singh](https://github.com/amansinghh1)
