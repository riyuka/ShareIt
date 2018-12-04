import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FEED_QUERY } from "./LinkList";
import { LINKS_PER_PAGE } from "../constants";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost($caption: String!, $imgUrl: String!) {
    createPost(caption: $caption, imgUrl: $imgUrl) {
      _id
      caption
      imgUrl
      author {
        name
      }
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: "",
    url: ""
  };

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/new/1")}
          update={(store, { data: { post } }) => {
            const first = LINKS_PER_PAGE;
            const skip = 0;
            const orderBy = "createdAt_DESC";
            const data = store.readQuery({
              query: FEED_QUERY,
              variables: { first, skip, orderBy }
            });
            data.feed.links.unshift(post);
            store.writeQuery({
              query: FEED_QUERY,
              data,
              variables: { first, skip, orderBy }
            });
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

// class CreatePost extends Component {
//   state = {
//     caption: "",
//     image: null,
//     imgUrl: null
//   };

//   pickImage = async cb => {
//     await this.askPermissionsAsync();
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       base64: true
//     });

//     if (!result.cancelled) {
//       this.setState({ image: result.uri });

//       let base64Img = `data:image/jpg;base64,${result.base64}`;

//       //Add your cloud name
//       let apiUrl = "https://api.cloudinary.com/v1_1/duuyxqnfi/image/upload";

//       let data = {
//         file: base64Img,
//         upload_preset: "lhqpcomz"
//       };

//       fetch(apiUrl, {
//         body: JSON.stringify(data),
//         headers: {
//           "content-type": "application/json"
//         },
//         method: "POST"
//       })
//         .then(async r => {
//           let data = await r.json();
//           console.log(data.secure_url);
//           let imgUrl = data.secure_url;
//           cb(this.setState({ imgUrl }));
//         })
//         .catch(err => console.log(err));
//     }
//   };

//   render() {
//     const { caption, imgUrl } = this.state;
//     return (
//       <Mutation mutation={CREATE_POST}>

//       </Mutation>
//     );
//   }
// }

export default CreateLink;
