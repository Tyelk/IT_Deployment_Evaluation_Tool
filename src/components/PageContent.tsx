import type { JSX } from "react/jsx-runtime";
import FactorSection from "./FactorSection";
import { FACTORS } from "../data/factors";
import { useState } from "react";
import type { SelectionResult } from "../types/selectionResult";

export default function PageContent(): JSX.Element {
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

  const test = () => {
    Object.entries(selections).forEach(([factorId, result]) => {
      console.log(`ID: ${factorId}`);
      console.log(`First: ${result.first}`);
      console.log(`Second: ${result.second}`);
    });
  };

  return (
    <>
      <p>PageContent</p>

      {FACTORS.map((factor) => (
        <FactorSection
          key={factor.id}
          factor={factor}
          onChange={handleSelectedValue}
        />
      ))}

      <button onClick={() => test()}>Evaluate</button>
    </>
  );
}
