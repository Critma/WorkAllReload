export default class Vacancy {
    constructor(id, name, salary, email, phoneNumber, location, experience_id, aboutWork, visible, employer_id) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.location = location;
        this.experience_id = experience_id;
        this.aboutWork = aboutWork;
        this.visible = visible;
        this.employer_id = employer_id;

        this.url = `/${id}`
    }

    updateUrl(newUrl) {
        this.url = newUrl;
    }
}