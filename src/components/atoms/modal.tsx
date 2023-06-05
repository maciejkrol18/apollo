import { Portal } from "react-portal"

interface ModalProps {
    title: string | undefined;
    content: React.ReactNode;
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({title, content, toggleModal}) => {
    return (
        <Portal>
            <div
                onClick={() => toggleModal(prev => !prev)}
                className="inset-0 fixed bg-[#00000090] backdrop-blur-sm z-10"
            >
            <div className="inset-0 fixed mx-auto w-32 h-32 z-20">
                <div className="w-96 h-fit bg-red-700">
                    <h1>Lorem ipsum dolor sit amet.</h1>
                </div>
            </div>
            </div>
        </Portal>
    )
}

// <button onClick={() => toggleModal(prev => !prev)}>Close</button>

export default Modal