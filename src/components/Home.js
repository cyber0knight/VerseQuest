import React, { useState, useEffect } from 'react';
import bibleData from '../data/bibleData.json';
import './Home.css';

const Home = () => {
  const [scrolling, setScrolling] = useState(false);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [bookIndex, setBookIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [verseIndex, setVerseIndex] = useState(0);

  const books = bibleData.books;

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const startScroll = () => {
    setScrolling(true);
    setTime(0);
    setTimerRunning(false);

    const scrollTimes = 15; // 1-2 sec
    let counter = 0;

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
        setTimerRunning(true); // start timer
        setCompleted(true);
      }
    }, 80);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const getCircularItems = (array, index) => {
    const prev = array[(index - 1 + array.length) % array.length];
    const current = array[index];
    const next = array[(index + 1) % array.length];
    return [prev, current, next];
  };

  const bookItems = getCircularItems(books.map(b => b.name), bookIndex);
  const chapterItems = getCircularItems(
    Array.from({ length: books[bookIndex].chapters.length }, (_, i) => i + 1),
    chapterIndex
  );
  const verseItems = getCircularItems(
    Array.from({ length: books[bookIndex].chapters[chapterIndex] }, (_, i) => i + 1),
    verseIndex
  );

  return (
    <div className="home-container">
      <h1 className="mb-5">Bible Speed Trainer</h1>

      <div className="scroll-container">
        <ScrollColumn items={bookItems} />
        <ScrollColumn items={chapterItems} />
        <ScrollColumn items={verseItems} />
      </div>

      <div className="mt-4 d-flex gap-3">
        <button
          className="btn btn-primary btn-lg"
          onClick={startScroll}
          disabled={scrolling}
        >
          {completed ? 'Next' : 'Start'}
        </button>

        {completed && (
          <button className="btn btn-danger btn-lg" onClick={stopTimer}>
            Stop
          </button>
        )}
      </div>

      <div className="mt-3">
        <h3>Timer: {time}s</h3>
      </div>
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

export default Home;
