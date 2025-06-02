export default class User {
    constructor(id, name, phone, email, resume_id = null, status_id = null) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.resume_id = resume_id;
        this.status_id = status_id;
    }

    updateStatus(newStatusId = null){
        this.newStatusId = newStatusId;
    }
}