import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import star from "../assets/star.png";
import "./styles/CardList.scss";

const CardList = () => {
  return (
    <div className="home">
      <div className="home__image">
        <img src={sun} alt="sun" />
        <img src={moon} alt="moon" />
        <img src={star} alt="star" />
      </div>
      <h4 className="home__title">
        질문을 생각하면서 원하는 카드를 선택해주세요.
      </h4>
    </div>
  );
};

export default CardList;
