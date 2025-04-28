import { Fragment, lazy, Suspense } from "react";
import { Routes as Routers, Route } from "react-router-dom";

import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import { IRoutes } from "../types";
import { PATH_NAME } from "../shared/constants/routes";

const Home = lazy(() => import("../pages/Dashboard/Home"));
const Transaction = lazy(() => import("../pages/Transaction/Transaction"));
const UserProfiles = lazy(() => import("../pages/UserProfiles"));
const Admin = lazy(() => import("../pages/Admin/Admin"));
const SignIn = lazy(() => import("../pages/AuthPages/SignIn"));
const Category = lazy(() => import("../pages/Category/Category"));
const Product = lazy(() => import("../pages/Product/Product"));
const Seller = lazy(() => import("../pages/Seller/Seller"));
const Bank = lazy(() => import("../pages/Bank/Bank"));
const BankAccount = lazy(() => import("../pages/BankAccount/BankAccount"));
const CreateProduct = lazy(() => import("../pages/Product/CreateProduct"));
const CreateBankAccount = lazy(
  () => import("../pages/BankAccount/CreateBankAccount")
);

const routesConfig: IRoutes[] = [
  {
    path: PATH_NAME.Home,
    guard: AuthGuard,
    layout: AppLayout,
    element: Home,
  },
  {
    path: PATH_NAME.Category,
    guard: AuthGuard,
    layout: AppLayout,
    element: Category,
  },
  {
    path: PATH_NAME.Admin,
    guard: AuthGuard,
    layout: AppLayout,
    element: Admin,
  },
  {
    path: PATH_NAME.Product,
    guard: AuthGuard,
    layout: AppLayout,
    element: Product,
  },
  {
    path: PATH_NAME.Transaction,
    guard: AuthGuard,
    layout: AppLayout,
    element: Transaction,
  },
  {
    path: PATH_NAME.CreateProduct,
    guard: AuthGuard,
    layout: AppLayout,
    element: CreateProduct,
  },
  {
    path: PATH_NAME.Seller,
    guard: AuthGuard,
    layout: AppLayout,
    element: Seller,
  },
  {
    path: PATH_NAME.Bank,
    guard: AuthGuard,
    layout: AppLayout,
    element: Bank,
  },
  {
    path: PATH_NAME.BankAccount,
    guard: AuthGuard,
    layout: AppLayout,
    element: BankAccount,
  },
  {
    path: PATH_NAME.UpdateBankAccount,
    guard: AuthGuard,
    layout: AppLayout,
    element: CreateBankAccount,
  },
  {
    path: PATH_NAME.CreateBankAccount,
    guard: AuthGuard,
    layout: AppLayout,
    element: CreateBankAccount,
  },
  {
    path: PATH_NAME.Profile,
    guard: AuthGuard,
    layout: AppLayout,
    element: UserProfiles,
  },
  {
    path: PATH_NAME.Login,
    guard: GuestGuard,
    layout: AuthLayout,
    element: SignIn,
  },
];

const renderRoutes = (routes: IRoutes[]) => {
  return (
    <>
      {routes ? (
        <Suspense fallback={<div />}>
          <Routers>
            {routes.map((route: IRoutes, idx: number) => {
              const Guard = route.guard || Fragment;
              const Layout = route.layout || Fragment;
              const Component = route.element;

              return (
                <Route
                  key={`routes-${idx}`}
                  path={route.path}
                  element={
                    <Guard>
                      <Layout>
                        <Component />
                      </Layout>
                    </Guard>
                  }
                >
                  {route.routes ? renderRoutes(route.routes) : null}
                </Route>
              );
            })}
          </Routers>
        </Suspense>
      ) : null}
    </>
  );
};

const Routes = () => renderRoutes(routesConfig);

export default Routes;
