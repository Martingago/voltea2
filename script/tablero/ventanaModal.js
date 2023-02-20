export { abrirModal, cerrarModal}

const abrirModal = () => {
    let modal = document.querySelector(".modal-reset-lvl");
    document.querySelector(".modal-reset-lvl").style.display = 'grid';
    window.onclick = (e) => {
        if(e.target == modal){
            cerrarModal();
        }
    }
}

const cerrarModal = () => {
    document.querySelector(".modal-reset-lvl").style.display = 'none';
}

document.querySelector(".btn-close-modal").addEventListener("click",
    () => {
        cerrarModal();
    }
)

document.querySelector(".btn-cancel-reset-lvl").addEventListener("click",
    () => {
        cerrarModal();
    }
)
