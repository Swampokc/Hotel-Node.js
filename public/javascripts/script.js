function IncrementDate(date) {
    var tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + 1);
    return tempDate;
}

function DecrementDate(date) {
    var tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() - 1);
    return tempDate;
}

$(function () {
    $("#dateIn").datetimepicker({
        format: 'YYYY-MM-DD',
        minDate: moment(),
        defaultDate: moment()
    });

    $("#dateOut").datetimepicker({
        format: 'YYYY-MM-DD',
        useCurrent: false,
        defaultDate: IncrementDate(moment()),
        minDate: IncrementDate(moment())
    });

    $("#dateIn").on("dp.change", function (e) {
        $("#dateOut").data("DateTimePicker").minDate(IncrementDate(e.date))
    });

    $("#dateOut").on("dp.change", function (e) {
        $("#dateIn").data("DateTimePicker").maxDate(DecrementDate(e.date))
    });
});