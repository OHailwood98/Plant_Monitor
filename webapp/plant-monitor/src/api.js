import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/user/login", { credentials }).then(res => res.data.user),
    signup: credentials =>
      axios
        .post("/api/user/signup", { credentials })
        .then(res => res.data.user),
    updatePassword: credentials =>
      axios
        .post("/api/user/updatepassword", { credentials })
        .then(res => res.data.user),
    confirm: token =>
      axios.post("/api/user/confirm", { token }).then(res => res.data.user),
    getDevices: () => 
      axios.get("/api/user/getdevices")
      .then(res => res.data.devices)
  },
  device:{
    deviceInfo: id =>
      axios.post("api/device/deviceinfo", {id}).then(res  => res.data.device),
    editDevice: device =>
      axios.post("api/device/editdevice", {device}).then(res  => res.data),
    addDevice: device =>
      axios.post("api/device/adddevice", {device}).then(res  => res.data),
  },
  reading:{
    getOneDay: id =>
      axios.post("api/reading/getoneday", {id}).then(res  => res.data.timeList),
    getOneWeek: id =>
      axios.post("api/reading/getoneweek", {id}).then(res  => res.data.timeList),
    getOneMonth: id =>
      axios.post("api/reading/getonemonth", {id}).then(res  => res.data.timeList),
  }
};
