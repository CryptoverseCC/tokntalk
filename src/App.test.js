import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const transformPurrsToPurrGroups = (purrs) => {
  let purrGroups = [];
  for (const purr of purrs) {
    const lastPurrGroup = purrGroups[purrGroups.length - 1];
    if(lastPurrGroup && lastPurrGroup.catId === purr.token_id) {
      lastPurrGroup.purrs.push({ message: purr.message });
    } else {
      purrGroups.push({ catId: purr.token_id, purrs: [{ message: purr.message }] })
    }
  }
  return purrGroups;
};

describe('#transformPurrsToPurrGroups', () => {
  test('empty', () => {
    expect(transformPurrsToPurrGroups([])).toEqual([]);
  });

  test('single purr', () => {
    expect(
      transformPurrsToPurrGroups([
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          created_at: 1520425637000,
          id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
          message: "I'm supercat! (true story)",
          sequence: 5212559,
          token_id: '341605',
          family: 'ethereum'
        }
      ])
    ).toEqual([
      {
        catId: '341605',
        purrs: [{ message: "I'm supercat! (true story)" }]
      }
    ]);
  });
  test('multiple purrs from single cat', () => {
    expect(
      transformPurrsToPurrGroups([
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          created_at: 1520425637000,
          id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
          message: "I'm supercat! (true story)",
          sequence: 5212559,
          token_id: '341605',
          family: 'ethereum'
        },
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          created_at: 1520425637001,
          id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4eae:0',
          message: "Another message!",
          sequence: 5212560,
          token_id: '341605',
          family: 'ethereum'
        }
      ])
    ).toEqual([
      {
        catId: '341605',
        purrs: [{ message: "I'm supercat! (true story)" }, { message: "Another message!" }]
      }
    ]);
  });
  test('multiple purrs from single cat', () => {
    expect(
      transformPurrsToPurrGroups([
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          created_at: 1520425637000,
          id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4ead:0',
          message: "I'm supercat! (true story)",
          sequence: 5212559,
          token_id: '341605',
          family: 'ethereum'
        },
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          created_at: 1520425637001,
          id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4eae:0',
          message: "Message from another cat!",
          sequence: 5212559,
          token_id: '123',
          family: 'ethereum'
        },
        {
          author: '0x223edbc8166ba1b514729261ff53fb8c73ab4d79',
          created_at: 1520425637001,
          id: 'claim:0x3e58d7a2955b3677fcb63752b906640c04bc9d773c07c11d146955cd7edc4eae:0',
          message: "Another message!",
          sequence: 5212560,
          token_id: '341605',
          family: 'ethereum'
        }
      ])
    ).toEqual([
      {
        catId: '341605',
        purrs: [{ message: "I'm supercat! (true story)" }]
      },
      {
        catId: '123',
        purrs: [{ message: "Message from another cat!" }]
      },
      {
        catId: '341605',
        purrs: [{ message: "Another message!" }]
      }
    ]);
  });
});
