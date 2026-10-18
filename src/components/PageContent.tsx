import type { JSX } from "react/jsx-runtime";
import FactorSection from "./FactorSection";
import { FACTORS } from "../data/factors";
import { useState } from "react";
import type { SelectionResult } from "../types/selectionResult";
import Popup from "./Popup";
import type { PopupMessage } from "../types/popupMessage";

export default function PageContent(): JSX.Element {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<PopupMessage>({
    title: "None",
    description: "None",
  });
  const [selections, setSelections] = useState<Record<number, SelectionResult>>(
    {},
  );

  const handleSelectedValue = (
    id: number,
    first: number,
    second: number,
  ): void => {
    setSelections((prev) => ({
      ...prev,
      [id]: { first, second }, // add or overwrites
    }));
  };

  const equalizeValue = (value: number): number => {
    // equalize value so that 1 = 0, 2 = 0.25, 3 = 0.5, 4 = 0.75, 5 = 1
    return (value - 1) / 4;
  };

  const calcualteGrade = (score: number): string => {
    switch (true) {
      case score >= 90:
        return "A+";
      case score >= 85:
        return "A";
      case score >= 80:
        return "A-";
      case score >= 75:
        return "B+";
      case score >= 70:
        return "B";
      case score >= 65:
        return "B-";
      case score >= 60:
        return "C+";
      case score >= 55:
        return "C";
      case score >= 50:
        return "C-";
      case score >= 40:
        return "D";
      default:
        return "E";
    }
  };

  const calculateScore = () => {
    let biggestImprovementWeight = 0;
    let biggestImprovementId = 0;

    let totalScore = 0;
    // loop through all results and get first and second values
    for (const [key, selection] of Object.entries(selections)) {
      const first = equalizeValue(selection.first);
      const second = equalizeValue(selection.second);
      // get weight (or default to 0 if could not be found)
      const weight =
        FACTORS.find((factor) => factor.id === Number(key))
          ?.measurementWeight ?? 0;
      // multiple value by weight
      totalScore += first * weight;
      totalScore += second * weight;

      // find biggest improvement
      if (first === 1 && second === 1) {
        continue; // skip if perfect
      }

      if (weight > biggestImprovementWeight) {
        biggestImprovementWeight = weight;
        biggestImprovementId = Number(key);
      }
    }

    // set message for biggest improvement
    let desc = "";
    if (biggestImprovementId !== 0) {
      const factorName =
        FACTORS.find((factor) => factor.id === biggestImprovementId)?.name ??
        "ERROR"; // get name of factor or default to ERROR
      desc = `The change that would make the biggest impact is by improving an aspect of ${factorName}`;
    } else {
      desc =
        "WOW! you have really planned the deployment of your IT soultion well!";
    }

    setPopupMessage({
      title: `Your grade is ${calcualteGrade(totalScore)}`,
      description: desc,
    });
  };

  const evaluate = () => {
    setIsPopupOpen(true);

    // Check every factor has valid selections (both values > 0)
    const isComplete = FACTORS.every((factor) => {
      const selection = selections[factor.id];
      return selection && selection.first > 0 && selection.second > 0;
    });

    if (!isComplete) {
      setPopupMessage({
        title: "ERROR",
        description: "All measurements must have a selected value",
      });
    } else {
      calculateScore();
    }
  };

  return (
    <div className="page-content">
      {FACTORS.map((factor) => (
        <FactorSection
          key={factor.id}
          factor={factor}
          onChange={handleSelectedValue}
        />
      ))}

      <button onClick={() => evaluate()}>Evaluate</button>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={popupMessage}
      />
    </div>
  );
}
