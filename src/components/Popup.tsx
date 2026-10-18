import type { PopupMessage } from "../types/popupMessage";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: PopupMessage;
}

export default function Popup({ isOpen, onClose, message }: PopupProps) {
  // If the popup isn't open, render nothing
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      {/* stops clicking inside the white box from closing it */}
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>
          X
        </button>

        <h2>{message.title}</h2>

        <p>{message.description}</p>
      </div>
    </div>
  );
}
