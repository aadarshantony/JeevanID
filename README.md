
JeevanID - Hackathon Project
============================

Project Title
-------------
**JeevanID**: Rapid Emergency Response System for Road Accident Victims

Description
-----------
JeevanID is an innovative solution designed to address the critical delays faced by accident victims in India, particularly in rural and highway areas. By providing instant alerts to nearby hospitals, ambulances, and first responders, JeevanID aims to reduce the response time and save lives.

Key Problems Solved:
- Delayed emergency medical response in accident scenarios
- Difficulty in identifying victims and accessing critical health information
- Communication gaps between accident sites and emergency services

Target Users:
- Accident victims
- Ambulance and hospital services
- Emergency responders and government agencies

Features
--------
- **Instant Emergency Alerts**: Sends automatic emergency card to medics dashboard.
- **Accident Location Tracking**: Uses GPS to share precise accident location for faster assistance.
- **Victim Health Profiles**: Provides responders access to critical medical info via a QR-based identification system and from JeevanID Card.
- **QR-Based Identification**: Each user has a unique JeevanID QR code for instant identification in emergencies.
- **Admin Dashboard**: Monitor incidents, response times, and emergency reports in real-time.
- **Real-Time Analytics**: Track number of incidents, average response times, and area-specific statistics.
- **Secure Data Handling**: Sensitive victim data is encrypted and securely stored in the database.

Tech Stack
----------
- **Frontend**: React.js (react + vite ), TailwindCSS, React Icon, React Query
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, cloudinary (image storage)
- **APIs**: leaflet package for custom map
- **Other Tools**: QR code generation, RESTful APIs, JWT Authentication

Installation & Setup
-------------------
### Environment Variables
Create `.env` in the **backend** folder:
```env
FRONT_END_URL=http://localhost:5173
PORT=5000
MONGO_URI=yourmongodbconnectionstring
NODE_ENV=dev
```

Create `.env` in the **client** folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=present_mode
```

1. Clone the repository:
   ```bash
   git clone https://github.com/aadarshantony/JeevanID.git
   cd jeevanid
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   cd backend
   node index.js
   ```
4. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
5. Open the app in your browser:
   [http://localhost:5173](http://localhost:5173)

Usage Instructions
------------------
1. Users registers up and generate their unique **JeevanID QR code**.
2. In case of an accident, scanning the QR code instantly and hitting report alerts and send a card to the medics department.
3. Admins can monitor all incidents and response metrics through the dashboard.

Screenshots
-----------
![Dashboard](link-to-screenshot.png)
![Accident Alert](link-to-screenshot.png)
![QR Code Scan](link-to-screenshot.png)

Demo Link
---------
- **Live Website:** [Live Demo Link](https://jeevanid.vercel.app/)
- **Demo Video:** [Drive Video](https://youtu.be/example)

Contributors
------------
- **Adarsh Antony:** Full-stack development, UI/UX, QR system integration

License
-------
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
----------------
- Hackathon organizers and mentors
- Open-source libraries used (React, Express, MongoDB, TailwindCSS, Flowbite)
- Leaflet package
