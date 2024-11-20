/**
 * Créer un composant "Carousel" prenant en entrée
 * un tableau de données "data" contenant :
 *  - id
 *  - nom
 *  - imageUrl
 * une props "withArrows" (default: false) permettant d'afficher des fleches gauche/droite
 * une props "withPagination" (default: false) permettant d'afficher des points indiquant la position du carousel
 *
 * Exemple:
 *
 * withArrows = false, withPagination qui vaut false
 *
 * |------------------------|
 * |        _________       |
 * |       /         \      |
 * |       |    _    |      |
 * |       ----| |----      |
 * |  MAISON                |
 * |------------------------|
 *
 * withArrows = true, withPagination qui vaut false
 *    |------------------------|
 *    |        _________       |
 *    |       /         \      |
 *  < |       |    _    |      | >
 *    |       ----| |----      |
 *    |  MAISON                |
 *    |------------------------|
 *
 * withArrows = false, withPagination qui vaut true
 * |------------------------|
 * |        _________       |
 * |       /         \      |
 * |       |    _    |      |
 * |       ----| |----      |
 * |  MAISON                |
 * |------------------------|
 *          .   O   .
 */
