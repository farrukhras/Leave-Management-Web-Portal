import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiCircleInfo } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

export default function PendingApprovals() {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const leaveType = {
    "sick_leave": "Sick",
    "casual_leave": "Casual",
    "emergency_leave": "Emergency",
  }

  useEffect(() => {
    const fetchPendingApprovals = async () => {
      try {
        const response = await axios.get('https://ims-devsandbox.codeivy.io/api/getLeaves');
        const pending = response.data.data.filter(leave => leave.status === 'pending');
        setPendingLeaves(pending);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchPendingApprovals();
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
  const filteredLeaves = pendingLeaves.filter(leave => {
    return (
      (selectedLeaveType === 'all' || leave.leave_type.name === selectedLeaveType) &&
      (leave.fname.toLowerCase().includes(searchTerm.toLowerCase()) || leave.lname.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  const count = filteredLeaves.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="flex mb-4">
          <h2 className="text-lg font-semibold text-green-900" style={{marginRight: "5px"}}>Pending Approvals</h2>
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white">{count}</span>
        </span>
        <select className="px-4 py-2 border rounded text-gray-500 text-sm" value={selectedLeaveType} onChange={e => setSelectedLeaveType(e.target.value)}>
          <option value="all">All Leave Types</option>
          {Object.keys(leaveType).map((type, index) => (
            <option key={index} value={type}>{leaveType[type]}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="px-4 py-2 border rounded text-gray-500 text-sm"
          placeholder="Search Employee Name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-800 text-sm">Employee</th>
              <th className="px-4 py-2 text-left text-gray-800 text-sm">Leave Type</th>
              <th className="px-4 py-2 text-center text-gray-800 text-sm">From & To</th>
              <th className="px-4 py-2 text-center text-gray-800 text-sm">No of Days</th>
              <th className="px-4 py-2 text-center text-gray-800 text-sm">Status</th>
              <th className="px-4 py-2 text-center text-gray-800 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr key={index} className="border-b-2 border-gray-100">
                <td className="px-4 py-2 flex items-center text-gray-500 text-sm">
                  {leave.avatar ? (
                    <img src={leave.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  ) : (
                    <FaUser className="w-8 h-8 rounded-full mr-2" />
                  )}
                  <div className="truncate">{leave.fname} {leave.lname}</div>
                </td>
                <td className="px-4 py-2 text-left text-gray-500 text-sm">{leaveType[leave.leave_type.name]}</td>
                <td className="px-4 py-2 text-center text-gray-500 text-sm">{formatDate(leave.from)}-{formatDate(leave.to)}</td>
                <td className="px-4 py-2 text-center text-gray-500 text-sm">{calculateDays(leave.from, leave.to)}</td>
                <td className="px-4 py-2 text-center text-gray-500 text-sm">
                  <div className="inline-flex items-center text-center justify-center h-6 w-20 rounded-full bg-orange-200 text-orange-500">
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </div>
                </td>
                <td className="px-4 py-2 text-center text-gray-500 text-sm flex justify-center items-center">
                  <CiCircleInfo/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
