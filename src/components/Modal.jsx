import Button from "./Button";

export default function Modal({
  open = false,
  title,
  children,
  actions,
  onClose,
  theme,
}) {
  return (
    open && (
      <div>
        <div className="modal">
          <div className="modal-title">
            <h1>{title}</h1>
            <Button
              theme={theme}
              onClick={onClose}
              backgroundColor="transparent"
              variant="round"
            >
              X
            </Button>
          </div>
          <div className="modal-content">{children}</div>
          <div className="modal-actions">{actions}</div>
        </div>
      </div>
    )
  );
}
