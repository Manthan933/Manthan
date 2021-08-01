// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import axios from 'axios';
//
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { loadUser } from './actions/auth';

// ----------------------------------------------------------------------

if (localStorage.token) {
  const { token } = localStorage;
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    store.dispatch(loadUser());
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
