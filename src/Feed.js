import React, { Component } from 'react';
import equals from 'lodash/fp/equals';
import pipe from 'lodash/fp/pipe';
import uniqBy from 'lodash/fp/uniqBy';
import sortBy from 'lodash/fp/sortBy';
import styled from 'styled-components';

import Context from './Context';
import InfiniteScroll from './InfiniteScroll';
import TranslationsContext from './Translations';
import Loader from './Loader';
import { VerifyModal } from './VerifyModal';
import LikersModal from './LikersModal';
import Card from './feed/Card';

const EmptyFeedPlaceholder = styled.div`
  display: flex;
  flex: 1;
  padding: 4rem 0.75rem;
  font-size: 2rem;
  font-weight: 600;
  border-radius: 20px;
  background-color: white;
  color: #1b2437;
  justify-content: center;
`;

class Feed extends Component {
  state = {
    showLikes: false,
    feedItemLikes: [],
    showVerify: false,
    verifiableItem: undefined,
  };

  onShowLikers = (feedItem, reactions) => {
    this.setState({ showLikes: true, feedItemLikes: reactions });
  };

  onVerify = (item) => {
    this.setState({ showVerify: true, verifiableItem: item });
  };

  getTemporaryReactions = (id) => this.props.temporaryReactions[id] || [];

  render() {
    const {
      feedItems,
      feedLoading,
      temporaryReplies,
      getMoreFeedItems,
      feedLoadingMore,
      className,
      style,
      disabledInteractions,
      isClubFeed,
    } = this.props;
    const { showLikes, feedItemLikes, showVerify, verifiableItem } = this.state;

    return (
      <div className={className} style={{ display: 'flex', justifyContent: 'center', ...style }}>
        {feedLoading ? (
          <div style={{ paddingTop: '20px' }}>
            <Loader />
          </div>
        ) : feedItems.length > 0 ? (
          <InfiniteScroll
            style={{ width: '100%' }}
            hasMore={true}
            onLoadMore={getMoreFeedItems}
            throttle={100}
            threshold={300}
            isLoading={feedLoadingMore || feedLoading}
          >
            {feedItems.map((feedItem) => {
              const replies = pipe(
                sortBy('created_at'),
                uniqBy((about) => about.id),
              )([...(temporaryReplies[feedItem.id] || []), ...(feedItem.replies || [])]);

              const reactions = uniqBy((target) => target.id)([
                ...this.getTemporaryReactions(feedItem.id),
                ...(feedItem.likes || []),
              ]);

              return (
                <Card
                  collapseReplies
                  disabledInteractions={disabledInteractions}
                  isClubFeed={isClubFeed}
                  feedItem={feedItem}
                  replies={replies}
                  reactions={reactions}
                  key={feedItem.id}
                  added={feedItem.added}
                  onShowLikers={this.onShowLikers}
                  getTemporaryReactions={this.getTemporaryReactions}
                  onVerify={this.onVerify}
                />
              );
            })}
          </InfiniteScroll>
        ) : (
          <EmptyFeedPlaceholder>
            <b>
              <TranslationsContext.Consumer>{({ emptyFeed }) => emptyFeed}</TranslationsContext.Consumer>
            </b>
          </EmptyFeedPlaceholder>
        )}
        {showLikes && (
          <LikersModal
            onClose={() => this.setState({ showLikes: false })}
            likes={feedItemLikes}
            onVerify={this.onVerify}
          />
        )}
        {showVerify && <VerifyModal onClose={() => this.setState({ showVerify: false })} feedItem={verifiableItem} />}
      </div>
    );
  }
}
export default Feed;

export const getFeed = (
  fetchFnk,
  isFetchFnkCacheable,
  showTemporaryFeedItems,
  getFilterForTemporaryFeedItemsFnk,
  sortFnk,
) =>
  class extends Component {
    state = {
      feedLoading: false,
      feedItems: [],
      visibleItemsCount: 0,
      allFeedItems: [],
      feedVersion: undefined,
      lastFeedItemId: undefined,
      feedLoadingMore: false,
    };

    componentDidMount() {
      this.fetchFeedItems();
      if (isFetchFnkCacheable) {
        this.fetchNewItemsPeriodically();
      }
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutId);
    }

    timeoutId = null;
    fetchNewItemsPeriodically = () => {
      this.timeoutId = setTimeout(async () => {
        await this.getNewFeedItems();
        this.fetchNewItemsPeriodically();
      }, 3000);
    };

    componentDidUpdate(prevProps) {
      if (!equals(this.props.options, prevProps.options)) {
        this.fetchFeedItems();
      }
    }

    fetchFeedItems = async () => {
      this.setState({ feedLoading: true });
      try {
        if (isFetchFnkCacheable) {
          const { feedItems, total: feedItemsCount, version: feedVersion, lastItemId } = await fetchFnk({
            ...this.props.options,
            size: 30,
          });
          this.setState({ feedLoading: false, feedItems, feedItemsCount, feedVersion, lastFeedItemId: lastItemId });
        } else {
          const items = await fetchFnk(this.props.options);
          this.setState({
            feedLoading: false,
            allFeedItems: items,
            feedItems: items.slice(0, 10),
            visibleItemsCount: items.length > 10 ? 10 : items.length,
          });
        }
      } catch (e) {
        console.warn('Failed to download feedItems', e);
        this.setState({ loading: false });
      }
    };

    getMoreFeedItems = async () => {
      try {
        if (isFetchFnkCacheable) {
          if (this.state.feedLoadingMore) {
            return;
          }

          this.setState({ feedLoadingMore: true }, async () => {
            const { lastFeedItemId } = this.state;
            const { feedItems: moreFeedItems, total: feedItemsCount, lastItemId } = await fetchFnk({
              ...this.props.options,
              size: 30,
              oldestKnown: lastFeedItemId,
            });

            this.setState(({ feedItems }) => ({
              lastFeedItemId: lastItemId,
              feedLoadingMore: false,
              feedItems: [...feedItems, ...moreFeedItems],
              feedItemsCount,
            }));
          });
        } else {
          this.setState(({ visibleItemsCount, allFeedItems }) => {
            const countToShow =
              allFeedItems.length > visibleItemsCount + 30 ? visibleItemsCount + 30 : allFeedItems.length;
            return {
              visibleItemsCount: countToShow,
              feedItems: allFeedItems.slice(0, countToShow),
            };
          });
        }
      } catch (e) {
        console.warn('Failed to download more feedItems', e);
      }
    };

    getNewFeedItems = async () => {
      try {
        const { feedVersion: lastVersion, lastFeedItemId } = this.state;
        const { feedItems: newFeedItems, total: feedItemsCount, version: feedVersion } = await fetchFnk({
          ...this.props.options,
          lastVersion,
          oldestKnown: lastFeedItemId,
        });

        const addedFeedItems = newFeedItems.map((item) => ({ ...item, added: true }));
        this.setState(({ feedItems }) => ({
          feedVersion,
          feedItems: [...addedFeedItems, ...feedItems],
          feedItemsCount,
        }));
      } catch (e) {
        console.warn('Failed to download feedItems', e);
      }
    };

    render() {
      const { className } = this.props;
      const { feedItems, feedLoading, feedLoadingMore } = this.state;

      return (
        <Context.Consumer>
          {({ feedStore: { temporaryFeedItems, temporaryReplies, temporaryReactions } }) => {
            let filteredTemporaryFeedItems = [];
            if (showTemporaryFeedItems) {
              filteredTemporaryFeedItems = getFilterForTemporaryFeedItemsFnk
                ? temporaryFeedItems.filter(getFilterForTemporaryFeedItemsFnk(this.props.options))
                : temporaryFeedItems;
            }

            const allFeedItems = uniqBy('id')([...feedItems, ...filteredTemporaryFeedItems]);

            return (
              <Feed
                className={className}
                feedItems={sortFnk ? allFeedItems.sort(sortFnk) : allFeedItems}
                feedLoading={feedLoading}
                temporaryReplies={temporaryReplies}
                temporaryReactions={temporaryReactions}
                getMoreFeedItems={this.getMoreFeedItems}
                feedLoadingMore={feedLoadingMore}
              />
            );
          }}
        </Context.Consumer>
      );
    }
  };
