interface ImagePopupProps {
    image: string;
    caption: string
}

function ImagePopup({ image, caption }: ImagePopupProps) {
  return (
    <>
      <img
        className="popup__image"
        src={image}
        alt={caption}
      />
      <p className="popup__caption">{caption}</p>
    </>
  );
}

export default ImagePopup;