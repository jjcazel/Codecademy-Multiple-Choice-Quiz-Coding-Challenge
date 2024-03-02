# Codecademy Take-home coding challenge: Build a Multiple Choice Quiz

## Introduction

Hi Codecademy Team! 👋

I'm Jared, an experienced full-stack software engineer. This document outlines my approach to the take-home coding quiz, focusing on my development process, the challenges I encountered, and the solutions I implemented. I enjoyed working on this project and appreciated the opportunity to demonstrate my skills in React functional components, hooks, and JavaScript.

## Development Process

### Design Philosophy

My primary goal was to create a simple, user-friendly quiz application that leverages React's powerful features. I focused on writing clean and readable code, adhering to best practices in React development. The application features a seamless flow from a landing page to the quiz interface, providing an engaging user experience.

### Technical Choices

- **React Hooks**: I utilized `useEffect` and `useState` to manage the application state and side effects, preferring these hooks for their simplicity and efficiency in handling component lifecycle events and state management.
- **Component Structure**: The application is structured around two main components housed in the same file: `Quiz` and `Questions`. This decision was made to keep the project modular, with the `Quiz` component encapsulating most of the logic.
- **Persistence**: To enhance user experience, I implemented `localStorage` to persist the total number of quiz attempts across sessions, ensuring data retention even after page refreshes.
- **Routing**: Utilizing React Router, I established a straightforward navigation between the landing page (`'/'`) and the quiz page (`'/quiz'`), facilitating easy access to the quiz.

### Challenges and Solutions

One significant challenge was managing the complex logic within the `handleNext` function, particularly when determining whether the user was at the end of a quiz or required more questions. This complexity arose from the need to seamlessly transition between quizzes and handle state updates accordingly. My solution involved carefully structuring conditionals and state management to accurately reflect the quiz's progress and user actions.

### Project Delighters

In addition to the core requirements, I chose to implement delighters A and B, which added value to the project by enhancing its functionality and user engagement. These features were selected based on their potential to improve the overall user experience and showcase my technical abilities.

## Conclusion

Completing this project took approximately 6 hours, including the implementation of the specified delighters. This experience was both challenging and rewarding, providing me with the opportunity to refine my skills and contribute to a meaningful project.

I look forward to discussing this project and my approach in further detail. Thank you for considering my submission.

Best regards,  
Jared
