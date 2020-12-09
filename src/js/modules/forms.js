
import checkNumInputs from './checkNumInputs';

const form = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]');

    checkNumInputs('input[name = "user_phone"]');

    const message = {
        loading: "Загрузка",
        success: "Спасибо, мы скоро с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    const hideForm = () => {
        windows.forEach(item => {
            item.style.display = 'none';
            document.body.style.overflow = '';
        });
    };

    function clearState(obj) {
        for (const prop of Object.keys(obj)) {
            delete obj[prop];
        }
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            if(item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(res => {
                    statusMessage.textContent = message.failure;
                })
                .finally(res => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        hideForm();
                    }, 2000);
                    clearState(state);
                });
        });
    });

};

export default form;