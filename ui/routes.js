import { createBrowserRouter } from "react-router"
import LoginPage from "./src/pages/Login";
import SignupPage from "./src/pages/Signup";
import AboutPage from "./src/pages/About"

export const router= createBrowserRouter([
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignupPage },
  { path: "/about", Component: AboutPage },
]);