import { XCircle } from "lucide-react";
import { Portal } from "react-portal";

interface ModalProps {
  title: string | undefined;
  content: React.ReactNode;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ title, content, toggleModal }) => {
  return (
    <Portal>
      <div
        onClick={() => toggleModal((prev) => !prev)}
        className="inset-0 fixed bg-[#00000090] backdrop-blur-sm z-[9999]"
      />
      <div className="inset-0 fixed m-auto max-w-[800px] h-fit p-8 rounded-2xl bg-menus-background drop-shadow-2xl z-[9999]">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <button
            className="text-menus-foreground-muted"
            onClick={() => toggleModal((prev) => !prev)}
          >
            <XCircle className="w-8 h-8" />
          </button>
        </div>
        {content}
      </div>
    </Portal>
  );
};

export default Modal;
