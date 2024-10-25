import CardList from "../components/CardList";
import Header from "../components/common/Header";
import useLoading from "../hooks/useLoading";
import ActionButton from "../components/common/ActionButton";

const Home = () => {
  const [isLoading, getSolution, darkMode] = useLoading() as [
    boolean,
    (location: string) => void,
    string
  ];
  return (
    <div>
      <Header isLoading={isLoading} />
      <CardList
        isLoading={isLoading}
        getSolution={getSolution}
        darkMode={darkMode}
      />
      <ActionButton isLoading={isLoading} />
    </div>
  );
};

export default Home;
