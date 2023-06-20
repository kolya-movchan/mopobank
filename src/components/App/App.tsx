import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, History, NotFound } from '../../routes';
import { Navigation } from '..';
import { TransactionForm } from '../../routes/TransactionForm';

export function App() {
  return (
    <>
      <Navigation />

      <main>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/add" element={<TransactionForm />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
