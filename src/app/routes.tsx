import PageNotFound from './shared/error/page-not-found';
import React from 'react';
import { Route, Routes as RoutesRoute } from 'react-router-dom';
import LoginAdmin from './modules/login/login';
import LoginUser from './modules/user-side/layout-user-side/login';
import AdminSite from './shared/layout/layout';
import UserSite from './modules/user-side/layout-user-side/layout-student';

const Routes = () => {
  return (
    <>
      <RoutesRoute>
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user" element={<UserSite />} />
        <Route path="/admin" element={<AdminSite />} />
        <Route path="*" element={<PageNotFound />} />
      </RoutesRoute>
    </>
  );
};

export default Routes;
