/** @format */

// /** @format */

// import React from 'react';
// import './Loader.css';
// const Loader = () => {
//   {
//     var loader = document.querySelector('.loaderchild');
//     setTimeout(function () {
//       loader.style.display = 'none';
//     }, 3000);
//   }
//   return (
//     <div className="loader">
//       <div className="loaderchild"></div>
//     </div>
//   );
// };
// export default Loader;
/** @format */

import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);

  return (
    // <div className={`loader ${isVisible ? '' : 'hidden'}`}>
    //   <div className="loaderchild"></div>
    // </div>
    <div className={`loader ${isVisible ? '' : 'hidden'}`}>
      <div className="forline"></div>
      <div className="loaderchild"></div>
    </div>
  );
};

export default Loader;
