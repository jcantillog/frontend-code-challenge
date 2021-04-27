import React from "react";

const ToggleCombatPoints = ({ onCheck }) => {
  return (
    <label htmlFor="maxCP" className="max-cp">
      <input type="checkbox" id="maxCP" onChange={onCheck} />
      <small>Maximum Combat Points</small>
    </label>
  );
};

export default ToggleCombatPoints;
