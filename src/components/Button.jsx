export default function MultiButton({ genX = 1, ...props }) {
  const buttons = [];

  for (let i = 0; i < genX; i++) {
    buttons.push(
      <ButtonBase {...props} />
    );
  }

  return buttons;
}

export function ButtonBase({ variant = "rounded", title, onClick }) {
  const style = {
    backgroundColor: "green",
  };

  switch (variant) {
    case "square":
      style.borderRadius = "0px";
      break;
    case "round":
      style.borderRadius = "50%";
      style.width = "60px";
      style.height = "60px";
      title = title.slice(0, 1);
      break;
    case "rounded":
      style.borderRadius = "10px";
      break;
  }

  return (
    <button style={style} onClick={onClick}>
      {title}
    </button>
  );
}
