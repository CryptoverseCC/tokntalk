import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { transformPurrsToPurrGroups } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const purrFromCat1 = {
  author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
  created_at: 1520425637000,
  id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
  message: "I'm supercat! (true story)",
  sequence: 5212559,
  token_id: '341605',
  family: 'ethereum'
};

const anotherPurrFromCat1 = {
  author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
  created_at: 1520425637001,
  id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4eae:0',
  message: 'Another message!',
  sequence: 5212560,
  token_id: '341605',
  family: 'ethereum'
};

const purrFromCat2 = {
  author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
  created_at: 1520425637001,
  id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4eae:0',
  message: 'Message from another cat!',
  sequence: 5212559,
  token_id: '123',
  family: 'ethereum'
};

describe('#transformPurrsToPurrGroups', () => {
  test('empty', () => {
    expect(transformPurrsToPurrGroups([])).toEqual([]);
  });

  test('single purr', () => {
    expect(transformPurrsToPurrGroups([purrFromCat1])).toEqual([
      { catId: purrFromCat1.token_id, purrs: [purrFromCat1] }
    ]);
  });
  test('multiple purrs from single cat', () => {
    expect(transformPurrsToPurrGroups([purrFromCat1, anotherPurrFromCat1])).toEqual([
      { catId: purrFromCat1.token_id, purrs: [purrFromCat1, anotherPurrFromCat1] }
    ]);
  });
  test('multiple purrs from single cat', () => {
    expect(transformPurrsToPurrGroups([purrFromCat1, purrFromCat2, anotherPurrFromCat1])).toEqual([
      { catId: purrFromCat1.token_id, purrs: [purrFromCat1] },
      { catId: purrFromCat2.token_id, purrs: [purrFromCat2] },
      { catId: purrFromCat1.token_id, purrs: [anotherPurrFromCat1] }
    ]);
  });
});
