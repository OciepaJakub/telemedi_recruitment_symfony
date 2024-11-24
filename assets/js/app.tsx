/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
//import './css/app.css';

// start the Stimulus application
//import './bootstrap';


import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import '../css/app.css';
import ExchangeRatesPage from './Pages/ExchangeRatesPage';
import Home from './Pages/Home';
import Footer from './partials/Footer';
import Header from './partials/Header';

ReactDOM.render(
    <Router>
        <Header />
        <main className="min-h-[calc(100vh_-_73px_-_224px)]">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/kurs-walut">
                    <ExchangeRatesPage />
                </Route>
            </Switch>
        </main>
        <Footer />
    </Router>,
document.getElementById('root'));

