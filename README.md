# 🎬 Movie Explorer App

A beautiful and simple movie discovery web application built with **React + Parcel**, allowing users to explore movies by **genre**, **sort order**, and **mood**, and save their favorite movies using **Redux Toolkit + LocalStorage**.

Powered by the **TMDB API**.

---

## 🚀 Features

### 🔍 Discover Movies  
- Filter movies by **genre**  
- Sort by popularity, rating, or release date  
- Additional **mood-based movie discovery**  
- Fetches filtered movies automatically using TMDB Discover API  

### ⭐ Favorites  
- Add or remove favorite movies with a ❤️ toggle  
- Favorites stored persistently using **LocalStorage**  
- Dedicated **Favorites** page to view saved movies  

### 😎 Mood-Based Recommendations  
- Intuitive mood selections like *Romantic, Funny, Scary, Emotional, Adventure*  
- Each mood is mapped to TMDB genres  
- API fetch automatically updates based on selected mood  

---

## 🛠️ Tech Stack

- **React + Parcel bundler**  
- **React Router**  
- **Redux Toolkit** (favorite state management)  
- **TailwindCSS** (UI styling)  
- **TMDB API** (for movie data)  
- **LocalStorage** (persistent favorites)

---

## 🔧 Setup

1. Clone the repository  
2. Install dependencies:

```bash
npm install
```

3. Create .env file and add your tmdb api
4. Run the project

```bash
npm start
```

## Future enhancements
- Pagination for Discover results
- Movie details page (cast, trailer, story)
- Search bar on navbar
- Dark/Light theme