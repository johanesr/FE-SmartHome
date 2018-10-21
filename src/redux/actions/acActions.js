import axios from "axios/index";
import { AC_ON, AC_OFF, GET_AC, GET_AC_STATUS, SET_TIMER } from "./actionType";

const apiUrl = "http://10.25.150.23:8000/homie/device/";
// const deviceUrl = "http://10.25.150.228:8000/homie/device/";
// const apiUrl = "http://10.25.150.228:8000/homie/device/turn-on-ac";
// const getAcUrl = "http://10.25.150.228:8000/homie/device/get-all-users-ac";
// const getAcStatusUrl =
//   "http://10.25.150.228:8000/homie/device/get-ac-by-device-id";

const httpOptions = {
  headers: {
    "Content-type": "application/form-data",
    mandatory: localStorage.getItem("token")
  },
  params: {
    accessToken: localStorage.getItem("token")
  }
};

function turnOnAc(deviceID) {
  return {
    type: AC_ON,
    acOnPayload: new Promise(resolve => {
      axios
        .get(apiUrl + "turn-on-ac", {
          headers: {
            "Content-type": "application/form-data",
            mandatory: localStorage.getItem("token")
          },
          params: {
            deviceID: deviceID,
            accessToken: localStorage.getItem("token")
          }
        })
        .then(response => resolve(response.data));
    })
  };
}
function turnOffAc(deviceID) {
  return {
    type: AC_OFF,
    acOffPayload: new Promise(resolve => {
      axios
        .get(apiUrl + "turn-off-ac", {
          headers: {
            "Content-type": "application/form-data",
            mandatory: localStorage.getItem("token")
          },
          params: {
            deviceID: deviceID,
            accessToken: localStorage.getItem("token")
          }
        })
        .then(response => resolve(response.data));
    })
  };
}

function getAc() {
  return {
    type: GET_AC,
    getacPayload: new Promise(resolve => {
      axios.get(apiUrl + "get-all-users-ac", httpOptions).then(response => {
        console.log(response);
        return resolve(response);
      });
    })
  };
}

function getAcStatus(id) {
  return {
    type: GET_AC_STATUS,
    getAcStatus: new Promise(resolve => {
      axios
        .get(apiUrl + "get-ac-by-device-id", {
          headers: {
            "Content-type": "application/form-data",
            mandatory: localStorage.getItem("token")
          },
          params: {
            deviceID: id,
            accessToken: localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response);
          return resolve(response);
        });
    })
  };
}
function setTimer(id, start, end) {
  return {
    type: SET_TIMER,
    setACTime: new Promise(resolve => {
      axios
        .get(apiUrl + "set-timer-ac", {
          headers: {
            "Content-type": "application/form-data",
            mandatory: localStorage.getItem("token")
          },
          params: {
            deviceID: id,
            StringStart: start,
            StringEnd: end,
            accessToken: localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response);
          return resolve(response);
        });
    })
  };
}
export {
  turnOnAc,
  turnOffAc,
  getAc,
  getAcStatus,
  setTimer
  // newTodoFailure,
  // newTodoSuccess
};
