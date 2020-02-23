import { renderReact } from 'hypernova-react';
import App from './App';

const render = renderReact(
  'App.js', // this file's name (or really any unique name)
  App,
);

export default App;
export {
    render,
}
