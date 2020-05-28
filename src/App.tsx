import React from 'react';
import Layout from './components/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import pages from './pages';

declare global {
  interface Window {
    routes: any;
  }
}

window.routes = pages || [];

function App() {
  return (
    <Layout>
      <Switch>
        {pages.map((page, key) => (
          <Route
            key={key}
            // @ts-ignore
            exact={page.exact}
            path={page.path}
            component={page.component}
          />
        ))}

        <Route
          path="/"
          component={() => <Redirect from="/" to="/dashboard" />}
        />
        <Route path="*" component={() => <h1>Not found</h1>} />
      </Switch>
    </Layout>
  );
}

export default App;
