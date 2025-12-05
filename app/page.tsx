'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FlashCardSet, Direction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, Eye, EyeOff, ArrowLeftRight, Check, X, RotateCcw } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function FlashCardsPage() {
  const [flashCardSets, setFlashCardSets] = useState<FlashCardSet[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [direction, setDirection] = useState<Direction>('rtl');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);
  const [reviewedCards, setReviewedCards] = useState<Map<number, boolean>>(new Map());
  const [isReviewing, setIsReviewing] = useState(false);
  const [showReviewComplete, setShowReviewComplete] = useState(false);

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
  const currentCard = useMemo(() => {
    const index = isReviewing ? reviewQueue[currentCardIndex] : currentCardIndex;
    return currentSet?.cards[index];
  }, [currentSet, currentCardIndex, isReviewing, reviewQueue]);
  const totalCards = useMemo(() => currentSet?.cards.length || 0, [currentSet]);
  const activeCards = useMemo(() => isReviewing ? reviewQueue.length : totalCards, [isReviewing, reviewQueue.length, totalCards]);
  const progress = useMemo(() => 
    activeCards > 0 ? ((currentCardIndex + 1) / activeCards) * 100 : 0,
    [currentCardIndex, activeCards]
  );
  const correctCount = useMemo(() => 
    Array.from(reviewedCards.values()).filter(correct => correct).length,
    [reviewedCards]
  );
  const incorrectCount = useMemo(() => 
    Array.from(reviewedCards.values()).filter(correct => !correct).length,
    [reviewedCards]
  );

  const markCard = useCallback((correct: boolean) => {
    const actualIndex = isReviewing ? reviewQueue[currentCardIndex] : currentCardIndex;
    setReviewedCards(prev => {
      const updated = new Map(prev);
      updated.set(actualIndex, correct);
      return updated;
    });

    if (!isReviewing) {
      setReviewQueue(prev => {
        if (correct) {
          return prev.filter(index => index !== actualIndex);
        }
        if (prev.includes(actualIndex)) {
          return prev;
        }
        return [...prev, actualIndex];
      });
    }
    
    const maxIndex = isReviewing ? reviewQueue.length - 1 : totalCards - 1;
    if (currentCardIndex < maxIndex) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setShowReviewComplete(true);
    }
  }, [currentCardIndex, isReviewing, reviewQueue, totalCards]);

  const startReview = useCallback(() => {
    setIsReviewing(true);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setShowReviewComplete(false);
  }, []);

  const resetReview = useCallback(() => {
    setReviewQueue([]);
    setReviewedCards(new Map());
    setIsReviewing(false);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setShowReviewComplete(false);
  }, []);

  const navigateCard = useCallback((direction: 'next' | 'prev') => {
    const maxIndex = isReviewing ? reviewQueue.length - 1 : totalCards - 1;
    const newIndex = direction === 'next' ? currentCardIndex + 1 : currentCardIndex - 1;
    if (newIndex >= 0 && newIndex <= maxIndex) {
      setCurrentCardIndex(newIndex);
      setShowAnswer(false);
    }
  }, [currentCardIndex, isReviewing, reviewQueue.length, totalCards]);

  const nextCard = useCallback(() => navigateCard('next'), [navigateCard]);
  const previousCard = useCallback(() => navigateCard('prev'), [navigateCard]);

  const changeSet = useCallback((index: number) => {
    setCurrentSetIndex(index);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    resetReview();
  }, [resetReview]);

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

        {showReviewComplete ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Review Complete! 🎉</CardTitle>
              <CardDescription className="text-center">Great job studying!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-green-200 dark:border-green-900">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{correctCount}</div>
                      <div className="text-sm text-muted-foreground">Correct</div>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200 dark:border-red-900">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">{incorrectCount}</div>
                      <div className="text-sm text-muted-foreground">Incorrect</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {!isReviewing && reviewQueue.length > 0 && (
                    <Button onClick={startReview} size="lg" className="w-full sm:w-auto">
                      <RotateCcw className="h-4 w-4 me-2" />
                      <span>Review Incorrect ({reviewQueue.length})</span>
                    </Button>
                  )}
                  <Button onClick={resetReview} variant="outline" size="lg" className="w-full sm:w-auto">
                    <RotateCcw className="h-4 w-4 me-2" />
                    <span>Start Over</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-8 overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4 rounded-t-xl">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm font-semibold shrink-0">
                      Card {currentCardIndex + 1} of {activeCards}
                    </Badge>
                    {isReviewing && (
                      <Badge variant="destructive" className="text-sm font-semibold">Review</Badge>
                    )}
                  </div>
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

            {showAnswer && (
              <div className="flex gap-3 sm:gap-4 justify-center items-center mb-4">
                <Button 
                  onClick={() => markCard(false)} 
                  variant="destructive" 
                  size="lg" 
                  className="flex-1 sm:flex-initial sm:min-w-[140px]"
                >
                  <X className="h-5 w-5 me-2" />
                  <span>Incorrect</span>
                </Button>

                <Button 
                  onClick={() => markCard(true)} 
                  variant="default" 
                  size="lg"
                  className="flex-1 sm:flex-initial sm:min-w-[140px] bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                >
                  <Check className="h-5 w-5 me-2" />
                  <span>Correct</span>
                </Button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8">
              <Button onClick={previousCard} disabled={currentCardIndex === 0} variant="outline" size="lg" className="w-full sm:w-auto">
                <ChevronLeft className="h-4 w-4 me-2" />
                <span>Previous</span>
              </Button>

              <Button onClick={toggleAnswer} variant="default" size="lg" className="w-full sm:w-auto">
                {showAnswer ? (
                  <>
                    <EyeOff className="h-4 w-4 me-2" />
                    <span>Hide Answer</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 me-2" />
                    <span>Show Answer</span>
                  </>
                )}
              </Button>

              <Button onClick={nextCard} disabled={currentCardIndex === activeCards - 1} variant="outline" size="lg" className="w-full sm:w-auto">
                <span>Next</span>
                <ChevronRight className="h-4 w-4 ms-2" />
              </Button>
            </div>
          </>
        )}

        {!showReviewComplete && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 dark:text-green-400">✓ {correctCount}</span>
                    <span className="text-red-600 dark:text-red-400">✗ {incorrectCount}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
