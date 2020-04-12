import 'datatables.net';
import '../../scss/components/_dataTables.scss';

let defOptions = {
    "info" : false,
    "searching" : false,
    "serverSide": true,
    "ordering": false,
    "pageLength": 10,
    "pagingType": "simple_numbers",
    "lengthChange": false
};

export function initDataTable(selector, opt) {
    return $(selector).DataTable($.extend(defOptions, opt));
}