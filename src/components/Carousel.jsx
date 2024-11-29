import { useEffect, useRef, useState } from "react";
import Button from "./Button";

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
 * BONUS: une props "swipeable" permettant de switcher en swipant gauche ou droite
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
  withKeyboardShortcuts = false,
  swipeable = false,
  theme,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalId = useRef();

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
  function initAutoPlay() {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = undefined;
    }
    intervalId.current = setInterval(nextImage, 1000);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = undefined;
      }
    };
  }

  useEffect(() => {
    if (autoPlay) {
      return initAutoPlay();
    }
  }, [autoPlay]);

  useEffect(() => {
    if (withKeyboardShortcuts) {
      function handleShortcut(event) {
        const key = event.key;
        switch (key) {
          case withKeyboardShortcuts?.left ?? "ArrowLeft":
            prevImage();
            break;
          case withKeyboardShortcuts?.right ?? "ArrowRight":
            nextImage();
            break;
        }
        if (autoPlay) initAutoPlay();
      }
      window.addEventListener("keyup", handleShortcut);

      return () => {
        window.removeEventListener("keyup", handleShortcut);
      };
    }
  }, [withKeyboardShortcuts]);

  useEffect(() => {
    if (swipeable) {
      let start;
      function handleSwipeStart(event) {
        start = event.clientX;
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "none";
          event.dataTransfer.dropEffect = "none";
        }
      }
      function handleSwipeEnd(event) {
        const end = event.clientX;
        const dir = start > end ? "left" : "right";
        switch (dir) {
          case "left":
            prevImage();
            break;
          case "right":
            nextImage();
            break;
        }
        if (autoPlay) initAutoPlay();
      }
      window.addEventListener("touchstart", handleSwipeStart);
      window.addEventListener("touchend", handleSwipeEnd);
      window.addEventListener("dragstart", handleSwipeStart);
      window.addEventListener("dragend", handleSwipeEnd);

      return () => {
        window.removeEventListener("touchstart", handleSwipeStart);
        window.removeEventListener("touchend", handleSwipeEnd);
        window.removeEventListener("dragstart", handleSwipeStart);
        window.removeEventListener("dragend", handleSwipeEnd);
      };
    }
  }, [swipeable]);

  function nextImage() {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  }
  function prevImage() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
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
          <Button theme={theme} variant="text" onClick={prevImage}>
            &lsaquo;
          </Button>
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
          <Button theme={theme} variant="text" onClick={nextImage}>
            &rsaquo;
          </Button>
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
