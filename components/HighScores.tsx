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
    <div className="flex flex-col m-auto w-[80%] items-center h-full pt-10">
      <h1 className="text-3xl font-bold">Highscores</h1>
      <table className="table-auto w-80">
        <thead>
          <tr>
            <th className="text-left"></th>
            <th className="text-left"></th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {highscores.map((score, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{score.name}</td>
              <td className="text-center">{score.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighScores;
