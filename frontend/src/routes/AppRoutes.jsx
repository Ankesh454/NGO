import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../admin/components/ProtectedRoute";
import AdminLayout from "../admin/components/AdminLayout";
import Loader from "../components/common/Loader";

/* Public Pages (Lazy Loaded) */
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const OurWork = lazy(() => import("../pages/OurWork"));
const Contact = lazy(() => import("../pages/Contact"));
const JoinUs = lazy(() => import("../pages/JoinUs"));
const Gallery = lazy(() => import("../pages/Gallery"));
const Donate = lazy(() => import("../pages/Donate"));

/* Admin Pages (Lazy Loaded) */
const Login = lazy(() => import("../admin/pages/Login"));
const Dashboard = lazy(() => import("../admin/pages/Dashboard"));
const AdminDonations = lazy(() => import("../admin/pages/Donations"));
const AdminContacts = lazy(() => import("../admin/pages/Contacts"));
const AdminJoinUs = lazy(() => import("../admin/pages/JoinUs"));
const AdminGallery = lazy(() => import("../admin/pages/Gallery"));

const withSuspense = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "about", element: withSuspense(About) },
      { path: "our-work", element: withSuspense(OurWork) },
      { path: "contact", element: withSuspense(Contact) },
      { path: "join-us", element: withSuspense(JoinUs) },
      { path: "gallery", element: withSuspense(Gallery) },
      { path: "donate", element: withSuspense(Donate) },
    ],
  },

  { path: "/admin/login", element: withSuspense(Login) },

  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: withSuspense(Dashboard) },
          { path: "donations", element: withSuspense(AdminDonations) },
          { path: "contacts", element: withSuspense(AdminContacts) },
          { path: "join-us", element: withSuspense(AdminJoinUs) },
          { path: "gallery", element: withSuspense(AdminGallery) },
        ],
      },
    ],
  },
]);

export default AppRoutes;
