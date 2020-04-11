import {Field} from "./Field";

export class Form {
    _prefix : string;
    _fields : Field[];
    _selector : JQuery;
    _url : string;
    urlFormatter : (url : string) => string = (u) => u;
    _clearOnSubmit : boolean = false;
    _success : (response : JQueryXHR) => any = () => {};
    _fail : (response : JQueryXHR) => any = () => {};

    constructor(selector : JQuery, option : Object = {}) {
        this._selector = selector;
        this._prefix = this._selector.data('prefix');
        this._url = this._selector.attr('action');
        this._fields = this._selector
            .find(':input:not(:button)')
            .map((i, elem) => new Field($(elem), (a) => true)).toArray();

        // optionals:
        if(option.hasOwnProperty('url'))
            this.urlFormatter = option['url'];

        if(option.hasOwnProperty('clearOnSubmitSuccess'))
            this._clearOnSubmit = option['clearOnSubmitSuccess'];

        if(option.hasOwnProperty('onSuccess'))
            this._success = option['onSuccess'];

        if(option.hasOwnProperty('onFail'))
            this._fail = option['onFail'];
    }

    setUrl(url : (u : string) => string) {
        this.urlFormatter = url;
    }

    protected method() {
        if(this.hasField('_method'))
            return this.fieldByPath('_method').value();
        return this._selector.attr('method');
    }

    fieldByPath(name) {
        return this._fields.find(field => field.fullNamePath() === name);
    }

    hasField(name) {
        return this._fields.find(field => field.name() === name) !== undefined;
    }


    submit() {
        console.log('submitting using method: ' + this.method());
        console.log('to url: ' + this.urlFormatter(this._url));
        return $.ajax({
            url : this.urlFormatter(this._url),
            data : JSON.stringify(this.toObject()),
            method : this.method(),
            contentType : 'application/json'
        }).done(response => {
            if(this._clearOnSubmit)
                this.clear();
            this._success.apply(response);
        }).fail(response => {
            this._fail.apply(response)
        });
    }

    validate() {
        return this._fields
            .map(field => {
                let valid = field.validate();
                if(!valid)
                   field.selector().addClass('is-invalid');
                return valid;
            })
            .reduce((acc, curr) => acc && curr, true);
    }

    toObject() {
        let result = {};
        this._fields.forEach(field => {
            if(!result.hasOwnProperty(field.name()))
                result[field.name()] = field.value();
            else
                result[field.name()] = $.extend(result[field.name()], field.value());
        });

        return result;
    }

    clear() {
        this._fields.forEach(field => {
            if(field.fullNamePath() !== '_method')
                field.clear();
        });
    }
}