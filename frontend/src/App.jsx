import {Sidebar, SidebarItem} from "./components/Sidebar";
import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from "lucide-react";

function App() {
  return (
      <div className="bg-gray-800 text-white dark:bg-gray-900">
          <div>
              <Sidebar>
                  <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert />
                  <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" active />
                  <SidebarItem icon={<UserCircle size={20} />} text="Users" />
                  <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
                  <SidebarItem icon={<Package size={20} />} text="Orders" alert />
                  <SidebarItem icon={<Receipt size={20} />} text="Billings" />
                  <hr className="my-3 border-gray-700 dark:border-gray-500" />
                  <SidebarItem icon={<Settings size={20} />} text="Settings" />
                  <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
              </Sidebar>
          </div>
      </div>
  )
}

export default App
