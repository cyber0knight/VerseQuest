import React, { useState } from 'react';
import Timer from './Timer';
import bibleData from '../data/bibleData.json';
import './Practice.css';

const Practice = () => {
  const [numVerses, setNumVerses] = useState(5);
  const [timeLimit, setTimeLimit] = useState(10);
  const [currentVerse, setCurrentVerse] = useState(0);

  const [bookIndex, setBookIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [verseIndex, setVerseIndex] = useState(0);

  const [started, setStarted] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const books = bibleData.books;

  const startScroll = (onFinish) => {
    setScrolling(true);
    setShowTimer(false);

    let counter = 0;
    const scrollTimes = 15; // ~1.2s scroll
    const interval = setInterval(() => {
      const nextBookIndex = Math.floor(Math.random() * books.length);
      setBookIndex(nextBookIndex);

      const chapCount = books[nextBookIndex].chapters.length;
      const nextChapIndex = Math.floor(Math.random() * chapCount);
      setChapterIndex(nextChapIndex);

      const verseCount = books[nextBookIndex].chapters[nextChapIndex];
      const nextVerseIndex = Math.floor(Math.random() * verseCount);
      setVerseIndex(nextVerseIndex);

      counter++;
      if (counter >= scrollTimes) {
        clearInterval(interval);
        setScrolling(false);
        setShowTimer(true);
        if (onFinish) onFinish();
      }
    }, 80);
  };

  const handleFinish = () => {
    if (currentVerse + 1 < numVerses) {
      setCurrentVerse((prev) => prev + 1);
      startScroll(); // start scroll for next verse
    } else {
      alert('✅ Practice complete!');
      setStarted(false);
      setCurrentVerse(0);
      setShowTimer(false);
    }
  };

  const startPractice = () => {
    setCurrentVerse(0);
    setStarted(true);
    startScroll(); // scroll for first verse
  };

  const stopPractice = () => {
    setStarted(false);
    setCurrentVerse(0);
    setShowTimer(false);
  };

  const getCircularItems = (array, index) => {
    const prev = array[(index - 1 + array.length) % array.length];
    const current = array[index];
    const next = array[(index + 1) % array.length];
    return [prev, current, next];
  };

  const bookItems = getCircularItems(books.map((b) => b.name), bookIndex);
  const chapterItems = getCircularItems(
    Array.from({ length: books[bookIndex].chapters.length }, (_, i) => i + 1),
    chapterIndex
  );
  const verseItems = getCircularItems(
    Array.from({ length: books[bookIndex].chapters[chapterIndex] }, (_, i) => i + 1),
    verseIndex
  );

  return (
    <div className="practice-container text-center">
      <h3 className="mb-3">Practice Mode</h3>

      {!started && (
        <div className="setup-box">
          <label>No. of Verses:</label>
          <input
            type="number"
            value={numVerses}
            onChange={(e) => setNumVerses(Number(e.target.value))}
            min={1}
            className="form-control mb-2"
          />
          <label>Time per Verse (seconds):</label>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            min={1}
            className="form-control mb-3"
          />
          <button className="btn btn-primary" onClick={startPractice}>
            Start Practice
          </button>
        </div>
      )}

      {started && (
        <div className="session-box">
          <h5>Verse {currentVerse + 1} / {numVerses}</h5>
          <div className="scroll-container">
            <ScrollColumn items={bookItems} className="scroll-column book" />
            <ScrollColumn items={chapterItems} className="scroll-column chapter" />
            <ScrollColumn items={verseItems} className="scroll-column verse" />
          </div>

          <div className="mt-3">
            {showTimer ? (
              <Timer duration={timeLimit} onFinish={handleFinish} start={started} />
            ) : (
              <div className="waiting">⏳ Scrolling...</div>
            )}
          </div>

          <div className="mt-3">
            <button
              className="btn btn-success me-2"
              onClick={handleFinish}
              disabled={scrolling}
            >
              Next
            </button>
            <button className="btn btn-danger" onClick={stopPractice}>
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ScrollColumn = ({ items }) => {
  return (
    <div className="scroll-column">
      {items.map((item, i) => {
        const className =
          i === 1
            ? 'scroll-item highlight'
            : i === 0
            ? 'scroll-item prev'
            : 'scroll-item next';
        return (
          <div key={i} className={className}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Practice;
