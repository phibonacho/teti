/*
* const emptyContract = {
    billingMonth : null,
    closingMonths : [],
    billingAmount : null,
    toBill : false,
    notes : '',
};*/

class ClosingMonth {
    _closingMonth : number;

    constructor(cm : number) {
        this._closingMonth = cm;
    }

    getClosingMonth() {
        return this._closingMonth;
    }

    setClosingMonth(value : number) {
        this._closingMonth = value;
    }
}

export class Contract {
    _billingMonth : number;
    _closingMonths : Array<ClosingMonth>;
    _billingAmount : number;
    _toBill : boolean;
    _note : string;

    constructor(serviceName : string, billingMonth : number) {
        this._note = serviceName;
        this._billingMonth = billingMonth;
    }

    getBillingMonth() {
        return this._billingMonth;
    }


    getClosingMonths(): Array<ClosingMonth> {
        return this._closingMonths;
    }

    getBillingAmount(): number {
        return this._billingAmount;
    }

    setBillingAmount(value: number) {
        this._billingAmount = value;
    }

    setClosingMonths(value: Array<ClosingMonth>) {
        this._closingMonths = value;
    }


    getToBill(): boolean {
        return this._toBill;
    }

    setToBill(value: boolean) {
        this._toBill = value;
    }

    getNote() {
        return this._note;
    }


    setNote(value : string) {
        this._note = value;
    }
}