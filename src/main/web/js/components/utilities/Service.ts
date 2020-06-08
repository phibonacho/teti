export class Service {
    _serviceName : string;
    _serviceDeadline : number;

    constructor(serviceName : string, serviceDeadline : number) {
        this._serviceName = serviceName;
        this._serviceDeadline = serviceDeadline;
    }

    getServiceName() {
        return this._serviceName;
    }

    getServiceDeadline() {
        return this._serviceDeadline;
    }
}