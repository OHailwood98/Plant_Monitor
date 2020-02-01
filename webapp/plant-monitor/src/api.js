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
    confirm:(token) => axios.post("/api/user/confirm", {token}).then(res =>res.data.user),
  },
  times: {
    addTime: time =>
      axios.post("/api/time/addnew", { time }).then(res => res.data),
    undoDelete: time =>
      axios.post("/api/time/undodelete", { time }).then(res => res.data),
    fastest: () =>
      axios.get("/api/time/getfasttimes").then(res => res.data.timeList),
    getTimes: () =>
      axios.get("/api/time/gettimes").then(res => res.data.timeList),
    getMyTimes: () =>
      axios.get("/api/time/getmytimes").then(res => res.data.timeList),
    removeTime: time =>
      axios.post("/api/time/removetime", { time }).then(res => res.data)
  }
};
