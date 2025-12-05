<div align="center">

# 📚 Flash Cards

### Transform NotebookLM exports into beautiful offline flashcards

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

*The perfect study companion for students — works completely offline!*

</div>

---

## ✨ What is this?

**Flash Cards** takes CSV exports from [Google NotebookLM](https://notebooklm.google.com/) and transforms them into a beautiful, interactive flashcard experience. Study anywhere, anytime — no internet required after initial setup!

Perfect for:
- 🎓 **Students** preparing for exams
- 📖 **Learners** memorizing vocabulary or concepts
- 🧠 **Anyone** who wants to retain information effectively

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 📁 **Multi-file Support** | Load multiple CSV files and switch between topics |
| 🔄 **RTL/LTR Toggle** | Full support for right-to-left languages (Arabic, Persian, Hebrew) |
| 🎴 **Interactive Cards** | Click to flip and reveal answers |
| 📊 **Progress Tracking** | Visual progress bar shows your study progress |
| 🌙 **Dark/Light Mode** | Easy on the eyes, day or night |
| ⌨️ **Keyboard Navigation** | Navigate with arrow keys for faster studying |
| 📱 **Fully Responsive** | Works beautifully on desktop, tablet, and mobile |
| 🔌 **Offline Ready** | Study without internet after initial load |

---

## 📸 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   NotebookLM  ──►  Export CSV  ──►  Drop in /csv folder    │
│                                                             │
│                         ▼                                   │
│                                                             │
│              ┌─────────────────────┐                        │
│              │    Flash Cards      │                        │
│              │    Application      │                        │
│              │                     │                        │
│              │   Q: Question?      │                        │
│              │   ─────────────     │                        │
│              │   [Click to flip]   │                        │
│              └─────────────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed

### Installation

```bash
# Clone the repository
git clone https://github.com/TheXERC/Flash-Cards.git

# Navigate to project folder
cd Flash-Cards

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and start studying! 🎉

---

## 📁 Adding Your Flash Cards

1. **Export from NotebookLM** — Download your study material as CSV
2. **Drop the file** — Place your `.csv` file in the `/csv` folder
3. **Refresh** — Your new flashcard set appears automatically!

### CSV Format

```csv
Question text,Answer text
Another question,Another answer
What is the capital of France?,Paris
```

> 💡 **Tip:** Each line = one flashcard. Question and answer separated by comma.

---

## 📂 Project Structure

```
Flash-Cards/
├── 📁 app/
│   ├── 📁 api/flashcards/    # API endpoint for CSV data
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main flashcard viewer
├── 📁 components/            # Reusable UI components
├── 📁 csv/                   # 👈 Your flashcard files go here!
├── 📁 lib/                   # Utilities and types
└── 📄 package.json
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` | Next card |
| `←` | Previous card |
| `Space` | Flip card |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Made with ❤️ for students everywhere**

*Star ⭐ this repo if you find it helpful!*

</div>
