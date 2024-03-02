import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/quiz');
  };
  return (
    <>
      <h1>Take the Codecademy Frontend Quiz!</h1>
      <button type="button" onClick={handleClick}>
        Take the Quiz
      </button>
    </>
  );
}
