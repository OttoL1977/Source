import { post } from "jquery";

const forms = () => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const inputsPhone = document.querySelectorAll('input[name="user_phone"]');

    inputsPhone.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        })
    })

    

    function clearInputs(){
        inputs.forEach(item => {
            item.value = '';
        });
    }

    const message = {
        loading: 'Загрузка...',
        failure: 'Что-то пошло не так',
        success: 'Спасибо! Мы скоро с вами свяжемся'
    }

    const postData = async(url, data) => {
        document.querySelector('.status').textContent = message.loading;

        let res = await fetch(url, {
            method: 'POST',
            body: data
        })

        return await res.text();
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 4000);
                })
        })
    })
}

export default forms;