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
      <div className="postDiv">
        <div className="postImg">
          <img src={this.props.link.url} />
        </div>
        <div className="postInfo">
          <div className="postDescription">{this.props.link.description}</div>
          <div className="postBar">
            <div className="favDiv">
              <div className="heartDiv">
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
                      </div>
                    )}
                  </Mutation>
                )}
              </div>
              <div classNAme="postVotes">
                {this.props.link.votes.length} like | by{" "}
                {this.props.link.postedBy
                  ? this.props.link.postedBy.name
                  : "Unknown"}{" "}
              </div>
            </div>
            <div className="postCreated">
              {timeDifferenceForDate(this.props.link.createdAt)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
