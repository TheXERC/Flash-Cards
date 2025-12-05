import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import type { FlashCard, FlashCardSet } from './types';

/**
 * Parse a CSV file into flash cards
 * Expected format: question,answer (comma-separated)
 */
function parseCSV(content: string): FlashCard[] {
  const lines = content.trim().split('\n');
  
  return lines.map(line => {
    const separatorIndex = line.indexOf(',');
    if (separatorIndex === -1) {
      return { question: line, answer: '' };
    }
    
    const question = line.substring(0, separatorIndex).trim();
    const answer = line.substring(separatorIndex + 1).trim();
    
    return { question, answer };
  }).filter(card => card.question); // Filter out empty cards
}

/**
 * Read all CSV files from the csv directory
 */
export function getAllFlashCards(): FlashCardSet[] {
  const csvDir = join(process.cwd(), 'csv');
  
  try {
    const files = readdirSync(csvDir).filter(file => file.endsWith('.csv'));
    
    return files.map(filename => {
      const filePath = join(csvDir, filename);
      const content = readFileSync(filePath, 'utf-8');
      const cards = parseCSV(content);
      
      return {
        filename,
        cards
      };
    });
  } catch (error) {
    console.error('Error reading CSV files:', error);
    return [];
  }
}

/**
 * Get a single CSV file's flash cards
 */
export function getFlashCardsByFile(filename: string): FlashCard[] {
  const csvDir = join(process.cwd(), 'csv');
  const filePath = join(csvDir, filename);
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    return parseCSV(content);
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return [];
  }
}
