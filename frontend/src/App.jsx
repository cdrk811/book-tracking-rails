import Sidebar from "./components/Sidebar";
import {
    LifeBuoy,
    LayoutDashboard,
    Settings,
    Search,
    CalendarCheck2,
    BookHeart,
    Upload
} from "lucide-react";
import SidebarItem from "./components/SidebarItem";

function App() {
  return (
      <div className="bg-gray-800 text-white dark:bg-gray-900">
          <div>
              <Sidebar>
                  <SidebarItem link="/" icon={<LayoutDashboard size={20} />} text="Dashboard" active />
                  <SidebarItem link="/search" icon={<Search size={20} />} text="Search" alert />
                  <SidebarItem link="/schedule" icon={<CalendarCheck2 size={20} />} text="Calendar" />
                  <SidebarItem link="/favourites" icon={<BookHeart size={20} />} text="Favourites" />
                  <hr className="my-3 border-gray-700 dark:border-gray-500" />
                  <SidebarItem link="/upload" icon={<Upload size={20} />} text="Upload" />
                  <SidebarItem link="/" icon={<Settings size={20} />} text="Settings" />
                  <SidebarItem link="/" icon={<LifeBuoy size={20} />} text="Help" />
              </Sidebar>
          </div>
      </div>
  )
}

export default App
