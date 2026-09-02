<div align="center">

<img src="background.png" width="100%" alt="Travel Banner"/>

# 🌍 **TRAVEL MATE** 🌍

### *Your AI-Powered Companion for Exploring Incredible India*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)

---

**TravelMate** is a **personalized travel planner** that generates custom day-by-day itineraries tailored to your interests, budget, and travel vibe — all powered by AI agents working behind the scenes.

> ✨ *Discover India beyond the tourist hotspots.* ✨

---

</div>

## 📖 About

TravelMate was built for the **Smart India Hackathon** to solve a real problem: most travel apps give you the same generic itineraries. TravelMate changes that by letting you define your **travel vibe** — whether you're a heritage enthusiast, a street foodie, a nature lover, or a backpacker — and generates a **fully personalized day-by-day plan** complete with hotels, activities, transport, timings, and cost estimates.

---

## ✨ Features

<table>
<tr>
<td align="center">

🏠 **Smart Hotel Picks**

</td>
<td align="center">

🗺️ **Day-by-Day Itineraries**

</td>
<td align="center">

💰 **Budget-Aware Planning**

</td>
</tr>
<tr>
<td align="center">

🚶 **Route Optimization**

</td>
<td align="center">

🎯 **Interest-Based Discovery**

</td>
<td align="center">

🌙 **8 Travel Vibes**

</td>
</tr>
<tr>
<td align="center">

📱 **Fully Responsive**

</td>
<td align="center">

🔐 **Login/Signup System**

</td>
<td align="center">

⚡ **No Frameworks — Pure Vanilla**

</td>
</tr>
</table>

---

## 🎨 Travel Vibes

Choose from **8 unique traveler personalities**:

| Vibe | Icon | Description |
|------|------|-------------|
| Heritage & Culture | 🏛️ | Ancient forts, temples, palaces, and history |
| Street Food | 🍜 | Authentic local flavors and food trails |
| Nature & Adventure | 🌿 | Mountains, forests, wildlife, and treks |
| Spiritual | 🙏 | Temples, ashrams, meditation, and yoga |
| Photography | 📸 | Scenic viewpoints and Instagrammable spots |
| Luxury | 💎 | Premium hotels, fine dining, and experiences |
| Family | 👨‍👩‍👧‍👦 | Kid-friendly attractions and safe activities |
| Backpacker | 🎒 | Budget hostels, offbeat trails, local life |

---

## 🖥️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Custom properties, Grid, Flexbox, animations |
| **Vanilla JavaScript** | ES6+ async/await, fetch API, DOM manipulation |
| **Google Fonts** | Inter, Playfair Display, DM Sans |
| **Unsplash CDN** | High-quality destination imagery |
| **SVG** | Interactive India map visualization |

> ⚠️ **Zero dependencies.** No frameworks, no build tools, no package manager — just pure hand-crafted code.

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for fetch API to work)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/TravelMate.git

# 2. Navigate to the project
cd TravelMate

# 3. Start a local server (choose one)
python -m http.server        # Python
# OR
npx serve                    # Node.js
# OR
# Use VS Code Live Server extension
```

### Usage

1. Open `index.html` in your browser (or visit `http://localhost:8000`)
2. Fill in the trip planner form with your destination, dates, budget, and vibe
3. Watch the **AI loading animation** as your itinerary is generated
4. Explore your personalized day-by-day plan with hotels, activities, and costs
5. Navigate to `Login-Signup/index.html` for the authentication module

---

## 📁 Project Structure

```
TravelMate/
├── index.html                 # Main landing page
├── app.js                     # Core frontend logic (1,600+ lines)
├── style.css                  # Main styles (2,600+ lines)
│
├── Login-Signup/              # Authentication module
│   ├── index.html             # Login/Signup page
│   ├── script.js              # Auth logic with password strength
│   └── style.css              # Auth page styles
│
├── in.svg                     # Interactive SVG map of India
├── background.png             # Hero section background
├── photo1.png                 # Destinations section
├── photo4.jpeg                # CTA section background
├── photo5.jpeg                # Features section
└── image7.png                 # Trip planner background
```

---

## 🔌 API Reference

<details>
<summary><b>📋 POST /plan — Generate Itinerary</b></summary>

**Request Body:**
```json
{
  "destination": "Varanasi",
  "check_in": "2025-03-15",
  "check_out": "2025-03-18",
  "total_budget": 15000,
  "hotel_budget_per_night": 3000,
  "adults": 2,
  "traveler_vibe": "Spiritual"
}
```

**Response Structure:**
```json
{
  "trip_overview": {
    "destination": "Varanasi",
    "dates": "Mar 15 - Mar 18, 2025",
    "total_days": 4,
    "travel_vibe": "Spiritual"
  },
  "hotel_details": {
    "name": "Hotel Ganges View",
    "area": "Assi Ghat",
    "price_per_night": "₹2,800",
    "rating": 4.5
  },
  "daily_itinerary": [
    {
      "day_number": 1,
      "date": "2025-03-15",
      "day_theme": "Spiritual Awakening",
      "schedule": [
        {
          "time_slot": "05:00 - 07:00",
          "activity_name": "Sunrise at Dashashwamedh Ghat",
          "activity_type": "spiritual",
          "transport_mode": "auto_rickshaw",
          "distance_note": "2.5 km from hotel",
          "est_cost": "₹0"
        }
      ]
    }
  ]
}
```

</details>

<details>
<summary><b>🔐 POST /api/login — User Login</b></summary>

| Field | Type | Required |
|-------|------|----------|
| `email` | string | ✅ |
| `password` | string | ✅ |

> Status: Placeholder (not yet wired to backend)

</details>

<details>
<summary><b>📝 POST /api/signup — User Registration</b></summary>

| Field | Type | Required |
|-------|------|----------|
| `firstName` | string | ✅ |
| `lastName` | string | ✅ |
| `username` | string | ✅ |
| `country` | string | ✅ |
| `email` | string | ✅ |
| `password` | string | ✅ |

> Status: Placeholder (not yet wired to backend)

</details>

---

## ⚙️ How It Works

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   User fills │────▶│  POST /plan with  │────▶│  AI Agent       │
│   trip form  │     │  user preferences │     │  Pipeline runs   │
└─────────────┘     └──────────────────┘     └────────┬────────┘
                                                       │
          ┌────────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────────┐
│  🤖 Loading Animation (5 steps):           │
│  1. Finding Best Hotel                     │
│  2. Curating Destinations                  │
│  3. Checking Timings & Availability        │
│  4. Calculating Routes & Costs             │
│  5. Assembling the Itinerary               │
└────────────────────┬────────────────────────┘
                     ▼
┌─────────────────────────────────────────────┐
│  📋 Results displayed with:                │
│  • Trip banner with dates & vibe           │
│  • Hotel card with rating & price          │
│  • Day-by-day tabs with timeline           │
│  • Activity details, transport & costs     │
└─────────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Target Device | Layout |
|------------|---------------|--------|
| `> 1100px` | Desktop / Large screens | Full 3-column layouts |
| `700px - 1100px` | Tablets | Stacked cards, adjusted grids |
| `< 700px` | Mobile phones | Single column, hamburger menu |
| `< 480px` | Small phones | Compact layout, reduced padding |

---

## 🔐 Security

- ✅ HTML escaping via `escapeHTML()` to prevent **XSS attacks**
- ✅ Client-side **password strength indicator**
- ✅ Form validation using HTML5 native attributes
- ✅ No secrets or API keys exposed in frontend code

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Smart India Hackathon** — for the inspiration
- [Unsplash](https://unsplash.com) — for beautiful free images
- [Google Fonts](https://fonts.google.com) — for Inter, Playfair Display & DM Sans
- [Shields.io](https://shields.io) — for badges

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Made with ❤️ for Incredible India 🇮🇳**

---

*TravelMate — Where AI meets wanderlust.* ✨

</div>
