/// <reference types="react-scripts" />
declare module '*.jpg';
declare module 'material-icons-react';
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
