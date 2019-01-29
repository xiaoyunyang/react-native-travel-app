import React from 'react';
import {
  View,
  TouchableHighlight,
  ListView,
  Modal,
  StyleSheet,
  Text,
} from 'react-native';
import Post from '../components/Post';
import CreatePage from '../components/CreatePage';

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
    const { allPosts } = props.screenProps.allPostsQuery;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(allPosts),
      allPosts,
      modalVisible: false,
      user: undefined,
    };
  }


  componentWillReceiveProps(nextProps) {
    const nextAllPostsQuery = nextProps.screenProps.allPostsQuery;
    console.log('.....yayayayaya nextAllPostsQuery', nextAllPostsQuery);

    if (!nextAllPostsQuery.loading && !nextAllPostsQuery.error) {
      this.setState({
        allPosts: nextAllPostsQuery.allPosts,
      });
    }
  }

  _createPost = () => {
    // this.props.router.push('/create');
    this.setState({ modalVisible: true });
  }

  render() {
    console.log('listScreen props', this.props);
    console.log('listScreen listView state.dataSource', this.state.allPosts);
    const { allPostsQuery } = this.props.screenProps;

    if (allPostsQuery.loading) {
      return (<Text>Loading</Text>);
    }

    return (
      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <CreatePage
            onComplete={() => {
              allPostsQuery.refetch();
              this.setState({ modalVisible: false });
            }}
          />
        </Modal>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={post => (
            <Post
              description={post.description}
              imageUrl={post.imageUrl}
            />
          )}
        />
        <TouchableHighlight
          style={styles.createPostButtonContainer}
          onPress={this._createPost}
        >
          <Text style={styles.createPostButton}>Create Post</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  createPostButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostButton: {
    backgroundColor: 'rgba(39,174,96,1)',
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    height: 60,
    width: 480,
    paddingTop: 18,
  },
});
