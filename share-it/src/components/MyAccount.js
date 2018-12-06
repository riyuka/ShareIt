import React, { Component } from 'react';
//import Link from './Link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


export const USER_QUERY = gql`
query {
  userInfo {
    name
    email
    links {
      description
      url
    }
  }
}
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      node {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      node {
        id
        link {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`;


class MyAccount extends Component {

  _subscribeToNewLinks = subscribeToMore => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newLink = subscriptionData.data.newLink.node;
  
        return Object.assign({}, prev, {
          userInfo: {
            links: [newLink, ...prev.userInfo.links],
            // count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        });
      }
    });
  };

  _subscribeToNewVotes = subscribeToMore => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION
    })
  };
 
    render() {
      return (
      <Query query={USER_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewLinks(subscribeToMore)
          this._subscribeToNewVotes(subscribeToMore)

          return data.userInfo.links.map ((links) => (
            <div className="card">
              <div className="" key={links.id}>
                <p className="card-title">{`${links.description}`}</p>
                <img className="card-img-top" src={`${links.url}`}/>
              </div>
            </div>
          ))
        }}
      </Query>
      )
    }
  };

export default MyAccount;