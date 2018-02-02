const m = require("mithril");
const stream = require("mithril/stream")

function datePickerModel( options ) {

    options.currentDate = options.currentDate || new Date()
    options.daysInMonth = daysInMonth( options.currentDate.getFullYear(), options.currentDate.getMonth() )

    options.month = monthArray( options.currentDate.getFullYear(), options.currentDate.getMonth(), options.daysInMonth )

    return options
}

function daysInMonth( year, month ) {
    return new Date( year, month + 1, 0 ).getDate()
}

function monthArray( year, month, daysInMonth ) {
    let days = []
    for(var i=1; i < daysInMonth + 1; i++) {
        days.push( new Date( year, month, i ) )
    }
    let preDays = []
    for(var i = days[0].getDay() - 1; i > -1; i--) {
        preDays.push( new Date( year, month, 0-i ) )
    }
    let postDays = []
    for(var i = daysInMonth + 1, j = days[days.length-1].getDay(); j < 6 ; i++,j++) {
        postDays.push( new Date( year, month, i ) )
    }
    return preDays.concat( days, postDays )
}

var DatePicker = {
    oninit: vnode => vnode.state.model = datePickerModel( vnode.attrs ),
    view: vnode => {
        let model = vnode.state.model
        return m(
            "div.datepicker", model.month.map( day => m( "div", day.toDateString(), " ", day.getDay() ) ),
            /*m( "div", model.currentDate.toDateString() ),
            m( "div", model.currentDate.getMonth() ),
            m( "div", new Date( 2018, 0, 1 ).toDateString() ),
            m( "div", new Date( 2018, 0, 1 ).getDay() ),
            m( "div", new Date( 2018, 0, 31 ).toDateString() ),
            m( "div", new Date( 2018, 0, 31 ).getDay() ),
            m( "div", new Date( 2018, 1, 0 ).getDate() ),
            m( "div", new Date( 2018, 1, 0 ).toDateString() ),
            m( "div", new Date( 2018, 0, 32 ).toDateString() ),
            m( "div", new Date( 2018, 0, -1 ).toDateString() ),
            m( "div", model.daysInMonth )*/
        )
    }
}

module.exports = DatePicker

