/**
 * Créer un composant "Table" prenant en entrée un tableau de données "data"
 *
 * Ce tableau doit :
 * - Afficher une ligne d'en-tête correspondant au clé des items de data
 * - Afficher une ligne pour chaque item
 * - Afficher le nombre d'éléments en footer de tableau
 * - Avoir un bouton dans chaque en-tête pour masquer une colonne
 * - Avoir un bouton "display all" avant le tableau pour annuler tous les masquages. Bouton affiché que si un masquage est fait.
 * Exemple:
 *
 * [{id: 2, name: "Toto", role: "Admin"}]
 *
 * |------------------------|
 * | id - | name - | role - |
 * |------------------------|
 * | 2    | Toto   | Admin  |
 * |------------------------|
 * |                 1 item |
 * |------------------------|
 *
 * En cliquant sur "-" de "name", on obtient:
 *   | Display all |
 * |---------------|
 * | id - | role - |
 * |---------------|
 * | 2    | Admin  |
 * |---------------|
 * |        1 item |
 * |---------------|
 */
import Button from "../components/Button";
import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function Table({ getData, onDelete, onEdit, onAdd, theme }) {
  const data = getData();
  console.log(data);
  const columnKeys = data.length ? Object.keys(data[0]) : [""];
  console.log(columnKeys);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isEditing) setFormData(undefined);
    else {
      setFormData(
        Object.entries(isEditing)
          .filter(([key]) => key !== "id")
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {})
      );
    }
  }, [isEditing]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dataToSend = Object.fromEntries(formData.entries());
    onAdd(dataToSend).then(() => {
      event.target.reset();
      setIsModalOpen(false);
    });
  }

  return (
    <>
      {onAdd && data.length > 0 && (
        <>
          <Button theme={theme} onClick={() => setIsModalOpen(true)}>
            + Create
          </Button>
          <Modal
            theme={theme}
            title="Ajouter un nouvel item"
            onClose={() => setIsModalOpen(false)}
            open={isModalOpen}
          >
            <form onSubmit={handleSubmit}>
              {Object.keys(data[0])
                .filter((key) => key !== "id")
                .map((key) => (
                  <input key={key} name={key} placeholder={key} />
                ))}
              <Button theme={theme} type="submit">
                Enregistrer
              </Button>
            </form>
          </Modal>
        </>
      )}
      <table>
        <thead>
          {hiddenColumns.length > 0 && (
            <tr>
              <td colSpan={columnKeys.length}>
                <Button theme={theme} onClick={() => setHiddenColumns([])}>
                  Display all
                </Button>
              </td>
            </tr>
          )}
          <tr>
            {columnKeys
              .filter((key) => !hiddenColumns.includes(key) && key !== "")
              .map((key) => (
                <th key={key}>
                  {key}{" "}
                  <Button
                    variant="text"
                    theme={theme}
                    onClick={() =>
                      setHiddenColumns((current) => [...current, key])
                    }
                  >
                    -
                  </Button>
                </th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={`${item.source}-${item.id}`}>
              {Object.entries(item)
                .filter(([key]) => !hiddenColumns.includes(key))
                .map(([key, value]) => (
                  <td key={key}>
                    {isEditing?.id === item.id &&
                    key !== "id" &&
                    formData?.[key] ? (
                      <input
                        name={key}
                        value={formData[key]}
                        onChange={(e) =>
                          setFormData((formData) => ({
                            ...formData,
                            [key]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                ))}
              <td>
                {onEdit && isEditing?.id === item.id && (
                  <Button
                    theme={theme}
                    backgroundColor="green"
                    color="white"
                    onClick={() =>
                      onEdit(isEditing, formData).then(() => setIsEditing(null))
                    }
                  >
                    Save
                  </Button>
                )}
                {onEdit && isEditing?.id !== item.id && (
                  <Button theme={theme} onClick={() => setIsEditing(item)}>
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    theme={theme}
                    backgroundColor="red"
                    color="white "
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columnKeys.length}>
              {data.length} item{data.length > 1 && "s"}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
