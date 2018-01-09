import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header.js';
import GameOfLife from './components/game_of_life.js';
import Footer from './components/footer.js';

const App = (props) => {
  return (
    <div>
      <Header />
      <GameOfLife />
      <Footer />
    </div>
  );
};

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
