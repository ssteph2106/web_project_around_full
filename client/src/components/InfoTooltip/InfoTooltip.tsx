
import './InfoTooltip.css';

type InfoTooltipProps = {
  message: string;
  isSuccess: boolean;
  onClose: () => void;
};

function InfoTooltip({
  message,
  isSuccess,
  onClose,
}: InfoTooltipProps) {
  return (
    <div className="info-tooltip" onClick={onClose}>
      <div
        className="info-tooltip__container"
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="info-tooltip__close"
          type="button"
          aria-label="Cerrar mensaje"
          onClick={onClose}
        >
          ×
        </button>

        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? 'info-tooltip__icon_success'
              : 'info-tooltip__icon_error'
          }`}
          aria-hidden="true"
        >
          {isSuccess ? '✓' : '×'}
        </div>

        <h2 className="info-tooltip__message">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
