const m = require("mithril");

const DatePicker = require("./datepicker/datepicker");

const UI = {
    view: vnode => m("div", m( DatePicker ) )
}

m.route.prefix("");
m.route( document.body, "/", {
  "/": UI
});