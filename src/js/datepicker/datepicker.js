const m = require("mithril");
const stream = require("mithril/stream")

function datePickerModel( options ) {

    options.currentDate = options.currentDate || new Date()
    options.daysInMonth = daysInMonth( options.currentDate.getFullYear(), options.currentDate.getMonth() )
    options.monthDays = monthDays( options.currentDate.getFullYear(), options.currentDate.getMonth() )

    return options
}

function monthDays( year, month ) {
    var startDay = 2
    var daysInMonths = daysInMonth( year, month )
    var stopDay = daysInMonths + 1
    var firstDayInMonth = new Date( year, month, startDay )
    var lastDayInMonth = new Date( year, month, stopDay )
    //console.log(year)
    //console.log(month)
    console.log(daysInMonths)
    console.log(firstDayInMonth)
    console.log(lastDayInMonth)
    console.log(lastDayInMonth.getDay())
    startDay = startDay - firstDayInMonth.getDay() - 1
    stopDay = stopDay + lastDayInMonth.getDay() - 1
}

function daysInMonth( year, month ) {
    return new Date( year, month + 1, 0 ).getDate()
}

var DatePicker = {
    oninit: vnode => vnode.state.model = datePickerModel( {} ),
    view: vnode => {
        let model = vnode.state.model
        return m(
            "div.datepicker",
            m( "div", model.currentDate.toDateString() ),
            m( "div", model.currentDate.getMonth() ),
            m( "div", new Date( 2018, 0, 1 ).toDateString() ),
            m( "div", new Date( 2018, 0, 31 ).toDateString() ),
            m( "div", new Date( 2018, 1, 0 ).getDate() ),
            m( "div", new Date( 2018, 0, 32 ).toDateString() ),
            m( "div", model.daysInMonth )
        )
    }
}

module.exports = DatePicker

