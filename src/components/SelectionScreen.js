import { useState } from "react";
import PropTypes from "prop-types";

function SelectionScreen({ mapPreviews }) {
  const [selectedMapIndex, setSelectedMapIndex] = useState(0);

  function selectNextMap() {
    setSelectedMapIndex((prev) => (prev + 1) % mapPreviews.length);
  }

  function selectPreviousMap() {
    setSelectedMapIndex((prev) => {
      prev -= 1;
      const lastIndex = mapPreviews.length - 1;

      if (prev === -1) prev = lastIndex;

      return prev;
    });
  }

  return (
    <div className="selection-screen">
      <button
        aria-label="previous map"
        className="selection-screen__prev-btn"
        type="button"
        onClick={selectPreviousMap}
      >
        {"<"}-
      </button>
      {mapPreviews[selectedMapIndex]}
      <button
        className="selection-screen__next-btn"
        aria-label="next map"
        type="button"
        onClick={selectNextMap}
      >
        -{">"}
      </button>
    </div>
  );
}

SelectionScreen.propTypes = {
  mapPreviews: PropTypes.any.isRequired,
};

export default SelectionScreen;
