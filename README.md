<div align="center">

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Card%20Index%20Dividers.png" alt="Flash Cards" width="120" />

# Flash Cards

### 🧠 Transform NotebookLM Exports into Beautiful Offline Flashcards

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

**The ultimate study companion for students**  
*Export from NotebookLM → Study offline → Ace your exams* 🎯

[Getting Started](#-quick-start) •
[Features](#-features) •
[Usage](#-adding-your-flash-cards) •
[Contributing](#-contributing)

</div>

<br />

---

<br />

## 💡 About

**Flash Cards** is a modern web application designed for students who use [Google NotebookLM](https://notebooklm.google.com/) to study. It transforms CSV exports from NotebookLM into beautiful, interactive flashcards that work **completely offline**.

Built with the latest technologies and optimized for studying in any language — including **full RTL support** for Persian (فارسی), Arabic, and Hebrew.

<br />

### 🎯 Perfect For

| 🩺 Medical & Veterinary Students | 📚 University Students | 🌍 Language Learners |
|:---:|:---:|:---:|
| Study complex terminology, diseases, and procedures | Review lecture notes and exam material | Memorize vocabulary with native RTL support |

<br />

---

<br />

## ✨ Features

<table>
<tr>
<td width="50%">

### 📱 Modern Interface
- Clean, distraction-free design
- Smooth animations and transitions
- Responsive on all devices
- Dark & Light mode support

</td>
<td width="50%">

### 🌐 Multi-Language Ready
- Full RTL/LTR toggle support
- Perfect for Persian (فارسی) content
- Arabic & Hebrew compatible
- Unicode text rendering

</td>
</tr>
<tr>
<td width="50%">

### 📊 Study Tools
- Visual progress tracking
- Multiple flashcard sets
- Click-to-reveal answers
- Card counter display

</td>
<td width="50%">

### ⚡ Performance
- Works offline after first load
- Lightning-fast navigation
- No account required
- Zero data collection

</td>
</tr>
</table>

<br />

---

<br />

## 🔄 How It Works

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   📓 NotebookLM                                                   ║
║      │                                                            ║
║      ▼                                                            ║
║   📄 Export as CSV ────────────────────┐                          ║
║                                        │                          ║
║                                        ▼                          ║
║                            ┌───────────────────┐                  ║
║                            │   📁 /csv folder  │                  ║
║                            └─────────┬─────────┘                  ║
║                                      │                            ║
║                                      ▼                            ║
║                     ╔═══════════════════════════════╗             ║
║                     ║                               ║             ║
║                     ║    ┌─────────────────────┐    ║             ║
║                     ║    │   ❓ Question       │    ║             ║
║                     ║    │   ───────────────   │    ║             ║
║                     ║    │                     │    ║             ║
║                     ║    │   💡 Answer         │    ║             ║
║                     ║    └─────────────────────┘    ║             ║
║                     ║                               ║             ║
║                     ║      [ ◀ ]  [ 👁 ]  [ ▶ ]     ║             ║
║                     ║                               ║             ║
║                     ╚═══════════════════════════════╝             ║
║                                                                   ║
║                         🎓 Study & Learn!                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

<br />

---

<br />

## 🛠️ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) **18+** installed on your machine

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/TheXERC/Flash-Cards.git

# 2️⃣ Navigate to project folder
cd Flash-Cards

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
```

### 🚀 Launch

Open **[http://localhost:3000](http://localhost:3000)** in your browser and start studying!

### 📦 Build for Production

```bash
npm run build
npm start
```

<br />

---

<br />

## 📁 Adding Your Flash Cards

### Step-by-Step Guide

1. **📓 Open NotebookLM** — Go to [notebooklm.google.com](https://notebooklm.google.com/)
2. **📤 Export your notes** — Download your study material as CSV
3. **📂 Add to project** — Place your `.csv` file in the `/csv` folder
4. **🔄 Refresh browser** — Your new flashcard set appears automatically!

### CSV Format

```csv
Question text,Answer text
What causes FMD?,Family Picornaviridae, genus Aphthovirus
عامل بیماری تب برفکی چیست؟,خانواده Picornaviridae و جنس Aphthovirus
```

> 💡 **Tip:** Each line = one flashcard. Question and answer separated by comma.  
> 📝 **Note:** Supports any language including Persian, Arabic, and more!

<br />

---

<br />

## 🏗️ Project Structure

```
Flash-Cards/
│
├── 📂 app/
│   ├── 📂 api/flashcards/      # REST API for CSV data
│   │   └── route.ts            # API endpoint handler
│   ├── globals.css             # Global styles & themes
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Main flashcard interface
│
├── 📂 components/
│   ├── theme-provider.tsx      # Dark/Light mode provider
│   ├── theme-toggle.tsx        # Theme switch button
│   └── 📂 ui/                  # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
│
├── 📂 csv/                     # 👈 YOUR FLASHCARDS GO HERE!
│   ├── 1.csv
│   ├── 2.csv
│   └── 3.csv
│
├── 📂 lib/
│   ├── csv-reader.ts           # CSV parsing utility
│   ├── types.ts                # TypeScript definitions
│   └── utils.ts                # Helper functions
│
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── package.json
```

<br />

---

<br />

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|:-----------|:-------:|:--------|
| **Next.js** | 16 | React framework with App Router |
| **React** | 19 | UI library |
| **TypeScript** | 5.9 | Type-safe development |
| **Tailwind CSS** | 4 | Utility-first styling |
| **shadcn/ui** | Latest | Beautiful UI components |
| **Radix UI** | Latest | Accessible primitives |
| **Lucide Icons** | Latest | Beautiful icons |

<br />

---

<br />

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions are **greatly appreciated**.

```bash
# Fork the repo, then:
git checkout -b feature/AmazingFeature
git commit -m 'Add some AmazingFeature'
git push origin feature/AmazingFeature
# Open a Pull Request
```

<br />

---

<br />

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<br />

---

<br />

<div align="center">

## 👨‍💻 Author

**Mohammad Tajik**  
🩺 Veterinary Medicine Student | 🇮🇷 Iran

<br />

---

<br />

### ⭐ Show Your Support

If this project helped you study, give it a **star**!

<br />

**Made with ❤️ for students everywhere**

*Happy Studying!* 📚✨

</div>
<meta name="google-site-verification" content="murQ98HWZkdjRPm4F075xzgbk-uE839x3frPEusD9yg" />
