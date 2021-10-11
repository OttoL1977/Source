import calcScroll from "./calcScroll";

const images = () => {
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImage = document.createElement('img');

        imgPopup.classList.add('popup_img');
        workSection.appendChild(imgPopup);

        imgPopup.style.justifyContent = 'center';
        imgPopup.style.alignItems = 'center';
        imgPopup.style.display = 'none';


        imgPopup.appendChild(bigImage);

        workSection.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;

            if(target && target.classList.contains('preview')){
                imgPopup.style.display = 'flex';
                const path = target.parentNode.getAttribute('href');
                bigImage.setAttribute('src', path);

                let scrollWidth = calcScroll();

                document.body.style.marginRight = `${scrollWidth}px`;
                document.body.style.overflow = 'hidden';
            }

            if(target && target.matches('div.popup_img')){
                imgPopup.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        })
}

export default images;