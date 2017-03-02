$(document).ready(function () {

    var userName = document.getElementsByClassName("alignment-marker text")[0].innerHTML;
    var closedColumn = $(document).find('span:contains("' + userName + '").witTitle').parents(".taskboard-content-row").find("[axis='taskboard-table-body_s3']");
    checkForItemsWithRemainingHours(closedColumn);


    var observer = new MutationObserver(function (mutations) {
        console.log("TFS alerts: task moved to closed");
        checkForItemsWithRemainingHours(closedColumn);
    });

    var config = { childList: true };
    observer.observe(closedColumn[0], config);
});

function checkForItemsWithRemainingHours(tfsClosedColumn) {
    var withRemainingWork = tfsClosedColumn.find('.witRemainingWork')
    var alertSent = false;
    for (i = 0; i < withRemainingWork.length; i++) {
        var value = parseInt($(withRemainingWork[i]).children()[0].innerHTML);
        if (value > 0 && !alertSent) {
            alert("Apparently you have an item which's is closed but the remaining hours are not zero. Please zero it down. ");
            alertSent = true;
        }
    }
    alertSent = false;
}