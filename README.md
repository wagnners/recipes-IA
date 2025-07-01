
<p align="center">
   <img src="./public/assets/icons/logo.svg" width="200" alt="Logo" />
</p>
# 🍳 Cozinhou - AI-Powered Recipe Generator

**Cozinhou** is a modern web application built with **Next.js** that allows users to generate quick and creative recipes based on selected ingredients. It leverages the power of **OpenAI** to create human-like cooking instructions and intelligently suggest relevant keywords to improve image search results from **Unsplash**.

# 🚀 Live Demo

Check out the project live [here.](https://recipes-ia.vercel.app)

## ⚡ Features

- 🧠 Generate unique recipes using AI with just a list of ingredients
- 🌍 Titles in both Portuguese and English
- 📝 AI-generated short cooking instructions
- 🖼️ Smart keyword generation for Unsplash image search
- 💡 Clean and responsive UI with Tailwind CSS
- 🧩 Component-based architecture

---

## 🚀 Getting Started

Clone the repository:

```bashh
git clone https://github.com/wagnners/recipes-IA.git
cd recipes-ai
```
### Install dependencies
```bash
npm install
# or
yarn
```

# 🧠 Powered by OpenAI

This project uses OpenAI's GPT-3.5-turbo model to:

- Generate realistic recipes from user-provided ingredients
- Translate recipe titles to English
- Suggest optimized image search keywords to match recipe context

All this happens in a single API call, improving speed and reducing complexity.

---

# 🖼️ Unsplash Integration

- Uses the Unsplash API to fetch visually appealing food-related images.
- AI-generated keywords help filter more accurate and relevant images.
- If the title includes animal names like “chicken” or “rabbit”, additional terms like "cooked", "dish", or "meal" are appended to avoid raw animal images.

---

# 🛠️ Tech Stack

- Next.js (React framework)
- TypeScript
- OpenAI API (chat completions)
- Unsplash API (image search)
- Tailwind CSS (utility-first styling)
- React Hook Form (form handling)
- Vercel (deployment)
- ESLint + Prettier (code formatting and linting)

---

# 📁 Project Structure

```bash
/components       → Reusable UI components  
/app/api          → API routes (OpenAI + Unsplash logic)  
/app              → Pages and layout  
/lib              → Utility functions and helpers  
/public/assets    → Static assets like logo  
```
# 📄 License

This project is licensed under the MIT License.

---

# 🙌 Acknowledgments

- OpenAI
- Unsplash
- Next.js
- Tailwind CSS

Made with ❤️ by Wagner Luz

