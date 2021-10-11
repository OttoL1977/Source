import checkNumInputs from "./checkNumInputs";
import clearState from "./clearState";

const forms = (state) => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');


    checkNumInputs('input[name="user_phone"]');
  
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
            if(item.getAttribute('data-calc') == 'end'){
                for(let key in state){
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        document.querySelector('.popup_calc_end').style.display = 'none';
                        document.querySelector('.popup_engineer').style.display = 'none';
                        document.body.style.marginRight = '0px';
                        document.body.style.overflow = '';
                        clearState(state);
                    }, 4000);
                })
        })
    })
}

export default forms;