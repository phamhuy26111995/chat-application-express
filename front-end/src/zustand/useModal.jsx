import { create } from "zustand";

const useModal = create((set) => ({
	isOpenModal: false,
	setIsOpenModal: (isOpenModal) => set({ isOpenModal }),
    modalContent : {
        title : "",
        content : <></>
    },
    setModalContent : (modalContent) => set({ modalContent }),
}));


export default useModal;