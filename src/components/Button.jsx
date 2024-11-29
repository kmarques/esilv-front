import useTheme from "../hooks/useTheme";

export default function Button({
  title = "Click on my big big button",
  onClick,
  customStyle = {},
  backgroundColor,
  color,
  variant = "default",
  component: Component = "button",
  children,
  ...others
}) {
  const themeButton = useTheme("button");
  const style = {
    backgroundColor: backgroundColor ?? themeButton.backgroundColor,
    color: color ?? themeButton.color,
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  let computedTitle = children ?? title;

  switch (variant) {
    case "squared":
      style.borderRadius = "0";
      break;
    case "round":
      style.width = 50;
      style.height = 50;
      style.borderRadius = "50%";
      style.text;
      if (typeof computedTitle === "string") {
        computedTitle = computedTitle.slice(0, 1);
      }
      break;
    case "text":
      style.backgroundColor = "transparent";
      style.borderRadius = 0;
      style.padding = 0;
      style.textDecoration = "none";
  }

  Object.assign(style, customStyle);

  if (Component === "img") computedTitle = undefined;

  return (
    <Component style={style} onClick={onClick} {...others}>
      {computedTitle}
    </Component>
  );
}
