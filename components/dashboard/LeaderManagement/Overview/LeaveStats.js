import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

function LeaveStats() {
  const cardItems = [
    { cardTitle: 'Annual Leave', leaves: "15"},
    { cardTitle: 'Sick Leave', leaves: "11"},
    { cardTitle: 'Other Leave', leaves: "6"},
    { cardTitle: 'Pending Request', leaves: "5"},
  ];

  return (
    <div className="flex justify-between">
      {cardItems.map((item, index) => (
        <div key={index} className={`w-full bg-white rounded-lg p-4 ${index === 0 ? '' : 'ml-4'} ${index === cardItems.length - 1 ? '' : 'mr-4'}`}>
          <div className="flex justify-between mb-4">
            <h6 className="text-base font-medium text-gray-500">{item.cardTitle}</h6>
            <div className="flex items-center">
              <BsThreeDotsVertical className="text-gray-600 cursor-pointer" />
            </div>
          </div>
          <div className="flex justify-between">
            <h6 className="text-lg font-bold text-gray-700">{item.leaves}</h6>
            <p className="text-sm text-gray-500">This month</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveStats;
