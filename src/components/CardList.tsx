import loadingDark from "../assets/loading-dark.gif";
import loadingWhite from "../assets/loading-white.gif";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import star from "../assets/star.png";
import "./styles/CardList.scss";

interface CardListProps {
  isLoading: boolean;
  getSolution: (location: string) => void;
  darkMode: string;
}

interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [
  { src: sun, alt: "sun" },
  { src: moon, alt: "moon" },
  { src: star, alt: "star" },
];
const CardList: React.FC<CardListProps> = ({
  isLoading,
  getSolution,
  darkMode,
}) => {
  const loading = darkMode ? loadingWhite : loadingDark;

  if (isLoading) {
    return (
      <div className="Loading">
        <img src={loading} alt="loading" />
        <p>솔루션을 찾는중입니다...</p>
      </div>
    );
  }

  return (
    <div className="CardList">
      <div className="CardList__image">
        {images.map((image, index) => (
          <img
            onClick={() => getSolution("/solution")}
            key={index}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
      <h4 className="CardList__title">
        고민 또는 질문을 생각하면서 카드를 선택해주세요.
      </h4>
    </div>
  );
};

export default CardList;
