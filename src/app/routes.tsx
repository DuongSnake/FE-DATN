import PageNotFound from './shared/error/page-not-found';
import React from 'react';
import { Route, Routes as RoutesRoute } from 'react-router-dom';
import Login from './modules/login/login';
import PrivateSite from './shared/layout/layout';

const Routes = () => {
  return (
    <>
      <RoutesRoute>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/" element={<PrivateSite />} />
        <Route path="*" element={<PageNotFound />} />
      </RoutesRoute>
    </>
  );
};

export default Routes;
