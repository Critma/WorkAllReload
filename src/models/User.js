export default class User {
    constructor(id, name, phone, email, resume_id = null, status_id = null, createdAt = null, updatedAt = null, INN = null) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.resumeId = resume_id;
        this.statusId = status_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.INN = INN;
    }

    updateStatus(newStatusId = null) {
        this.newStatusId = newStatusId;
    }
}