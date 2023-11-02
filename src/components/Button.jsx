export default function MultiButton({ genX = 1, ...props }) {
  //const buttons = [];
  //
  //for (let i = 0; i < genX; i++) {
  //  buttons.push(<ButtonBase {...props} />);
  //}
  //
  //return buttons;
  // <=>
  return Array.from({length: genX}, () => <ButtonBase {...props} />);
}

export function ButtonBase({
  variant = "rounded",
  title,
  onClick,
  children,
  component: Component = "button",
  style = {},
}) {
  const computedStyle = {
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    ...style
  };

  title = children ?? title;

  switch (variant) {
    case "square":
      computedStyle.borderRadius = "0px";
      break;
    case "round":
      computedStyle.borderRadius = "50%";
      computedStyle.width = "60px";
      computedStyle.height = "60px";
      title = title.slice(0, 1);
      break;
    case "rounded":
      computedStyle.borderRadius = "10px";
      break;
  }

  return (
    <Component style={computedStyle} onClick={onClick}>
      {title}
    </Component>
  );
}
