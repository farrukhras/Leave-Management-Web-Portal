import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpcomingLeaves() {
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState('all');

  const leaveType = {
    "sick_leave": "Sick",
    "casual_leave": "Casual",
    "emergency_leave": "Emergency",
  }

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('https://ims-devsandbox.codeivy.io/api/getLeaves');
        const approved = response.data.data.filter(leave => leave.status === 'approved');
        setApprovedLeaves(approved);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const calculateDays = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // If the dates are the same, return 1
    return diffDays === 0 ? 1 : diffDays;
  };

  // Filter pending leaves based on selected leave type and search term
  const filteredLeaves = selectedLeaveType === 'all' ? approvedLeaves : approvedLeaves.filter(leave => leave.leave_type.name === selectedLeaveType);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Leaves</h2>
        <select className="px-4 py-2 border rounded text-gray-500 text-sm" value={selectedLeaveType} onChange={e => setSelectedLeaveType(e.target.value)}>
          <option value="all">All Leave Types</option>
          {Object.keys(leaveType).map((type, index) => (
            <option key={index} value={type}>{leaveType[type]}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-800 text-sm">Employee</th>
              <th className="px-4 py-2 text-left text-gray-800 text-sm">Leave Type</th>
              <th className="px-4 py-2 text-center text-gray-800 text-sm">From & To</th>
              <th className="px-4 py-2 text-center text-gray-800 text-sm">No of Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr key={index} className="border-b-2 border-gray-100">
                <td className="px-4 py-2 flex items-center text-gray-500 text-sm">
                  {leave.avatar && <img src={leave.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />}
                  <div className="truncate">{leave.fname} {leave.lname}</div>
                </td>
                <td className="px-4 py-2 text-gray-500 text-sm">{leaveType[leave.leave_type.name]}</td>
                <td className="px-4 py-2 text-center text-gray-500 text-sm">{formatDate(leave.from)}-{formatDate(leave.to)}</td>
                <td className="px-4 py-2 text-center text-gray-500 text-sm">{calculateDays(leave.from, leave.to)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};