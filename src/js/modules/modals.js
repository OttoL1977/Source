const modals = () => {

    function bindModal(triggerSelector, modalSelector, closeSelector){
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);

         trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target){
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            };
        });

        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
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
    //showModalByTime('.popup', 60000);
}

export default modals;