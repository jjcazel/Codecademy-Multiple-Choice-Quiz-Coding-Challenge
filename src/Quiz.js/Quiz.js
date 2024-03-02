import React, { useEffect, useState } from 'react';
import { getQuizzes } from '../data/quizzes';
import { getMessage } from '../data/messages';
import { getMoreQuizzes } from '../data/quizzes';

import './Quiz.css';

export function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuizSummary, setShowQuizSummary] = useState(false);
  const [moreQuizzesAvailable, setMoreQuizzesAvailable] = useState(true);
  const [completedAllQuizzes, setCompletedAllQuizzes] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0); //index of the current quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [quizAttempts, setQuizAttempts] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizData = await getQuizzes();
        setQuizzes(quizData);
        // Load quiz attempts from localStorage
        const storedAttempts =
          JSON.parse(localStorage.getItem('quizAttempts')) || {};
        setQuizAttempts(storedAttempts);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false); // Set loading to false, regardless of success or failure
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div>Loading your Frontend Quiz...</div>; // Render a loading message or spinner
  }

  const currentQuizData = quizzes[currentQuiz];
  const currentQuestionData = currentQuizData?.questions[currentQuestion];
  const totalQuestions = quizzes.reduce(
    (acc, quiz) => acc + quiz.questions.length,
    0,
  );

  const handleNext = () => {
    if (currentQuestion < currentQuizData.questions.length - 1) {
      // If not on the last question, move to the next question
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer when moving to the next question
    } else if (
      currentQuestion === currentQuizData.questions.length - 1 &&
      !showQuizSummary
    ) {
      // If on the last question and not already on the summary page, show the summary page
      setShowQuizSummary(true);
    } else if (currentQuiz < quizzes.length - 1) {
      // If on the last question and not on the last quiz, move to the next quiz and reset currentQuestion
      setCurrentQuiz((prevQuiz) => prevQuiz + 1);
      setCurrentQuestion(0);
      setSelectedAnswer(null); // Reset selected answer when moving to the next quiz
      setShowQuizSummary(false); // Reset the summary page flag when moving to the next quiz
      setCorrectAnswersCount(0); // Assuming you want to reset the count when moving to the next quiz
    } else {
      // If on the last quiz, go back to the first quiz
      setCurrentQuiz(0);
      setCurrentQuestion(0);
      setSelectedAnswer(null); // Reset selected answer when moving to the first quiz
      setShowQuizSummary(false); // Reset the summary page flag when moving to the first quiz
      setCorrectAnswersCount(0); // Reset the count when moving to the first quiz
      setTotalCorrectAnswers(0);
    }

    const isLastQuestion =
      currentQuestion === currentQuizData.questions.length - 1;
    const isLastQuiz = currentQuiz === quizzes.length - 1;

    if (isLastQuestion && isLastQuiz) {
      if (totalCorrectAnswers === totalQuestions) {
        // If all questions are correct, set the state to indicate completion
        setCompletedAllQuizzes(true);
      }
    }
    if (isLastQuestion) {
      const currentQuizTitle = currentQuizData.title;
      const newAttempts = {
        ...quizAttempts,
        [currentQuizTitle]: (quizAttempts[currentQuizTitle] || 0) + 1,
      };
      setQuizAttempts(newAttempts);
      localStorage.setItem('quizAttempts', JSON.stringify(newAttempts));
    }

    setIsCorrect(null);
  };

  const handleRetake = () => {
    // Reset the current quiz to the first question
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowQuizSummary(false);
    setCorrectAnswersCount(0);
    setIsCorrect(null);
  };

  const handleGetAnotherQuiz = async () => {
    setLoading(true);
    await fetchAndSetMoreQuizzes();
    // Reset state or perform any other actions if needed
    setCompletedAllQuizzes(false);
  };

  const fetchAndSetMoreQuizzes = async () => {
    try {
      const moreQuizzes = await getMoreQuizzes();
      if (moreQuizzes.length > 0) {
        // If more quizzes are fetched, update the state and set the quizzes
        setQuizzes((prevQuizzes) => [...prevQuizzes, ...moreQuizzes]);
        setMoreQuizzesAvailable(false);
      } else {
        // If no more quizzes are available, update the state accordingly
        setMoreQuizzesAvailable(false);
      }
    } catch (error) {
      // Handle the error (e.g., show a message to the user)
      console.error('Error fetching more quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (answer) => {
    const correct =
      answer === quizzes[currentQuiz].questions[currentQuestion].correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);

    if (correct && correctAnswersCount !== currentQuizData.questions.length) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
      setTotalCorrectAnswers((prevTotal) => prevTotal + 1); // Update totalCorrectAnswers
    }
  };

  const encouragingMessage = getMessage();

  return (
    <div className="quizContainer">
      <h1>{currentQuizData?.title}</h1>
      {showQuizSummary ? (
        <div className="summaryText">
          <p>
            You got <b>{correctAnswersCount}</b> of{' '}
            <b>{currentQuizData.questions.length} </b>
            right.
          </p>
          {correctAnswersCount > 0 ? (
            <p>{encouragingMessage}</p>
          ) : (
            <p>Try again!</p>
          )}
          <p>This was attempt number {quizAttempts[currentQuizData?.title]}.</p>
        </div>
      ) : (
        <Question
          question={currentQuestionData}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          isCorrect={isCorrect}
        />
      )}
      <div className="buttonContainer">
        {selectedAnswer !== null && ( // Show button only when an answer is selected
          <button type="button" onClick={handleNext} className="nextButton">
            Next
          </button>
        )}
        {completedAllQuizzes && moreQuizzesAvailable && (
          <button
            type="button"
            onClick={handleGetAnotherQuiz}
            className="moreButton"
          >
            Get More Questions
          </button>
        )}
        {selectedAnswer === null && ( // Show button only when an answer is not selected
          <p>Select an answer before moving to the next question</p>
        )}
        {showQuizSummary && (
          <button type="button" onClick={handleRetake} className="nextButton">
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
}

function Question({ question, selectedAnswer, onSelectAnswer, isCorrect }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Shuffle the answers (incorrect and correct)
    const shuffledAnswers = [
      ...question.incorrectAnswers,
      question.correctAnswer,
    ].sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);
  }, [question]);

  const answerLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="questioncontainer">
      <h3>{question?.text}</h3>
      <ul>
        {answers.map((answer, index) => (
          <li
            key={index}
            onClick={() => onSelectAnswer(answer)}
            className={`questionItem ${
              selectedAnswer === answer
                ? isCorrect
                  ? 'selectedCorrect'
                  : 'selectedIncorrect'
                : ''
            }`}
          >
            <b>{answerLetters[index]}.</b>{' '}
            <div className="answerText">{answer}</div>
          </li>
        ))}
      </ul>
      <p>{isCorrect !== null && (isCorrect ? 'Correct!' : 'Incorrect!')}</p>
    </div>
  );
}
