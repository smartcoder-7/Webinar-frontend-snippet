import moment from 'moment';

const timeSince = (date: any)=> {
    let seconds = Math.floor(((new Date() as any) - date) / 1000);
    let interval = Math.floor(seconds / 604800);
    if (interval >= 1) {
      return moment(date).format('MM/DD/YYYY');
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return moment().subtract(interval, 'd').format('dddd');
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hrs";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minutes";
    }
    return  "A few seconds";
  }
export default timeSince;