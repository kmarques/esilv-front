export default function ThemeConfigurator({ initialValues, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = {
      h1: {
        backgroundColor: formData.get("h1BackgroundColor"),
        color: formData.get("h1Color"),
      },
      button: {
        backgroundColor: formData.get("buttonBackgroundColor"),
        color: formData.get("buttonColor"),
      },
    };

    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>H1</p>
      <label htmlFor="h1BackgroundColor">H1 Background Color</label>
      <input
        defaultValue={initialValues.h1.backgroundColor}
        id="h1BackgroundColor"
        type="color"
        name="h1BackgroundColor"
      />
      <label htmlFor="h1Color">H1 Color</label>
      <input
        defaultValue={initialValues.h1.color}
        type="color"
        name="h1Color"
        id="h1Color"
      />
      <p>Button</p>
      <label htmlFor="buttonBackgroundColor">BUTTON Background Color</label>
      <input
        id="buttonBackgroundColor"
        defaultValue={initialValues.button.backgroundColor}
        type="color"
        name="buttonBackgroundColor"
      />
      <label htmlFor="buttonColor">BUTTON Color</label>
      <input
        defaultValue={initialValues.button.color}
        type="color"
        name="buttonColor"
        id="buttonColor"
      />
      <input type="date"/>
      <input type="time"/>
      <input type="submit" value="Change" />
    </form>
  );
}
