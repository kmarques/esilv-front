import { useEffect, useState } from "react";

/**
 * Créer un composant "Carousel" prenant en entrée
 * un tableau de données "data" contenant :
 *  - id
 *  - nom
 *  - imageUrl
 * une props "withArrows" (default: false) permettant d'afficher des fleches gauche/droite
 * une props "withPagination" (default: false) permettant d'afficher des points indiquant la position du carousel
 * une props "prefetch" (default: 0) permettant de précharger les images des items à gauche et à droite du carousel
 * une props "withKeyboardShortcuts" (default: false) permettant de switcher les images avec les flèches Gauche/Droite
 *    Bonus: withKeyboardShortcuts peut prendre en valeur un booléen ou un objet contenant les clés "left", "right" associé à un keyCode (default: {left: "ArrowLeft", right: "ArrowRight"})
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
export default function Carousel({
  data,
  withArrows = false,
  withPagination = false,
  prefetch = 0,
  autoPlay = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  //useEffect(() => {
  //  console.log("After Update", currentIndex);
  //  return () => {
  //    console.log("Before update", currentIndex);
  //  };
  //}, [currentIndex]);
  //
  //useEffect(() => {
  //  console.log("After mount");
  //  return () => {
  //    console.log("Before Unmount");
  //  };
  //}, []);

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(nextImage, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [autoPlay]);

  function nextImage() {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  }
  function prevImage() {
    if (currentIndex !== 0) setCurrentIndex((prevIndex) => prevIndex - 1);
  }

  const startIndex = currentIndex - prefetch;

  const portion = Array.from({ length: prefetch * 2 + 1 }, (_, index) => {
    const realIndex = startIndex + index;
    if (realIndex < 0 || realIndex >= data.length) {
      return null;
    }
    return data[realIndex];
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {withArrows && currentIndex > 0 && (
          <span onClick={prevImage}>&lsaquo;</span>
        )}
        {portion.map(
          (image, index) =>
            image && (
              <div
                key={image.id}
                style={{
                  display:
                    data.length === 1 ||
                    index === Math.floor(portion.length / 2)
                      ? "block"
                      : "none",
                }}
              >
                <img src={image.imageUrl} alt={image.name} />
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    backgroundColor: "black",
                    color: "white",
                    opacity: 0.3,
                  }}
                >
                  {image.name}
                </span>
              </div>
            )
        )}
        {withArrows && currentIndex < data.length - 1 && (
          <span onClick={nextImage}>&rsaquo;</span>
        )}
      </div>
      {withPagination && (
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {data.map((image, index) => (
            <span key={image.id} onClick={() => setCurrentIndex(index)}>
              {currentIndex === index ? "O" : "."}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
