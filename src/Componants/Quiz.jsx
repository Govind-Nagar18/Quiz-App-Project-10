import "./Quiz.css";
import { useRef, useState } from "react";
import { data } from "../assets/Data";
export default function Quiz() {
  let [index, setindex] = useState(0);
  let [Question, setQuestion] = useState(data[index]);
  let [lock, setlock] = useState(false);
  let [score, setscore] = useState(0);
  let [result, setresult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (Question.answer === ans) {
        e.target.classList.add("correct");
        setlock(true);
        setscore((prev) => prev + 1);
      } else {
        e.target.classList.add("Wrong");
        setlock(true);
        option_array[Question.answer - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setresult(true);
        return 0;
      }
      setindex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);

      setlock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("Wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    setindex(0);
    setQuestion(data[0]);
    setscore(0);
    setlock(false);
    setresult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1} {Question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {Question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {Question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {Question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {Question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>

          <div className="index">
            {index + 1} of {data.length} Question
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            Your Score {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : null}
    </div>
  );
}
