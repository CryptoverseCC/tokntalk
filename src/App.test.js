import React from 'react';
import ReactDOM from 'react-dom';
import { produceEntities } from './App';
import { sanitizeMessage } from './Feed';

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

describe('#sanitizeMessage', () => {
  test('empty string', () => {
    expect(sanitizeMessage('')).toBe('');
  });

  test('maciek', () => {
    expect(sanitizeMessage('maciek')).toBe('maciek');
  });

  test('https://wp.pl', () => {
    expect(sanitizeMessage('https://wp.pl')).toBe('<a href="https://wp.pl">https://wp.pl</a>');
  });

  test('<', () => {
    expect(sanitizeMessage('<')).toBe('&lt;');
  });

  test('https://wp.pl?a=5&b=6', () => {
    expect(sanitizeMessage('https://wp.pl?a=5&b=6')).toBe(
      '<a href="https://wp.pl?a=5&b=6">https://wp.pl?a=5&amp;b=6</a>'
    );
  });
});
