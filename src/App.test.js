import React from 'react';
import ReactDOM from 'react-dom';
import { produceEntities } from './App';

describe('#produceEntities', () => {
  test('sets entities and undefined activeEntity for empty list', () => {
    expect(produceEntities([])).toEqual({ myEntities: [], activeEntity: undefined });
  });

  test('sets activeEntity as the first entity in entities', () => {
    expect(produceEntities([{ id: '123' }])).toEqual({ myEntities: [{ id: '123' }], activeEntity: { id: '123' } });
  });

  test('sets activeEntity as the previousActiveEntity if it exists in entities', () => {
    expect(produceEntities([{ id: '123' }, { id: '456' }], { id: '456' })).toEqual({
      myEntities: [{ id: '123' }, { id: '456' }],
      activeEntity: { id: '456' }
    });
  });
});
