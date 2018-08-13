import React, { Component } from 'react';
import styled from 'styled-components';
import escapeHtml from 'lodash/escape';

const COLLAPSED_TEXT_LENGTH = 200;
const MAX_NEW_LINES = 5;

const ShowMore = styled.span`
  cursor: pointer;
  font-size: 0.8em;
  color: #264dd9;
  margin-left: 1em;

  :hover {
    text-decoration: underline;
  }
`;

export class CollapsableText extends Component {
  constructor(props) {
    super(props);

    const { text } = this.props;
    let isCollapsed = false;
    let collapsedText;
    if (text.length > COLLAPSED_TEXT_LENGTH) {
      isCollapsed = true;
      collapsedText = text.split(' ').reduce((acc, item) => {
        if (acc.length > COLLAPSED_TEXT_LENGTH) {
          return acc;
        }
        return acc ? acc + ' ' + item : item;
      }, '');
    } else if (text.split('\n').length > MAX_NEW_LINES) {
      isCollapsed = true;
      collapsedText = text
        .split('\n')
        .slice(0, MAX_NEW_LINES)
        .reduce((acc, item) => (acc ? acc + '\n' + item : item), '');
    } else {
      collapsedText = text;
    }

    this.state = {
      isCollapsed,
      collapsedText,
    };
  }

  showMore = () => {
    this.setState({ isCollapsed: false });
  };

  render() {
    const { isCollapsed, collapsedText } = this.state;
    if (isCollapsed) {
      return (
        <span>
          <span dangerouslySetInnerHTML={{ __html: sanitizeMessage(collapsedText) + '...' }} />
          <ShowMore onClick={this.showMore}>Show more</ShowMore>
        </span>
      );
    } else {
      return <span dangerouslySetInnerHTML={{ __html: sanitizeMessage(this.props.text) }} />;
    }
  }
}

const sanitizeMessage = (message) => {
  const expression = /(\bhttps?:\/\/[^.,?!:;\s<>"]+(?:[.,?!:;]+[^.,?!:;\s<>"]+)+)/g;
  const replaceMatchWithLink = (match) => {
    return `<a href="${match}">${escapeHtml(match)}</a>`;
  };
  return message
    .split(expression)
    .map((messagePart, index) => (index % 2 === 0 ? escapeHtml(messagePart) : replaceMatchWithLink(messagePart)))
    .join('');
};
