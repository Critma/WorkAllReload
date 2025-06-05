export default class Vacancy {
    constructor(id, name, salary, email, phoneNumber, location, experience_id, aboutWork, visible, employer_id, created_at, updated_at, experience = null, employerName = null) {
        this.id = id;
        this.employer_id = employer_id;
        this.name = name;
        this.salary = salary;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.location = location;
        this.experience_id = experience_id;
        this.aboutWork = aboutWork;
        this.visible = visible;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.experience = experience;
        this.employerName = employerName

        this.url = `/${id}`
    }

    updateUrl(newUrl) {
        this.url = newUrl;
    }
}