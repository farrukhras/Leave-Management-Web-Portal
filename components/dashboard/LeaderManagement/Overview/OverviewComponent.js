import LeaveStats from './LeaveStats';
import LeaveTrend from './LeaveTrend';
import UpcomingLeaves from './UpcomingLeaves';
import PendingApprovals from './PendingApprovals';

function OverviewComponent() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          <div className="w-full bg-gray-100 mx-auto p-8"> {/* Changed width to full */}
            <LeaveStats />
            <div className="flex mt-6">
              <div className="w-1/2 mr-2">
                <div className="w-full rounded-lg bg-white p-4">
                  <LeaveTrend />
                </div>
              </div>
              <div className="w-1/2 ml-2">
                <div className="w-full rounded-lg bg-white p-4">
                  <UpcomingLeaves />
                </div>
              </div>
            </div>
            <br/>
            <div>
              <div className="w-full rounded-lg bg-white p-4">
                <PendingApprovals/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewComponent;
