import { useState } from 'react';
import { icons } from './IconsDataEntry';
import { placeholderIcon } from './IconsDataEntry';
import { dummyIcon } from './IconsDataEntry';


function IconPicker({ icons, placeholderIcon, onIconChange, selectedIcon }) {
  const [showIconSelection, setShowIconSelection] = useState(false);

  const handleIconSelect = (index) => {
    setShowIconSelection(false);
    onIconChange(index);
  };

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
        {/* {showIconSelection ? 'Schließen' : 'Wähle ein Icon'} */}
      </button>
    </div>
  );
}
export default IconPicker;

// import { useState } from 'react';
// import { icons } from './IconsDataEntry';
// import { placeholderIcon } from './IconsDataEntry';
// import { dummyIcon } from './IconsDataEntry';


// function IconPicker({ icons, placeholderIcon, onIconChange, selectedIcon }) {
//   const [showIconSelection, setShowIconSelection] = useState(false);

//   const handleIconSelect = (index) => {
//     setShowIconSelection(false);
//     onIconChange(index);
//   };

//   const IconSelectionModal = () => {
//     return (
//       <div>
//         <h4>Wähle ein Icon:</h4>
//         <div>
//           {icons.map((icon, index) => (
//             <div
//               key={index}
//               onClick={() => handleIconSelect(index)}
//               style={{ cursor: 'pointer' }}
//             >
//               <img style={{ width: '30px' }} src={icon} alt={icon} />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderSelectedIcon = () => {
//     return (
//       <img
//         style={{ width: '30px' }}
//         src={selectedIcon !== null ? icons[selectedIcon] : placeholderIcon}
//         alt={selectedIcon !== null ? `Icon ${selectedIcon}` : 'Choose Icon'}
//       />
//     );
//   };

//   return (
//     <div>
//       <button onClick={() => setShowIconSelection(!showIconSelection)}>
//         {showIconSelection ? <IconSelectionModal /> : renderSelectedIcon()}
//         {/* {showIconSelection ? 'Schließen' : 'Wähle ein Icon'} */}
//       </button>
//     </div>
//   );
// }

// export default IconPicker;