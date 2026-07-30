import React from "react";

export default function QuizAnswerGrid({ children, className = "", style }) {
  return (
    <div className={`msb-quiz-answer-grid ${className}`.trim()} style={style}>
      <style>{`
        .msb-quiz-answer-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        @media (max-width: 760px) {
          .msb-quiz-answer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
