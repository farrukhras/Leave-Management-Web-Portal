import React from 'react';

export default function LeaveManagementHeader({ selectedSubMenu }) {
	function getCurrentDate() {
    const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    const date = new Date();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedDate = `${day} ${months[monthIndex]}, ${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return formattedDate;
  }

  return (
		<div>
			<div className="flex justify-between items-center py-4 px-6" style={{marginTop: "10px"}}>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Leave Management</h2>
            <span className="text-sm font-semibold text-gray-500">{selectedSubMenu}</span>
          </div>
          <div className="flex items-center space-x-4">a
            <div className="flex items-center space-x-4">
              <p className="text-sm font-semibold text-gray-800">{getCurrentDate()}</p>
            </div>
          </div>
        </div>
		</div>
  )
}
