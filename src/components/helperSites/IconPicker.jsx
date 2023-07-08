/**
* @fileOverview
* IconPicker component for selecting and displaying icons.
* Provides an interactive interface to choose an icon from a list.
*/

import { useState } from 'react';

function IconPicker({ icons, placeholderIcon, onIconChange, selectedIcon }) {
  const [showIconSelection, setShowIconSelection] = useState(false);

  const handleIconSelect = (index) => {
    setShowIconSelection(false);
    onIconChange(index);
  };

  /**
   *Component for rendering an icon selection modal.
   * @returns Element to be rendered.
   */
  const IconSelectionModal = () => {
    return (
      <div>
        <h4>Wähle ein Icon:</h4>
        <div>
          {icons.map((icon, index) => (
            <div
              key={index}
              onClick={() => handleIconSelect(index)}
              style={{ cursor: 'pointer' }}
            >
              <img style={{ width: '30px' }} src={icon} alt={icon} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
  * Renders either an icon selection modal or a selected icon based on the current state.
  * @returns {React.Element} The rendered icon or icon selection modal.
  */
  const renderSelectedIcon = () => {
    return (
      <img
        style={{ width: '30px' }}
        src={selectedIcon !== null ? icons[selectedIcon] : placeholderIcon}
        alt={selectedIcon !== null ? `Icon ${selectedIcon}` : 'Choose Icon'}
      />
    );
  };

  return (
    <div>
      <button onClick={() => setShowIconSelection(!showIconSelection)}>
        {showIconSelection ? <IconSelectionModal /> : renderSelectedIcon()}
      </button>
    </div>
  );
}
export default IconPicker;

