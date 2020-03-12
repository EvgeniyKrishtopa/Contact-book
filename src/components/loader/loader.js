import React from 'react';
import loader from './loader.module.scss';

const Loader = () => {
  //TODO: слишком усложняешь стили - просто тупо строкой напиши класс, большего не надо
  return <div className={loader.ldsDualRing}></div>;
}

export default Loader;