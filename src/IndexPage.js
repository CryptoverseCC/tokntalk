import React from 'react';
import { Link } from 'react-router-dom';
import { PurrGroup, PurrForm, Purr } from './Purr';
import { SplitString, transformPurrsToPurrGroups } from './utils';
import kitty1 from './img/1.png';
import { purrs } from './db.json';

const Index = ({ activeCat, changeActiveCatToNext, changeActiveCatToPrevious }) => (
  <React.Fragment>
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-9 is-offset-3">
              <h1 className="title txtwav slow">
                <SplitString>Purr Purr</SplitString>
              </h1>
              <div className="subtitle">
                <h2 className="txtwav slow">
                  <SplitString>Make your cryptokitten talk with</SplitString>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section style={{ paddingTop: '4rem' }}>
      <div className="container">
        {activeCat && (
          <PurrGroup
            catId={activeCat.token}
            Avatar={() => (
              <React.Fragment>
                <div style={{ position: 'relative' }}>
                  <Link to={`${activeCat.token}`}>
                    <img style={{ width: '50px', height: 'auto' }} src={kitty1} alt={activeCat.token} />
                  </Link>
                  <ArrowButton direction="back" onClick={changeActiveCatToPrevious} />
                  <ArrowButton direction="forward" onClick={changeActiveCatToNext} />
                </div>
                <Link to={`${activeCat.token}`}>
                  <p>Kitty #{activeCat.token}</p>
                </Link>
              </React.Fragment>
            )}
          >
            <PurrForm />
          </PurrGroup>
        )}
        {transformPurrsToPurrGroups(purrs).map(({ catId, purrs }, groupIndex) => (
          <PurrGroup
            key={groupIndex}
            catId={catId}
            Avatar={() => (
              <Link to={`${catId}`}>
                <img style={{ width: '50px', height: 'auto' }} src={kitty1} alt={catId} />
                <p>Kitty #{catId}</p>
              </Link>
            )}
          >
            {purrs.map(({ message, sequence }, purrIndex) => (
              <Purr key={purrIndex} message={message} date={sequence} />
            ))}
          </PurrGroup>
        ))}
      </div>
    </section>
  </React.Fragment>
);

const ArrowButton = ({ direction, onClick }) => (
  <button
    className={`changeCat--button changeCat--button-${direction}`}
    style={{
      ...(direction === 'back' ? { left: 'calc(50% - 60px)' } : { right: 'calc(50% - 60px)' })
    }}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <svg className="changeCat--arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <path
        fill="currentColor"
        d="M8,12c-0.232,0-0.463-0.08-0.651-0.241l-7.759-6.65L0.892,3.59L8,9.683l7.108-6.093l1.302,1.519l-7.759,6.65 C8.463,11.92,8.232,12,8,12z"
      />
    </svg>
  </button>
);

export default Index;
