# Flash Cards Application

A clean and interactive flash card application built with Next.js, TypeScript, and Tailwind CSS. This app reads CSV files exported from Google's NotebookLM and displays them as beautiful, interactive flash cards.

## Features

- 📚 **Multi-file support**: Load multiple CSV files from the `csv` folder
- 🔄 **RTL/LTR support**: Toggle between right-to-left and left-to-right text direction
- 🎴 **Interactive cards**: Click to reveal answers
- 📊 **Progress tracking**: Visual progress bar shows your current position
- 🎨 **Clean UI**: Modern, responsive design with smooth animations
- ⌨️ **Easy navigation**: Previous/Next buttons to move through cards

## Project Structure

```
Flash-Cards/
├── app/
│   ├── api/
│   │   └── flashcards/
│   │       └── route.ts          # API endpoint to serve CSV data
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main flash card viewer
├── csv/
│   ├── 1.csv                     # Your flash card files
│   ├── 2.csv
│   └── 3.csv
├── lib/
│   ├── csv-reader.ts             # CSV parsing utility
│   └── types.ts                  # TypeScript type definitions
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## CSV File Format

Each CSV file should contain flash cards in the following format:
```csv
Question text,Answer text
Another question,Another answer
```

**Note**: Each line represents one flash card with question and answer separated by a comma.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your CSV files to the `csv` folder

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Select a flash card set**: Use the dropdown menu to choose which CSV file to study
2. **Toggle text direction**: Click the RTL/LTR button to switch text direction (useful for Persian/Arabic content)
3. **Navigate cards**: Use Previous/Next buttons or click on the card to reveal answers
4. **Track progress**: Watch the progress bar at the bottom to see how far you've progressed

## Adding More Flash Cards

Simply add more CSV files to the `csv` folder. The application will automatically detect and load them on the next page refresh.

## Technology Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: UI component library (ready to use)

## Code Quality

- Clean, maintainable code structure
- TypeScript for type safety
- Separated concerns (API routes, utilities, components)
- Responsive design
- Performance optimized

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
