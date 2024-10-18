import { useNavigate } from "react-router-dom";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import star from "../assets/star.png";
import "./styles/CardList.scss";

const CardList = () => {
  const nav = useNavigate();

  interface Image {
    src: string;
    alt: string;
  }

  const images: Image[] = [
    { src: sun, alt: "sun" },
    { src: moon, alt: "moon" },
    { src: star, alt: "star" },
  ];

  const getSolution = (): void => {
    nav("/solution");
  };

  return (
    <div className="home">
      <div className="home__image">
        {images.map((image, index) => (
          <img
            onClick={getSolution}
            key={index}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
      <h4 className="home__title">
        질문을 생각하면서 원하는 카드를 선택해주세요.
      </h4>
    </div>
  );
};

export default CardList;
