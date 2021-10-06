import clearState from "./clearState";

const modals = (state) => {

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true){
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]');

       

         trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(((state.form && state.height && state.width && triggerSelector == '.popup_calc_button') 
                    || triggerSelector == '.popup_calc_btn') 
                    || (state.type && state.profile)){
                    if(e.target){
                        e.preventDefault();
                    }
                    windows.forEach(item => {
                        item.style.display ='none';
                    });
    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } else {
                    if(state.width == undefined){
                        document.querySelector('#width').classList.add('form_status_border');
                    }
                    if(state.height == undefined){
                        document.querySelector('#height').classList.add('form_status_border');
                    }
                    if(state.form == undefined){
                        document.querySelector('.balcon_icons').classList.add('form_status_border');
                    }
                    if(state.type == undefined){
                        document.querySelector('#view_type').classList.add('form_status_border');
                    }
                    if(state.profile == undefined){
                        document.querySelectorAll('.label').forEach(item => {
                            item.classList.add('form_status_border');
                        });
                        
                    }
                    if(item.parentNode.lastChild.classList == 'form_status'){
                        if(state.width !== undefined){
                            document.querySelector('#width').classList.remove('form_status_border');
                        }
                        if(state.height !== undefined){
                            document.querySelector('#height').classList.remove('form_status_border');
                        }
                        if(state.form !== undefined){
                            document.querySelector('.balcon_icons').classList.remove('form_status_border');
                        }
                        if(state.type != undefined){
                            document.querySelector('#view_type').classList.remove('form_status_border');
                        }
                        if(state.profile !== undefined){
                            document.querySelectorAll('.label').forEach(item => {
                                item.classList.remove('form_status_border');
                            });
                        }
                    } else {
                        let statusMessage = document.createElement('div');
                        statusMessage.classList.add('form_status');
                        item.parentNode.appendChild(statusMessage);
                        statusMessage.textContent = 'Пожайлуста, введите все данные';
                    }
                }
            });
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display ='none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = '';
                console.log(state.length);
            };
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display ='none';
            });
            modal.style.display = 'none';
            document.body.style.overflow = '';
            clearState(state);
        });
    }

    function showModalByTime(modalSelector, time){
        setTimeout(() => {
            document.querySelector(modalSelector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    //showModalByTime('.popup', 60000);
}

export default modals;