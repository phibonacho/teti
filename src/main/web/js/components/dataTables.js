import 'datatables.net';
import '../../scss/components/_dataTables.scss';

let defOptions = {
    "info" : false,
    "searching" : false,
    "serverSide": true,
    "ordering": false,
    "paging" : false,
    "lengthChange": false
};

export function initDataTable(selector, opt) {
    return $(selector).DataTable($.extend(defOptions, opt));
}