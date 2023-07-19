let modalContainer = document.getElementsByClassName('event-modal')[0];
let openModalButton = document.getElementsByClassName('btn-event')[0];
let todayButton = document.getElementsByClassName('btn-date')[0];
 
openModalButton.addEventListener('click', event => {
    modalContainer.style.display = "flex";
    event.stopPropagation();
})


const closeModal = () => {
    modalContainer.style.display = "none";
}

document.addEventListener('click', (event) => {
    if (!modalContainer.contains(event.target) && event.target !== modalContainer) {
        modalContainer.style.display = "none";
    }
})

todayButton.addEventListener('click', (event) => {
    event.stopPropagation();
})

