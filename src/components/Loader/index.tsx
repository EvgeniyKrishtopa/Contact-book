import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="page-center">
      <div
        className="inline-block w-10 h-10 after:content-[''] after:block after:w-10 after:h-10
          after:rounded-full after:border-[6px]
          after:[border-color:var(--color-gray-bold)_transparent_var(--color-gray-bold)_transparent]
          after:animate-lds-dual-ring"
      ></div>
    </div>
  );
};

export default Loader;
