import React from 'react'
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const userDoc = JSON.parse(localStorage.getItem("user-info"));
const userId = userDoc.uid;

const UserDashboard = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const q = query(collection(firestore, "users", userId, "meetings"))
      const querySnapshot = await getDocs(q);
      const meetingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMeetings(meetingsData);
    };

    fetchMeetings();
  }, []);

  return (
    <div>
      <h1>UserDashboard</h1>
      {meetings.length > 0 ? (
        <ul>
          {meetings.map(meeting => (
            <li key={meeting.id}>
              <div>Meeting ID: {meeting.meetingID}</div>
              <div>Start Time: {meeting.start_time}</div>
              {/* Render other meeting details here */}
            </li>
          ))}
        </ul>
      ) : (
        <div>No meetings found</div>
      )}
    </div>
  );
};

export default UserDashboard;