import { useState } from "react";
import type { FactorDetails } from "../types/factorDetails";

interface FactorSectionProps {
  factor: FactorDetails;
  onChange: (id: number, first: number, second: number) => void;
}

export default function FactorSection({
  factor,
  onChange,
}: FactorSectionProps) {
  const [firstSelectedValue, setFirstSelectedValue] = useState<number>(0);
  const [secondSelectedValue, setSecondSelectedValue] = useState<number>(0);

  const measurementOptions = new Map<number, string>([
    [0, "-"],
    [
      1,
      "1 - Does not exist in the proposal/plan or is mentioned with very little detail.",
    ],
    [
      2,
      "2 - Incomplete with missing crucial tasks/steps that are necessary to setup/use it.",
    ],
    [
      3,
      "3 - Partial complete with important details missing (start/completion dates, individuals involved, etc.).",
    ],
    [
      4,
      "4 - Mostly complete with finer details missing (exact task/step durations, exceptional edge cases, etc.).",
    ],
    [
      5,
      "5 - Perfect, the aspect fully covers everything and there is nothing more that could be added.",
    ],
  ]);

  const handleFirstChange = (value: number) => {
    // sets value and passes to callback
    setFirstSelectedValue(value);
    onChange(factor.id, value, secondSelectedValue);
  };

  const handleSecondChange = (value: number) => {
    // sets value and passes to callback
    setSecondSelectedValue(value);
    onChange(factor.id, firstSelectedValue, value);
  };

  return (
    <div className="factor-section">
      <h2>{factor.name}</h2>
      <h3>{factor.firstMeasurementName}</h3>
      <p>{factor.firstMeasurementDescription}</p>

      <select
        value={firstSelectedValue}
        onChange={(e) => handleFirstChange(Number(e.target.value))}
      >
        {Array.from(measurementOptions.entries()).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <h3>{factor.secondMeasurementName}</h3>
      <p>{factor.secondMeasurementDescription}</p>

      <select
        value={secondSelectedValue}
        onChange={(e) => handleSecondChange(Number(e.target.value))}
      >
        {Array.from(measurementOptions.entries()).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
