import React, { useState } from "react";
import "./TermSelector.css";

const TermSelector = ({ onSelectTerm }) => {
  const terms = ["Spring", "Summer", "Fall", "Winter"];
  const [selectedTerm, setSelectedTerm] = useState("");

  const handleSelect = (term) => {
    setSelectedTerm(term);
    if (onSelectTerm) onSelectTerm(term); // callback to parent
  };

  return (
    <div className="term-selector">
      <h3>Select Term</h3>
      <div className="term-options">
        {terms.map((term) => (
          <button
            key={term}
            className={selectedTerm === term ? "term-btn selected" : "term-btn"}
            onClick={() => handleSelect(term)}
          >
            {term}
          </button>
        ))}
      </div>
      {selectedTerm && (
        <p className="selected-term">Selected Term: <strong>{selectedTerm}</strong></p>
      )}
    </div>
  );
};

export default TermSelector;
