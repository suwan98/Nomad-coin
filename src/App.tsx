import { createGlobalStyle, styled } from "styled-components";
import "./App.css";
import Router from "./routes/Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { isRightMode, isDarkMode } from "./theme.ts";
import { isLightAtom } from "./atom.tsx";
import { useRecoilState } from "recoil";
import { MaterialIcon } from "./routes/Coin.tsx";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Source+Sans+Pro:wght@200;400&display=swap');
  body {
    font-family : 'Source Sans Pro', 'sans-serif';
    background-color: ${(props) => props.theme.bgColor};
    color : ${(props) => props.theme.textColor}
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  const [isLightMode, setIsLightMode] = useRecoilState(isLightAtom);
  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  return (
    <>
      {" "}
      <ThemeProvider theme={isLightMode ? isRightMode : isDarkMode}>
        <Toggle onClick={toggleTheme}>
          <MaterialIcon name={isLightMode ? "dark_mode" : "light_mode"} />
        </Toggle>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
  );
}

export default App;

const Toggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;
  padding: 0;
  font-size: 1.6rem;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.accentColor};
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
  }
  &:active {
    background-color: ${(props) => props.theme.activeCardColor};
    box-shadow: 0 0.1rem 0.5rem rgba(10, 10, 10, 0.2);
  }
`;
