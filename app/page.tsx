'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlashCardSet, Direction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, Eye, EyeOff, ArrowLeftRight } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function FlashCardsPage() {
  const [flashCardSets, setFlashCardSets] = useState<FlashCardSet[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [direction, setDirection] = useState<Direction>('rtl');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const response = await fetch('/api/flashcards');
        if (!response.ok) throw new Error('Failed to fetch flash cards');
        const data = await response.json();
        setFlashCardSets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFlashCards();
  }, []);

  const currentSet = useMemo(() => flashCardSets[currentSetIndex], [flashCardSets, currentSetIndex]);
  const currentCard = useMemo(() => currentSet?.cards[currentCardIndex], [currentSet, currentCardIndex]);
  const totalCards = useMemo(() => currentSet?.cards.length || 0, [currentSet]);
  const progress = useMemo(() => 
    totalCards > 0 ? ((currentCardIndex + 1) / totalCards) * 100 : 0,
    [currentCardIndex, totalCards]
  );

  const navigateCard = useCallback((direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' ? currentCardIndex + 1 : currentCardIndex - 1;
    if (newIndex >= 0 && newIndex < totalCards) {
      setCurrentCardIndex(newIndex);
      setShowAnswer(false);
    }
  }, [currentCardIndex, totalCards]);

  const nextCard = useCallback(() => navigateCard('next'), [navigateCard]);
  const previousCard = useCallback(() => navigateCard('prev'), [navigateCard]);

  const changeSet = useCallback((index: number) => {
    setCurrentSetIndex(index);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  }, []);

  const toggleDirection = useCallback(() => 
    setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr'),
    []
  );

  const toggleAnswer = useCallback(() => 
    setShowAnswer(prev => !prev),
    []
  );

  if (loading || error || !flashCardSets.length || !currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md mx-4">
          {loading ? (
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Loading flash cards...</p>
              </div>
            </CardContent>
          ) : error ? (
            <>
              <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{error}</p>
              </CardContent>
            </>
          ) : (
            <CardHeader>
              <CardTitle>No Flash Cards Found</CardTitle>
              <CardDescription>Please add CSV files to the csv folder.</CardDescription>
            </CardHeader>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4" dir={direction}>
      <div className="max-w-4xl mx-auto" dir="ltr">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-between sm:items-end">
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium mb-2">Select Flash Card Set</label>
                <Select value={currentSetIndex.toString()} onValueChange={(value: string) => changeSet(Number(value))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {flashCardSets.map((set, index) => (
                      <SelectItem key={set.filename} value={index.toString()}>
                        {set.filename} ({set.cards.length} cards)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 sm:gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium mb-2">Direction</label>
                  <Button onClick={toggleDirection} variant="default" className="min-w-[100px]">
                    <ArrowLeftRight className="h-4 w-4 me-2" />
                    <span>{direction === 'rtl' ? 'RTL' : 'LTR'}</span>
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 overflow-hidden">
          <div className="bg-primary text-primary-foreground px-6 py-4 rounded-t-xl">
            <div className="flex justify-between items-center gap-4">
              <Badge variant="secondary" className="text-sm font-semibold shrink-0">
                Card {currentCardIndex + 1} of {totalCards}
              </Badge>
              <span className="text-sm opacity-90 truncate">{currentSet.filename}</span>
            </div>
          </div>
          
          <CardContent 
            className="min-h-[400px] p-6 sm:p-8 flex flex-col justify-center cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={toggleAnswer}
            dir={direction}
          >
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">Question</Badge>
              <p className="text-xl sm:text-2xl font-medium leading-relaxed">{currentCard.question}</p>
            </div>

            {showAnswer ? (
              <>
                <Separator className="my-8" />
                <div className="space-y-4">
                  <Badge variant="default" className="w-fit">Answer</Badge>
                  <p className="text-lg sm:text-xl leading-relaxed">{currentCard.answer}</p>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground mt-8 text-sm italic">Click to reveal answer</p>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8">
          <Button onClick={previousCard} disabled={currentCardIndex === 0} variant="outline" size="lg" className="w-full sm:w-auto">
            <ChevronLeft className="h-4 w-4 me-2" />
            <span>Previous</span>
          </Button>

          <Button onClick={toggleAnswer} variant="default" size="lg" className="w-full sm:w-auto">
            {showAnswer ? (
              <><EyeOff className="h-4 w-4 me-2" /><span>Hide Answer</span></>
            ) : (
              <><Eye className="h-4 w-4 me-2" /><span>Show Answer</span></>
            )}
          </Button>

          <Button onClick={nextCard} disabled={currentCardIndex === totalCards - 1} variant="outline" size="lg" className="w-full sm:w-auto">
            <span>Next</span>
            <ChevronRight className="h-4 w-4 ms-2" />
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
