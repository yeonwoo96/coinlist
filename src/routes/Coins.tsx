import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { useOutletContext } from "react-router";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.3s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;
interface Icoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const { isLoading, data } = useQuery<Icoin[]>("allCoins", fetchCoins);
  /* const [coins, setCoins] = useState<Icoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const data = await res.json();
      setCoins(data.slice(0, 100));
      setLoading(false);
    })();
  }, []); */
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinsList>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <CoinWrapper>
                  <Img
                    src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                    alt={coin.id}
                  />
                  {coin.name} &rarr;
                </CoinWrapper>
              </Link>
            </Coin>
          ))
        )}
      </CoinsList>
    </Container>
  );
}
export default Coins;
