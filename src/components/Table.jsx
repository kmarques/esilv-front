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

import { useState } from "react";

export default function Table({ data }) {
  const columnKeys = data.length ? Object.keys(data[0]) : [""];

  const [hiddenColumns, setHiddenColumns] = useState([]);

  return (
    <table>
      <thead>
        {hiddenColumns.length > 0 && (
          <tr>
            <td colSpan={columnKeys.length}>
              <button onClick={() => setHiddenColumns([])}>Display all</button>
            </td>
          </tr>
        )}
        <tr>
          {columnKeys
            .filter((key) => !hiddenColumns.includes(key) && key !== "")
            .map((key) => (
              <th>
                {key}{" "}
                <button
                  onClick={() =>
                    setHiddenColumns((current) => [...current, key])
                  }
                >
                  -
                </button>
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr>
            {Object.entries(item)
              .filter(([key]) => !hiddenColumns.includes(key))
              .map(([_, value]) => (
                <td>{value}</td>
              ))}
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
  );
}
