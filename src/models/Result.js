export default class Result {
    constructor(success, error = "", data){
        this.success = success;
        this.error = error;
        this.data = data
    }
}