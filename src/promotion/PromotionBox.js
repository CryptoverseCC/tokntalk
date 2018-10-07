import React, { Component } from 'react';
import styled from 'styled-components';

import { fromWeiToString } from '../balance';
import { Purrmoter } from './Purrmoter';
import Context from '../Context';
import Link from '../Link';
import { EntityAvatar } from '../Entity';
import Catvertised from './Catvertised';
import { Web3ProviderStatus } from '../Providers';
import { FeedTypeButton } from '../FeedTypeSwitcher';
import {
  EntityNameWrapper,
  CatvertisedName,
  CatvertisedScore,
  CatvertisedList,
  CatvertisedItem,
  EntityDescription,
} from './Styles';

const formatCurrency = (value, decimals) => fromWeiToString(value, decimals);

const PromotedList = styled(CatvertisedList)`
  @media (max-width: 770px) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: auto;
  }
`;

const PromotedItem = styled(CatvertisedItem)`
  @media (max-width: 770px) {
    width: 17%;
    margin: 0;

    :last-child {
      margin: 0;
    }

    & + & {
      margin: 0;
    }
  }
`;

const PromotedItemLink = styled(Link)`
  display: flex;
  overflow: hidden;

  @media (max-width: 770px) {
    flex-direction: column;
    align-items: normal;
    text-align: center;
    width: 100%;
    margin: 0;
  }
`;

const AddAKitty = styled.button`
  margin-top: 15px;
  font-family: 'AvenirNext';
  font-weight: 600;
  align-self: flex-start;
  width: 100%;
  border: none;
  outline: none;
  color: #264dd9;
  font-size: 1rem;
  padding: 1em 0 0.75em 0;
  border-radius: 12px;
  cursor: pointer;

  @media (max-width: 770px) {
    margin-top: 10px;
    ${({ hiddenOnMobile }) => (hiddenOnMobile ? `display: none;` : '')};
  }
  background-color: ${({ disabled }) => (disabled ? '#f4f8fd' : '#ebefff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#8C91A2' : '#264dd9')};
`;

const PAGE = {
  SUPPORTERS: 0,
  SUPPORTING: 1,
  CATVERTISING: 2,
};

const PromotionTab = ({ count, children, ...props }) => (
  <FeedTypeButton {...props}>
    <span style={{ fontSize: '1.2rem' }}>{count}</span>
    &nbsp;
    <span style={{ fontSize: '1rem' }}>{children}</span>
  </FeedTypeButton>
);

export class PromotionBox extends Component {
  static defaultProps = {
    asset: 'ethereum',
    assetInfo: { symbol: 'ETH', decimals: 18 },
    limit: 5,
  };

  state = {
    currentPage: PAGE.SUPPORTERS,
  };

  static Container = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    flex-direction: column;
  `;

  static Avatar = styled(EntityAvatar)`
    width: 48px;
    height: 48px;

    flex-shrink: 0;

    @media (max-width: 770px) {
      margin: auto;
    }
  `;

  componentDidMount() {
    this.props.getBoosts(this.props.token, this.props.asset);
    this.props.getSupportings(this.props.token, this.props.asset);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== this.props.token) {
      this.props.getBoosts(nextProps.token, nextProps.asset);
      this.props.getSupportings(nextProps.token, nextProps.asset);
    }
  }

  render = () => {
    return (
      <Context.Consumer>
        {({ boostStore: { boosts, supportings } }) => (
          <PromotionBox.Container className={this.props.className}>
            {this.state.currentPage === PAGE.SUPPORTERS &&
              this.renderTabContent(boosts, Object.keys(boosts).length, Object.keys(supportings).length)}
            {this.state.currentPage === PAGE.SUPPORTING &&
              this.renderTabContent(supportings, Object.keys(boosts).length, Object.keys(supportings).length)}
            {this.state.currentPage === PAGE.CATVERTISING && this.renderCatvertising(boosts)}
          </PromotionBox.Container>
        )}
      </Context.Consumer>
    );
  };

  renderTabContent = (items, supportersCount, supportingCount) => {
    return (
      <React.Fragment>
        {this.props.showPurrmoter && <Purrmoter token={this.props.token} />}
        {!this.props.showPurrmoter && this.renderTabs(supportersCount, supportingCount)}
        {Object.keys(items).length > 0 && this.renderList(items, this.props.limit)}
        {this.state.currentPage === PAGE.SUPPORTERS && (
          <Web3ProviderStatus>
            {(isEnabled) => {
              return (
                <AddAKitty
                  onClick={() => this.setState({ currentPage: PAGE.CATVERTISING })}
                  disabled={!isEnabled}
                  hiddenOnMobile={true}
                >
                  Start supporting
                </AddAKitty>
              );
            }}
          </Web3ProviderStatus>
        )}
      </React.Fragment>
    );
  };

  renderList = (items, limit) => {
    return (
      <PromotedList>
        {Object.entries(items)
          .sort(([, { score: a }], [, { score: b }]) => b - a)
          .slice(0, limit)
          .map(([id, { score, context_info: contextInfo }]) => (
            <PromotedItem key={id}>
              <PromotedItemLink to={`/${id}`}>
                <PromotionBox.Avatar id={id} entityInfo={contextInfo} />
                <EntityDescription>
                  <CatvertisedName>
                    <EntityNameWrapper>{contextInfo.name}</EntityNameWrapper>
                  </CatvertisedName>
                  <CatvertisedScore>
                    {formatCurrency(score, this.props.assetInfo.decimals)} {this.props.assetInfo.symbol}
                  </CatvertisedScore>
                </EntityDescription>
              </PromotedItemLink>
            </PromotedItem>
          ))}
      </PromotedList>
    );
  };

  renderTabs = (supportersCount, supportingCount) => {
    return (
      <div className="columns is-mobile is-marginless">
        <PromotionTab
          className="column is-half"
          selected={PAGE.SUPPORTERS === this.state.currentPage}
          count={supportersCount}
          onClick={() => this.setState({ currentPage: PAGE.SUPPORTERS })}
        >
          Supporters
        </PromotionTab>
        <PromotionTab
          className="column is-half"
          selected={PAGE.SUPPORTING === this.state.currentPage}
          count={supportingCount}
          onClick={() => this.setState({ currentPage: PAGE.SUPPORTING })}
        >
          Supporting
        </PromotionTab>
      </div>
    );
  };

  renderCatvertising = (boosts) => {
    return (
      <Catvertised
        getBoosts={() => boosts}
        token={this.props.token}
        asset={this.props.asset}
        assetInfo={this.props.assetInfo}
        onBackClick={() => this.setState({ currentPage: PAGE.SUPPORTERS })}
      />
    );
  };
}
