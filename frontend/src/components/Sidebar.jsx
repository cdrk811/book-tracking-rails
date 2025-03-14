import {ChevronFirst, ChevronLast, MoreVertical} from "lucide-react";
import {createContext, useState} from "react";

import Logo from '../assets/Book-Tracking-logo.png';

export const SidebarContext = createContext()

const Sidebar = ({ children, user }) => {
    const [expanded, setExpanded] = useState(true)

    return (
        <aside className={`
            h-screen ${expanded ? "mx-w-[300px] w-[300px]" : "mx-w-[70px] w-[70px]"}
        `}
        >
            <nav className="h-full flex flex-col bg-gray-900 text-white dark:bg-gray-800 shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={Logo}
                        className={`overflow-hidden transition-all ${expanded ? "w-44" : "w-0"}`}
                        alt="" />

                    <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg bg-gray-900 hover:bg-gray-800">
                        {expanded ? <ChevronFirst/> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3 border-gray-700 dark:border-gray-500">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={`
                        flex justify-between items-center
                        overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0" }
                    `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">{user?.username || 'John Doe'}</h4>
                            <span className="text-xs text-gray-600">{user?.email || 'johndoe@gmail.com'}</span>
                        </div>
                        <MoreVertical size={20}  />
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar;
