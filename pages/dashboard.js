import React, {useState} from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import LeaveManagement from '../components/dashboard/LeaderManagement/LeaveManagement';

function Dashboard() {
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  return (
    <div className="flex h-screen">
      <div className="w-60 bg-gray-50 text-white">
        <Sidebar onSubMenuItemClicked={setSelectedSubMenu} />
      </div>
      <div className="flex-1 flex flex-col bg-white">
        <div className="shadow-md">
          <Header />
        </div>
        <div>
          <LeaveManagement selectedSubMenu={selectedSubMenu} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
