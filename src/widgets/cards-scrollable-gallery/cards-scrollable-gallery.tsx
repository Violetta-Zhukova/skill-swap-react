import { useEffect, useRef, useState, useMemo } from "react";
import type { IUser } from "../../entities/types";
import { MainUserCard } from "../main-user-card/main-user-card.tsx";
import style from "./cards-scrollable-gallery.module.css";

export type CardsScrollableGalleryProps = {
  title: string;
  cards: IUser[];
  currentUserId?: string | null;
};

export const CardsScrollableGallery = ({
  title,
  cards,
  currentUserId,
}: CardsScrollableGalleryProps) => {
  const [visibleCards, setVisibleCards] = useState<number>(6);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const batchSize = 6;

  // Сбрасываем состояние при изменении cards
  const [prevCardsLength, setPrevCardsLength] = useState(cards.length);

  if (cards.length !== prevCardsLength) {
    setVisibleCards(6);
    setPrevCardsLength(cards.length);
  }

  // Инициализация IntersectionObserver
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleCards((prev) => {
            const newValue = prev + batchSize;
            return newValue > cards.length ? cards.length : newValue;
          });
        }
      });
    }, options);

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [cards.length]);

  // Отображаемые карточки
  const displayedCards = useMemo(
    () => cards.slice(0, visibleCards),
    [cards, visibleCards],
  );

  return (
    <div>
      <div className={style.card_gallery_header}>
        <h2 className={style.card_gallery_header_title}>{title}</h2>
      </div>
      <div className={style.card_gallery_main}>
        {displayedCards.map((user) => (
          <MainUserCard
            key={`${currentUserId ?? "guest"}-${user.id}`}
            user={user}
            currentUserId={currentUserId}
          />
        ))}
        <div
          ref={sentinelRef}
          style={{
            height: "10px",
            width: "100%",
            position: "relative",
            top: "-100px",
            visibility: visibleCards >= cards.length ? "hidden" : "visible",
          }}
        />
      </div>
      {visibleCards < cards.length && (
        <div className={style.loading_indicator}>Загружаем еще карточки...</div>
      )}
    </div>
  );
};
