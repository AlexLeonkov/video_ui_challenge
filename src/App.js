
import { AppRouter } from "./components/AppRouter";
import Layout from './components/Layout';
import { ProvideAuth } from "./context/auth-context";
import { BrowserRouter, Link } from "react-router-dom";

import "./App.css";

const App = () => (
    <BrowserRouter>
      <ProvideAuth>
        <Layout>
          <AppRouter />
        </Layout>
      </ProvideAuth>
    </BrowserRouter>
  );


export default App;
