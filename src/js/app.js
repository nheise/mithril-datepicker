const m = require("mithril");

const DatePicker = require("./datepicker/datepicker");

const UI = {
    view: vnode => m("div", m( DatePicker ), m( "br" ), m( DatePicker, { currentDate: new Date( 2018, 5, 5 ) } ) )
}

m.route.prefix("");
m.route( document.body, "/", {
  "/": UI
});