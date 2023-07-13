import { useRef } from "react";
import { useClickAway } from "react-use";

interface ContextMenuProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
  children: React.ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  closeContextMenu,
  children,
}) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    closeContextMenu();
  });

  return (
    <div
      ref={ref}
      className="absolute bg-context-menu backdrop-blur-lg shadow-md p-4 rounded-md"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {children}
    </div>
  );
};

export default ContextMenu;
