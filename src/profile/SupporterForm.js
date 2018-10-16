import React from 'react';
import styled from 'styled-components';

import { setApprove, boost } from '../api';
import Dropdown from '../Dropdown';
import { A } from '../Link';
import Context from '../Context';
import { LinkedEntityAvatar, EntityName, Entities, EntityAvatar } from '../Entity';
import checkmarkIcon from '../img/checkmark.svg';
import { toWei } from '../balance';
import { niceScroll } from '../cssUtils';
import { StyledButton, StyledInput } from '../Components';

const Container = styled.div`
  display: flex;
  position: relative;
  font-size: 1rem;
  font-weight: 600;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const Avatar = styled(EntityAvatar)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const EntityNameWrapper = styled.b`
  white-space: nowrap;
`;

export const CatvertisedName = styled.span`
  margin-left: 10px;

  @media (max-width: 770px) {
    margin-left: 10px;
    white-space: nowrap;
  }
`;

export const CatvertisedScore = styled.div`
  margin-left: 10px;
  font-size: 0.8em;
  color: #78818c;
  font-weight: 500;
`;

export const CatvertisedList = styled.ul`
  max-height: 340px;
  overflow-y: scroll;
  position: relative;
  margin-top: 15px;

  ${niceScroll};

  @media (max-width: 770px) {
    display: flex;
    align-items: flex-start;
    overflow-y: unset;
    overflow-x: scroll;
    margin-top: 0px;
    height: 100px;

    ${CatvertisedName} {
      margin-left: 0;
    }

    ${CatvertisedScore} {
      margin-left: 0;
    }
  }
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  flex-shrink: 0;

  @media (max-width: 770px) {
  }
`;

export const EntityDescription = styled.div`
  @media (max-width: 770px) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Position = styled.div`
  font-size: 1.5em;
  color: #78818c;
`;

const createEtherscanUrl = (transactionHash, networkName) => {
  const familyPrefix = networkName === 'ethereum' ? '' : `${networkName}.`;
  return `https://${familyPrefix}etherscan.io/tx/${transactionHash}`;
};

const CatvertisedClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  outline: none;
  background: none;
  border: none;
  font-size: 20px;
  padding: 0;
  cursor: pointer;
`;

const TokenSelectorContent = styled.ul`
  min-width: 235px;
  border-radius: 6px;
  background-color: #ffffff;
`;

const TokenToggle = styled.div.attrs({
  children: ({ value }) => value.symbol,
})`
  display: flex;
  align-items: center;
  min-width: 50px;
  cursor: pointer;
  margin: 6px;
  padding: 6px;
  height: calc(100% - 2 * 6px);
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 6px;
  background-color: #dae2fb;
  ::after {
    content: '⌄';
    font-size: 1.2rem;
    margin-left: auto;
  }
`;

export default class SupporterForm extends React.Component {
  state = {
    step: 'form',
    value: 0,
    customCatId: undefined,
    entity: undefined,
  };

  calculatePosition = (boosts) => {
    const { decimals } = this.props.assetInfo;
    const scores = Object.entries(boosts)
      .sort(([, { score: a }], [, { score: b }]) => b - a)
      .map(([, { score }]) => score);
    let position = 0;
    while (position < scores.length) {
      if (scores[position] > this.state.value * 10 ** decimals) {
        position += 1;
      } else {
        break;
      }
    }
    return position + 1;
  };

  renderPosition = (position) =>
    position <= 5 ? <span style={{ color: '#40bf57' }}>#{position}</span> : `#${position}`;

  boost = async () => {
    this.setState({ step: 'submitted' });
  };

  onSupport = async (e) => {
    try {
      e.preventDefault();

      if (this.props.asset !== 'ethereum') {
        this.setState({ step: 'approving' });
        const [, erc20] = this.props.asset.split(':');
        await setApprove(erc20, toWei(this.state.value, this.props.assetInfo.decimals));
      }

      this.setState({ step: 'signing' });
      const { transactionHash, networkName } = await boost(
        this.state.entity,
        this.props.token,
        toWei(this.state.value, this.props.assetInfo.decimals),
        this.props.asset,
      );

      this.setState({
        etherscanUrl: createEtherscanUrl(transactionHash, networkName),
        step: 'submitted',
      });
    } catch (e) {
      this.setState({ step: 'form' }); // ToDo display error
    }
  };

  render() {
    return (
      <Context.Consumer>
        {({ boostStore: { boosts } }) => {
          return (
            <React.Fragment>
              <Container className={this.props.className}>
                {this.state.step === 'form' && this.renderForm(boosts)}
                {this.state.step === 'approving' && this.renderApproving()}
                {this.state.step === 'signing' && this.renderSigning()}
                {this.state.step === 'submitted' && this.renderSubmitted()}
              </Container>
            </React.Fragment>
          );
        }}
      </Context.Consumer>
    );
  }

  renderSigning = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: '2rem',
          color: '#1b2437',
        }}
      >
        ⏳
      </div>
      <div style={{ fontSize: '1rem' }}>Sign the transaction</div>
    </div>
  );

  renderApproving = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: '2rem',
          color: '#1b2437',
        }}
      >
        ⏳
      </div>
      <div style={{ fontSize: '1rem' }}>Waiting for approve transaction to be mined.</div>
    </div>
  );

  renderForm = (boosts) => {
    return (
      <Form style={{ display: 'flex', alignItems: 'center' }}>
        <span>Put </span>
        <div style={{ display: 'flex' }}>
          <Entities>
            {({ entities }) =>
              entities.length > 0 && (
                <Dropdown
                  position="left"
                  Content={TokenSelectorContent}
                  toggle={({ openDropdown }) =>
                    this.state.entity ? (
                      <DropdownItem onClick={openDropdown}>
                        <Avatar id={this.state.entity.id} entityInfo={this.state.entity} />
                        <CatvertisedName>
                          <EntityNameWrapper>{this.state.entity.name}</EntityNameWrapper>
                        </CatvertisedName>
                      </DropdownItem>
                    ) : (
                      <span onClick={openDropdown}>Select Avatar ▾</span>
                    )
                  }
                >
                  {({ closeDropdown }) =>
                    entities.map((entity) => (
                      <DropdownItem
                        key={entity.id}
                        onClick={() => {
                          this.setState({
                            step: 'form',
                            entity,
                          });
                          closeDropdown();
                        }}
                      >
                        <Avatar id={entity.id} entityInfo={entity} />
                        <CatvertisedName>
                          <EntityNameWrapper>{entity.name}</EntityNameWrapper>
                        </CatvertisedName>
                      </DropdownItem>
                    ))
                  }
                </Dropdown>
              )
            }
          </Entities>
        </div>
        <span>on position</span>
        <Position>{this.renderPosition(this.calculatePosition(boosts))}</Position>
        <span>with</span>
        <StyledInput
          pattern="^[0-9]+(\.[0-9]+)?$"
          type="text"
          value={this.state.value}
          title="Value must only contain numbers and `.` sign. e.g. 0.011"
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
        />
        {this.props.assetInfo.symbol}?
        <StyledButton disabled={this.state.value <= 0} onClick={this.onSupport}>
          Go!
        </StyledButton>
        <StyledButton onClick={this.props.onClose}>Cancel</StyledButton>
      </Form>
    );
  };

  renderSubmitted = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <CatvertisedClose
          onClick={() => {
            this.setState({ step: 'catvertised', customCatId: undefined, value: 0 });
          }}
        >
          ✖
        </CatvertisedClose>
        <img alt="" src={checkmarkIcon} style={{ transform: 'scale(2)', marginBottom: '10px' }} />
        <div
          style={{
            fontWeight: 600,
            fontSize: '2rem',
            color: '#1b2437',
          }}
        >
          Success!
        </div>
        <div style={{ fontSize: '1rem' }}>
          <EntityName id={this.state.entity.id} /> is now a supporter!
        </div>
        <A href={this.state.etherscanUrl} style={{ marginTop: '10px' }}>
          Check it on Etherscan
        </A>
      </div>
    );
  };
}
