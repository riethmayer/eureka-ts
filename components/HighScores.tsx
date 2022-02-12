import React, { useEffect, useState } from "react";
import { HighScoreData } from "../pages/api/highscores";

const fetchHighscores = async (): Promise<HighScoreData[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/highscores");
      const data: HighScoreData[] = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

const HighScore = ({ score }: { score: HighScoreData }) => (
  <li key={score.name}>
    <p>{score.name}</p>
    <p>{score.points}</p>
    <p>{score.rounds}</p>
  </li>
);

const HighScores = () => {
  const [highscores, setHighscores] = useState<HighScoreData[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchHighscores();
        if (res) {
          setHighscores(res);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <ul>
        {highscores.map((highscore, index) => (
          <HighScore key={index} score={highscore} />
        ))}
      </ul>
    </div>
  );
};

export default HighScores;
