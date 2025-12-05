import { NextResponse } from 'next/server';
import { getAllFlashCards } from '@/lib/csv-reader';

export async function GET() {
  try {
    const flashCardSets = getAllFlashCards();
    return NextResponse.json(flashCardSets);
  } catch (error) {
    console.error('Error fetching flash cards:', error);
    return NextResponse.json(
      { error: 'Failed to load flash cards' },
      { status: 500 }
    );
  }
}
