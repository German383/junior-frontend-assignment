document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;
    let inputs = this.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        if (!input.checkValidity()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ccc';
        }
    });

    if (!isValid) {
        document.getElementById('response').innerHTML = 'Пожалуйста, заполните все поля корректно.';
        return;
    }

    let formData = new FormData(this);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://httpbin.org/post', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                document.getElementById('response').innerHTML = 'Форма успешно отправлена!';
                document.getElementById('registrationForm').reset();
            } else {
                document.getElementById('response').innerHTML = 'Произошла ошибка. Пожалуйста, попробуйте снова.';
            }
        }
    };

    let object = {};
    formData.forEach((value, key) => object[key] = value);
    xhr.send(JSON.stringify(object));
});
