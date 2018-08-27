import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Purrmoter } from './Purrmoter';
import Context from '../Context';
import styled from 'styled-components';
import Link from '../Link';
import { EntityAvatar } from '../Entity';
import Catvertised from './Catvertised';
import { Web3ProviderStatus } from '../Providers';
import {
  EntityNameWrapper,
  CatvertisedName,
  CatvertisedScore,
  CatvertisedList,
  CatvertisedItem,
  EntityDescription,
} from './Styles';
import { Tab, Tabs, TabList } from 'react-tabs';

const formatCurrency = (value) => {
  return (value * 10 ** -18).toFixed(3);
};

const CatvertisedItemLink = styled(Link)`
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: 770px) {
    flex-direction: column;
    align-items: normal;
    text-align: center;
    width: 100%;
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

const PromotionTab = styled(({ count, children, ...props }) => (
  <Tab {...props}>
    <span style={{ fontSize: '2rem' }}>{count}</span>
    <span style={{ fontSize: '1rem' }}>{children}</span>
  </Tab>
))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 2px #f0f1f6 solid;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  font-weight: 600;
  padding-left: 0;

  &.react-tabs__tab--selected {
    cursor: unset;
    color: #264dd9;
    border-bottom: 2px #264dd9 solid;
  }
`;

PromotionTab.tabsRole = 'Tab';

export class PromotionBox extends Component {
  static defaultProps = {
    asset: 'ethereum',
    assetInfo: { symbol: 'ETH', decimals: 18 },
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
        {this.state.currentPage === PAGE.SUPPORTERS && (
          <Web3ProviderStatus>
            {(isEnabled) => {
              return (
                <AddAKitty onClick={() => this.setState({ currentPage: PAGE.CATVERTISING })} disabled={!isEnabled}>
                  Start supporting
                </AddAKitty>
              );
            }}
          </Web3ProviderStatus>
        )}
        {Object.keys(items).length > 0 && this.renderList(items)}
      </React.Fragment>
    );
  };

  renderList = (items) => {
    return (
      <CatvertisedList style={{ marginTop: '15px' }}>
        {Object.entries(items)
          .sort(([, { score: a }], [, { score: b }]) => b - a)
          .map(([id, { score, context_info: contextInfo }]) => (
            <CatvertisedItem key={id}>
              <CatvertisedItemLink to={`/${id}`}>
                <EntityAvatar size="medium" id={id} entityInfo={contextInfo} />
                <EntityDescription>
                  <CatvertisedName>
                    <EntityNameWrapper>{contextInfo.name}</EntityNameWrapper>
                  </CatvertisedName>
                  <CatvertisedScore>{formatCurrency(score)} ETH</CatvertisedScore>
                </EntityDescription>
              </CatvertisedItemLink>
            </CatvertisedItem>
          ))}
      </CatvertisedList>
    );
  };

  renderTabs = (supportersCount, supportingCount) => {
    return (
      <Tabs selectedIndex={this.state.currentPage} onSelect={(index) => this.setState({ currentPage: index })}>
        <TabList className="columns is-mobile is-marginless">
          <PromotionTab className="column is-half" tabIndex={PAGE.SUPPORTERS} count={supportersCount}>
            Supporters
          </PromotionTab>
          <PromotionTab className="column is-half" tabIndex={PAGE.SUPPORTING} count={supportingCount}>
            Supporting
          </PromotionTab>
        </TabList>
      </Tabs>
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
