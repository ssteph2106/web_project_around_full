type PopupProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  isImage?: boolean;
};

function Popup({ title, children, onClose, isOpen, isImage }: PopupProps) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className={`popup__content ${
    isImage ? 'popup__content_content_image' : ''
  }`} >
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

       {title && <h3 className="popup__title">{title}</h3> }

        {children}
      </div>
    </div>
  );
}

export default Popup;