export class Field {
    _name : string;
    _value : () => any;
    _required : boolean;
    _type : FieldType;
    _selector : JQuery;
    _validate : (value : any) => boolean;

    constructor(selector : JQuery, validate : (v : any) => boolean) {
        this._selector = selector;
        this._validate = validate;
        this._name = this._selector.attr('name');
        this._type = FieldType[this._selector.attr('type')];
        this._value = () => this._selector.val();
        this._required = !!this._selector.attr('required');
    }

    name() {
        return this._name.split('.')[0];
    }

    fullNamePath() {
        return this._name;
    }

    value() {
        if(this._name.includes('.'))
            return this._name
                .split('.')
                .slice(1)
                .reverse()
                .reduce(this.reducer, this._value());
        return this._value();
    }

    setValue(val) {
        this._selector.val(val);
    }

    required() {
        return this._required;
    }

    validate() {
        return !this._required || this._validate(this._value());
    }

    protected reducer(acc, curr) {
        let tmp = {};
        tmp[curr] = acc;
        return tmp;
    }

    type() {
        return this._type;
    }

    selector() {
        return this._selector;
    }

    clear() {
        this._selector.val(null);
    }
}

enum FieldType {
    text = 'text',
    number = 'number',
    tel = 'tel',
    option = 'option',
    select = 'select',
    textarea = 'textarea',
    checkbox = 'checkbox',
    radio = 'radio',
}