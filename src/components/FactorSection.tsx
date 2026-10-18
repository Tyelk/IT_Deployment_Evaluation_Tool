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
    [1, "Does not exist"],
    [2, "Not suitable"],
    [3, "Needs Improvement"],
    [4, "Mostly complete/functional"],
    [5, "Perfect - fully fleshed out"],
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
