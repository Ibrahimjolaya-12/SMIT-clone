import { message } from "antd"

window.tostify=(msg,type)=>  message[type](msg)


window.isValidEmail= email => /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)