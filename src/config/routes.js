// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";
import LayoutGuia from "../layouts/LayoutGuia";

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminCourses from "../pages/Admin/Courses";
import AdminBlog from "../pages/Admin/Blog";
import AdminGuias from "../pages/Admin/Guias"

// Guia Pages
import GuiaHome from "../pages/Guia";
import GuiaSingIn from "../pages/Guia/SignInGuia";

// Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Courses from "../pages/Courses";
import Blog from "../pages/Blog";

// Other
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/guia",
    component: LayoutGuia,
    exact: false,
    routes: [
      {
        path: "/guia",
        component: GuiaHome,
        exact: true
      },
      {
        path: "/guia/login",
        component: GuiaSingIn,
        exact: true
      }
    ]
  },
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true
      },
      {
        path: "/admin/login",
        component: AdminSingIn,
        exact: true
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true
      },
      {
        path: "/admin/menu",
        component: AdminMenuWeb,
        exact: true
      },
      {
        path: "/admin/courses",
        component: AdminCourses,
        exact: true
      },
      {
        path: "/admin/blog",
        component: AdminBlog,
        exact: true
      },
      {
        path: "/admin/guias",
        component: AdminGuias,
        exact: true
      },
      {
        component: Error404
      }
    ]
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true
      },
      {
        path: "/contact",
        component: Contact,
        exact: true
      },
      {
        path: "/courses",
        component: Courses,
        exact: true
      },
      {
        path: "/blog",
        component: Blog,
        exact: true
      },
      {
        path: "/blog/:url",
        component: Blog,
        exact: true
      },
      {
        component: Error404
      }
    ]
  }
];

export default routes;
