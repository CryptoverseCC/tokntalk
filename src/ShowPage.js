import React from "react";
import { Link } from 'react-router-dom';
import kitty1 from './img/1.png';
import { purrs } from './db.json';
import { transformPurrsToPurrGroups } from './utils';
import kitten from './img/kitten.svg';
import { PurrGroup, PurrForm, Purr } from './Purr';

const ShowCat = ({ match: { params: { catId } }, activeCat }) => (
  <React.Fragment>
    <section className="hero hero-kitten is-small">
      <div className="hero-body">
        <div className="columns">
          <div className="column is-12 has-text-centered">
            <div className="your-kitten">
              <img style={{ width: '450px', height: 'auto' }} src={kitten} alt={catId} />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section style={{ paddingTop: '4rem' }}>
      <div className="container">
        {transformPurrsToPurrGroups(purrs.filter(purr => purr.token_id === catId)).map(
          ({ catId, purrs }, groupIndex) => (
            <PurrGroup
              key={groupIndex}
              Avatar={() => (
                <Link to={`${catId}`}>
                  <img style={{ width: '50px', height: 'auto' }} src={kitty1} alt={catId} />
                  <p>Kitty #{catId}</p>
                </Link>
              )}
            >
              {activeCat && activeCat.token === catId && <PurrForm />}
              {purrs.map(({ message, sequence }, purrIndex) => (
                <Purr key={purrIndex} message={message} date={sequence} />
              ))}
            </PurrGroup>
          )
        )}
      </div>
    </section>
  </React.Fragment>
);

export default ShowCat;
