import React from "react";
import { Quiz } from "./components/quiz/Quiz";
import { jsQuizz } from "./assets/Data";

function App() {
  return (
    <>
      <Quiz questions={jsQuizz.questions} />
    </>
  );
}

export default App;
