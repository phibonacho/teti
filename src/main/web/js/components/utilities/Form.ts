import {Field} from "./Field";

export class Form {
    _fields : Field[];
    _selector : JQuery;
    _url : string;
    _prefix : string;

    constructor(selector : JQuery) {
        this._selector = selector;
        this._prefix = this._selector.data('prefix');
        this._url = this._selector.attr('action');
        this._fields = this._selector
            .find(':input:not(:button)')
            .map((i, elem) => new Field($(elem), (a) => true)).toArray();
    }

    url() {
        return this._url;
    }

    setUrl(url) {
        this._url = url;
        this._selector.attr('action', url);
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
        return $.ajax({
            url : this._url,
            data : JSON.stringify(this.toObject()),
            method : this.method(),
            contentType : 'application/json'
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
            field.clear();
        });
    }
}