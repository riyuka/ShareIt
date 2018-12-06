import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Icon from "@material-ui/core/Icon";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
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
`;

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="card">
        
          <img className="card-img-top" src={this.props.link.url} />
        
        <div className="card-body">
          <div className="card-title">{this.props.link.description}</div>
          <div className="card-text">
            <div className="favDiv">
              <div className="heartDiv">

                <div classNAme="postVotes">
                 by{" "}
                {this.props.link.postedBy
                  ? this.props.link.postedBy.name
                  : "Unknown"}{" "} | {this.props.link.votes.length} like
              </div>

                {authToken && (
                  <Mutation
                    mutation={VOTE_MUTATION}
                    variables={{ linkId: this.props.link.id }}
                    update={(store, { data: { vote } }) =>
                      this.props.updateStoreAfterVote(
                        store,
                        vote,
                        this.props.link.id
                      )
                    }
                  >
                    {voteMutation => (
                      <div className="heart" onClick={voteMutation}>
                        <Icon className="material-icons">favorite</Icon>
                        like
                      </div>
                    )}
                  </Mutation>
                )}
              </div>
            </div>
            <div className="postCreated">
              <small class="text-muted">
              {timeDifferenceForDate(this.props.link.createdAt)}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
