interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Popup({ isOpen, onClose }: PopupProps) {
  // If the popup isn't open, render nothing
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      {/* stops clicking inside the white box from closing it */}
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
