import "./style/main.scss";
import { Provider } from "react-redux";
import store from "./store/store";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
