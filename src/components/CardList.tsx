import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import star from "../assets/star.png";
import "./style/CardList.scss";

const CardList = () => {
  return (
    <div className="home">
      {/* <h1 className="home__title">고민을 생각하며 카드를 선택하세요</h1> */}
      <div className="home__image">
        <img src={sun} alt="sun" />
        <img src={moon} alt="moon" />
        <img src={star} alt="star" />
      </div>
    </div>
  );
};

export default CardList;
