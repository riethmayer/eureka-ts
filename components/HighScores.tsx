import React, { useState } from "react";
import { HighScoreData } from "../pages/api/highscores";

type JSONResponse = {
  data?: Omit<HighScoreData[], "fetchedAt">;
  errors?: Array<{ message: string }>;
};

const fetchHighscores = async (): Promise<HighScoreData[] | undefined> => {
  const response = await window.fetch("/api/highscores");
  const { data, errors }: JSONResponse = await response.json();
  if (response.ok) {
    return data;
  } else {
    const error = new Error(
      errors?.map((e: { message: any }) => e.message).join("\n") ?? "unknown"
    );
    return Promise.reject(error);
  }
};

const HighScore = ({ score }: { score: HighScoreData }) => (
  <li key={score.name}>
    <p>{score.name}</p>
    <p>{score.points}</p>
    <p>{score.rounds}</p>
  </li>
);

const HighScores = () => {
  const [highscores, setHighscores] = useState<HighScoreData[]>([]);

  // const highscores = fetchHighscores()
  //   .then((data) => <HighScore scores={data} />)
  //   .catch((err) => <p>{err.message} </p>);

  return (
    <div>
      {highscores.map((highscore, index) => (
        <HighScore key={index} score={highscore} />
      ))}
    </div>
  );
};

export default HighScores;
