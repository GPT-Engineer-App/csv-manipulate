import { Home, FileSpreadsheet } from "lucide-react";
import Index from "./pages/Index.jsx";
import CSVManager from "./pages/CSVManager.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "CSV Manager",
    to: "/csv-manager",
    icon: <FileSpreadsheet className="h-4 w-4" />,
    page: <CSVManager />,
  },
];