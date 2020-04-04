import {Form} from "./utilities/Form";

export function init_form($selector) {
    console.log("initializing form: ");
    console.log($selector.attr('id'));

    $selector.on('submit', function (e) {
        e.preventDefault();
        let form = new Form($selector);
        form.submit();
    });
}