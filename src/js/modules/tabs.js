const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector);
    const tabs = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    function showContent(i = 0){
        content[i].style.display = display;
        tabs[i].classList.add(activeClass);
    };

    function hiddenContent(){
        content.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    };

    hiddenContent();
    showContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        if(target && 
            (target.classList.contains(tabSelector.replace(/\./, "")) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))){
            tabs.forEach((item, i) => {
                if(target == item || target.parentNode == item){
                    hiddenContent();
                    showContent(i);
                }
            });
        }
    });
}

export default tabs;
