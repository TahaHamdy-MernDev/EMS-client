import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Flex, calc } from "@chakra-ui/react";
import Image from "next/image";
import CurrentDayAttendance from "@/components/admin/Employees/CurrentDayAttendance";
/*
function getUserLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      // Send this data to your server
      sendLocationToServer(latitude, longitude);
    }, function(error) {
      console.error("Error getting location: ", error);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
  <CurrentDayAttendance/>
*/
const ProfilePage: React.FC = () => {
  return (
    <Container minH={calc.subtract('100svh','5rem')} className="mx-auto p-4 text-white" display={'flex'} justifyContent={'center'} alignItems={'center'} >
      <CurrentDayAttendance />
    </Container>
  );
};



export default ProfilePage;
// const HeaderSection: React.FC = () => {
//   return (
//     <div className="flex items-center mb-8 text-white">
//       <Image
//         width={96}
//         height={96}
//         src="/path/to/profile-pic.jpg"
//         alt="Profile Picture"
//         className="rounded-full h-24 w-24 mr-4"
//       />
//       <div>
//         <h1 className="text-2xl font-bold">John Doe</h1>
//         <p className="text-gray-600">Employee</p>
//       </div>
//     </div>
//   );
// };

// const ProfileInformation: React.FC = () => {
//   return (
//     <div className="profile-information grid grid-cols-2 gap-4 text-white">
//       <div>
//         <h2 className="text-xl font-semibold">Personal Details</h2>
//         <p>Name: John Doe</p>
//         <p>Email: john.doe@example.com</p>
//         <p>Phone: +20 123 456 7890</p>
//         <p>Address: 123 Street, City, Country</p>
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold">Employment Details</h2>
//         <p>Employee ID: EMP12345</p>
//         <p>Department: IT</p>
//         <p>Position: Software Engineer</p>
//         <p>Joining Date: Jan 1, 2020</p>
//       </div>
//     </div>
//   );
// };

// const Attendance: React.FC = () => {
//   return (
//     <div className="attendance">
//       <div className="flex justify-between items-center mb-4">
//         <button className="btn-check-in bg-blue-500 text-white py-2 px-4 rounded">
//           Check-In
//         </button>
//         <button className="btn-check-out bg-red-500 text-white py-2 px-4 rounded">
//           Check-Out
//         </button>
//       </div>
//       <div className="daily-log">
//         <h2 className="text-xl font-semibold mb-2">Daily Attendance Log</h2>
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr>
//               <th className="py-2">Date</th>
//               <th className="py-2">Check-In Time</th>
//               <th className="py-2">Check-Out Time</th>
//             </tr>
//           </thead>
//           <tbody>{/* Map through attendance records and display here */}</tbody>
//         </table>
//       </div>
//       <div className="monthly-summary mt-4">
//         <h2 className="text-xl font-semibold mb-2">
//           Monthly Attendance Summary
//         </h2>
//         {/* Display monthly summary here */}
//       </div>
//     </div>
//   );
// };

// const PermissionRequests: React.FC = () => {
//   return (
//     <div className="permission-requests">
//       <div className="request-form mb-4">
//         <h2 className="text-xl font-semibold mb-2">Request Permission</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Permission Type</label>
//             <select className="w-full border rounded py-2 px-3">
//               <option>Meeting</option>
//               <option>Sick Leave</option>
//               <option>Late Arrival</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Details</label>
//             <textarea
//               className="w-full border rounded py-2 px-3"
//               rows={4}
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             Submit Request
//           </button>
//         </form>
//       </div>
//       <div className="past-requests">
//         <h2 className="text-xl font-semibold mb-2">Past Permission Requests</h2>
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr>
//               <th className="py-2">Type</th>
//               <th className="py-2">Date</th>
//               <th className="py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Map through permission requests and display here */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };