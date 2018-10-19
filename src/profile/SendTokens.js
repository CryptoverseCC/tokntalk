import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from 'react-virtualized/dist/commonjs/Grid';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import Link from '../Link';
import AppContext from '../Context';
import { getEntities, getEntityTokens, transferErc20, transferErc721 } from '../api';
import { LinkedEntityAvatar, EntityName } from '../Entity';
import { FlatContainer, H4, StyledButton } from '../Components';
import { niceScroll } from '../cssUtils';
import { Token } from '../ActiveEntityTokens';

const NiceGrid = styled(Grid)`
  ${niceScroll};
`;

const CoverImage = styled.div`
  border-radius: 12px;
  background-image: ${({ src }) => `url(${src})`};
  background-color: ${({ primaryColor }) => primaryColor};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 150px;
  height: 100px;
`;

const Cover = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Cell = styled.div`
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
`;

const Name = styled.span`
  font-family: AvenirNext;
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
`;

const Tools = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.div.attrs({
  children: (props) => <input {...props} />,
})`
  flex-grown: 0;
  postion: relative;

  & > input {
    height: 100%;
    width: 70px;
    font-size: 1rem;
    font-weight: 600;
    color: #264dd9;
    background-color: #f3f6ff;
    border-radius: 12px;
    padding: 3px;
  }
`;

const TransferButton = styled(StyledButton)`
  padding: 8px 5px 7px 5px;
`;

export class Tokens extends Component {
  state = {
    entities: [],
    tokens: [],
  };

  componentDidMount() {
    this.update(this.props.sender.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sender.id !== this.props.sender.id) {
      this.setState({ entities: [] });
      this.update(nextProps.sender.id);
    }
  }

  update = async (senderAddress) => {
    try {
      const entities = await getEntities(senderAddress);
      const tokens = (await getEntityTokens(senderAddress)).filter((token) => !token.is721);
      this.setState({ entities, tokens });
    } catch (ex) {}
  };

  render() {
    const { receiver } = this.props;
    const { tokens, entities } = this.state;
    const cellSize = 200;
    const columnsNumber = this.state.entities.length;

    return (
      <div style={{ height: '100%' }}>
        <span>
          Send tokens to <EntityName id={receiver.id} />
        </span>
        <H4>Non-Fungible tokens</H4>
        {entities.length ? (
          <div style={{ height: '40vh' }}>
            <AutoSizer>
              {({ width, height }) => (
                <NiceGrid
                  cellRenderer={({ ...args }) => this.renderNFT(parseInt(width / cellSize), args)}
                  columnCount={parseInt(width / cellSize)}
                  columnWidth={cellSize}
                  height={height}
                  rowCount={parseInt(entities.length / parseInt(width / cellSize)) + 1}
                  rowHeight={cellSize}
                  width={width}
                />
              )}
            </AutoSizer>
          </div>
        ) : (
          <span>
            You don't hold any non-fungible tokens (that we support, let us know if we are missing something).
          </span>
        )}
        <H4 style={{ marginTop: '20px' }}>Fungible tokens</H4>
        {tokens.length ? (
          <div style={{ height: '32vh' }}>
            <AutoSizer>
              {({ width, height }) => (
                <NiceGrid
                  cellRenderer={({ ...args }) => this.renderFT(parseInt(width / cellSize), args)}
                  columnCount={parseInt(width / cellSize)}
                  columnWidth={cellSize}
                  height={height}
                  rowCount={parseInt(tokens.length / parseInt(width / cellSize)) + 1}
                  rowHeight={cellSize}
                  width={width}
                />
              )}
            </AutoSizer>
          </div>
        ) : (
          <span>You don't hold any fungible tokens (let us know if we are missing something).</span>
        )}
      </div>
    );
  }

  renderFT = (columnCount, { columnIndex, rowIndex, key, style }) => {
    let index = rowIndex * columnCount + columnIndex;
    const token = this.state.tokens[index];
    if (!token) return null;

    let valueId = token.address + '_value';
    return (
      <div key={key} style={style}>
        {token && (
          <Cell>
            <Cover to={`/clubs/${token.network}:${token.address}`}>
              <CoverImage src={token.logo} primaryColor={token.primaryColor} />
              <Name>{token.name}</Name>
            </Cover>
            <Tools>
              <StyledInput
                value={this.state[valueId] || 0}
                onChange={(e) => {
                  this.setState({
                    [valueId]: parseInt(e.target.value),
                  });
                }}
              />
              <TransferButton
                onClick={async () => {
                  try {
                    await transferErc20(token.address, this.props.receiver.id, this.state[valueId]); //TODO: get value from input
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                Send
              </TransferButton>
            </Tools>
          </Cell>
        )}
      </div>
    );
  };

  renderNFT = (columnCount, { columnIndex, rowIndex, key, style }) => {
    let index = rowIndex * columnCount + columnIndex;
    const entities = this.state.entities.filter((entity) => entity.id !== this.props.sender.id);
    const entity = entities[index];
    if (!entity) return null;
    return (
      <div key={key} style={style}>
        {entity && (
          <Cell>
            <Cover to={`/${entity.id}`}>
              <CoverImage src={entity.image_preview_url} primaryColor={entity.primaryColor} />
              <Name>{entity.name}</Name>
            </Cover>
            <Tools>
              <TransferButton
                onClick={async () => {
                  const tokenId = entity.id.split(':')[2];
                  const contractAddess = entity.id.split(':')[1];
                  try {
                    await transferErc721(contractAddess, this.props.receiver.id, tokenId);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                Send
              </TransferButton>
            </Tools>
          </Cell>
        )}
      </div>
    );
  };
}

export default class SendTokens extends Component {
  render() {
    const { sender, receiver } = this.props;
    return (
      <React.Fragment>
        <div style={{ width: '100%', height: 'calc(100vh - 190px)', display: 'flex', flexDirection: 'column' }}>
          {sender && <Tokens sender={sender} receiver={receiver} />}
          {!sender && <span>Unlock your wallet</span>}
        </div>
      </React.Fragment>
    );
  }
}
