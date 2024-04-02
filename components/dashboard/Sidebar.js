import Image from 'next/image';
import { useState } from 'react';
import attendance from '../../public/assets/attendance.svg';
import dashboard from '../../public/assets/dashboard.svg';
import help from '../../public/assets/help.svg';
import leave_management from '../../public/assets/leave_management.svg';
import logout from '../../public/assets/logout.svg';
import onboarding from '../../public/assets/onboarding.svg';
import payroll from '../../public/assets/payroll.svg';
import performance from '../../public/assets/performance.svg';
import training from '../../public/assets/training.svg';
import { useRouter } from 'next/router';

export default function Sidebar({ onSubMenuItemClicked }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedSubMenuItem, setSelectedSubMenuItem] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({});
  const router = useRouter();

  function toggleSubmenu(submenu, position) {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
    setSubmenuPosition(position);
  }

  function menuItemClicked(itemName) {
    if (itemName === "Logout") {
      // BONUS TASK: on clicking user menu it shows an option of logout
      localStorage.removeItem('auth_token');
      router.push('/');
    } else {
      setSelectedMenuItem(itemName);
      setOpenSubmenu(openSubmenu === itemName ? null : itemName);
    }
  }

  function subMenuItemClicked(itemName) {
    setSelectedSubMenuItem(itemName);
    onSubMenuItemClicked(itemName);
  }

  const menuItems = [
    { name: 'Dashboard', icon: dashboard, key: 'dashboard' },
    { name: 'Leave Management', icon: leave_management, key: 'leave-management', submenu: ['Overview', 'Request Leave', 'Leave Calendar'] },
    { name: 'Attendance', icon: attendance, key: 'attendance' },
    { name: 'Onboarding', icon: onboarding, key: 'onboarding' },
    { name: 'Performance Mgt', icon: performance, key: 'performance-mgt' },
    { name: 'Payroll', icon: payroll, key: 'payroll' },
    { name: 'Training and Dev', icon: training, key: 'training-dev' },
    { name: 'Help', icon: help, key: 'help' },
    { name: 'Logout', icon: logout, key: 'logout' },
  ];

  return (
    <div className="fixed h-full overflow-y-auto bg-white w-60 border-r border-gray-200 z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold text-gray-800">Web Portal</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.key} className="relative">
              <div
                className={`flex items-center cursor-pointer rounded-md py-2 px-3 ${
                  selectedMenuItem === item.name ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-200 text-gray-600'
                }`}
                onClick={() => menuItemClicked(item.name)}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  className="h-5 w-5 mr-4"
                  style={{ filter: selectedMenuItem === item.name ? 'brightness(0) saturate(70%) invert(71%) sepia(94%) saturate(308%) hue-rotate(186deg) brightness(113%) contrast(88%)' : '' }}
                />
                <span className={`${selectedMenuItem === item.name ? 'text-blue-600' : 'text-gray-600'} transition-colors duration-300 text-sm`}>
                  {item.name}
                </span>
                {item.submenu && (
                  <button
                    type="button"
                    onClick={(e) => toggleSubmenu(item.name, e.currentTarget.getBoundingClientRect())}
                    className={`ml-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${
                      openSubmenu === item.name ? 'rotate-90' : ''
                    }`}
                  >
                    <svg
                      className="h-4 w-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.293l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414-1.414L10 12.586l-4.707-4.707z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {openSubmenu === item.name && item.submenu && (
                <ul
                  className="text-gray-200 py-1 px-4 left-10 w-max z-10"
                  style={{ left: submenuPosition.left ? submenuPosition.left - 10 : 0, top: submenuPosition.bottom || 0 }}
                >
                  {item.submenu.map((subItem) => (
                    <div
                      key={subItem}
                      className={`flex items-center cursor-pointer rounded-md py-2 px-3 ${
                        selectedSubMenuItem === subItem ? 'text-blue-600' : 'hover:bg-gray-200 text-gray-600'
                      }`}
                      onClick={() => subMenuItemClicked(subItem)}
                    >
                      <span className={`${selectedSubMenuItem === subItem ? 'text-blue-600' : 'text-gray-600'} transition-colors duration-300 text-sm`}>
                        {subItem}
                      </span>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
