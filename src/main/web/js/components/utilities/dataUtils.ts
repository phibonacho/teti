import {Vue} from "vue/types/vue";
import axios, {AxiosResponse} from "axios";

export function reload(event : Event, root : Vue, target : string) {
    if(event !== undefined)
        event.preventDefault();
    root.$emit('bv::refresh::table', target);
}

export function save(event : Event, root : Vue, request : string, payload : any, targetTable : string, onSuccess? : (response : AxiosResponse) => any, onFail? : (response : AxiosResponse) => any, always? : () => any){
    event.preventDefault();
    let promise = axios.post(request, payload);

    promise.then(response => {
        root.$emit('bv::refresh::table', targetTable);
        if(onSuccess)
            onSuccess(response);
    }).catch(response => {
        console.log(response);
        if(onFail)
            onFail(response);
    }).then(() => {
        if(always)
            always();
    });
}

export function edit(event : Event, root : Vue, request : string, payload : any, targetTable : string, targetModal = "none") {
    event.preventDefault();

    let promise = axios.put(request, payload);

    promise.then(response => {
        // clean form...
        root.$emit('bv::refresh::table', targetTable);
        if(targetModal !== "none")
            root.$emit('bv::hide::modal', targetModal);
    }).catch(response => {
        console.log(response);
    });
}

export function remove(event : Event, root : Vue, request : string, targetTable : string, targetModal? : string) {
    event.preventDefault();
    let promise = axios.delete(request);

    promise.then(response =>{
        root.$emit('bv::refresh::table', targetTable);
        if(targetModal)
            root.$emit('bv::hide::modal', targetModal);
    }).catch(error=> {
        console.log(error);
    }).then(()=>{
    });
}

export function provider(request : string, filter : object, rows : number, onDone? : () => void) {
    return axios
        .post(request, filter)
        .then(response => {
            if(onDone)
                onDone();
            rows = response.data.recordsTotal;
            return response.data.data;
        }).catch(error => {
            if(onDone)
                onDone();
            console.log(error);
        });
}

export function baseData(url : string, emptyObject : Object, opt = {}) {
    // todo remove assign and use deepCopy function
    return Object.assign({
        url : url,
        save : deepCopy(emptyObject),
        search : deepCopy(emptyObject),
        edit : deepCopy(emptyObject),
        remove : undefined,
        page : 1,
        rows : 0,
        size : 10
    }, opt);
}

export const service_data = {
    save : {},
    search : {},
    edit : {},
    remove : undefined,
    page : 1,
    rows : 0,
    size : 10
};

export const memo_data = {
    save : {},
    search : {},
    edit : {},
    remove : undefined,
    page : 1,
    rows : 0,
    size : 10
}

export function deepCopy(that) {
    return JSON.parse(JSON.stringify(that));
}