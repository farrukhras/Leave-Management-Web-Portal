import LeaveManagementHeader from './Overview/LeaveManagementHeader';
import OverviewComponent from './Overview/OverviewComponent';
import RequestLeaveComponent from './RequestLeave/RequestLeaveComponent';
import LeaveCalendarComponent from './LeaveCalendar/LeaveCalenderComponent';

function LeaveManagement({ selectedSubMenu }) {
  return (
    <div className="flex flex-col h-screen">
      <LeaveManagementHeader selectedSubMenu={selectedSubMenu}/>
      <div className="flex-1 bg-white">
        {selectedSubMenu === 'Overview' && <OverviewComponent />}
        {selectedSubMenu === 'Request Leave' && <RequestLeaveComponent />}
        {selectedSubMenu === 'Leave Calendar' && <LeaveCalendarComponent />}
      </div>
    </div>
  );
}

export default LeaveManagement;
