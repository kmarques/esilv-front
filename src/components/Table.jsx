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
