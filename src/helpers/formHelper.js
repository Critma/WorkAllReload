import Result from "@/models/Result";

function isFormValid(form) {
    if (!form.Email.trim() || !form.Password.trim()) {
        return new Result(false, 'Пожалуйста, заполните все обязательные поля.', null);
    }
    // Basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.Email)) {
        return new Result(false, 'Введите корректный email.', null);
    }

    return new Result(true, null, null);
}

export { isFormValid };