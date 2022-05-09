import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Payout from './pages/Payout/Payout';
import Collection from './pages/Collection/Collection';
import Notes from './pages/Notes/Notes';
import Setting from './pages/Setting/Setting';
import Help from './pages/Help/Help';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path='*' element={<App />} />
      <Route path='/payout' element={<Payout />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/notes' element={<Notes />} />
      <Route path='/setting' element={<Setting />} />
      <Route path='/help' element={<Help />} />
    </Routes>
  </HashRouter>
);