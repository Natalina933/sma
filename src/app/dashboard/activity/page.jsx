// pages/dashboard/activities.js
import { DashboardActivities } from "./DashboardActivities";

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const fetcher = (url) => fetch(url).then((res) => res.json());

export default DashboardActivities;
