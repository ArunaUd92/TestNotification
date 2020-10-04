import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';

import styles from './style';

//Component
import HEADER from "../../Utility/Component/Header";
import NOTIFICATION_CARD from "../../Utility/Component/NotificationCard";

//Action
import { getNotificationList } from '../../Action/notification';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      loading: false,
      isRefreshing: false,
      data: [],
      error: ''
    }
  }

  componentWillMount() {
    const { PUSH_NOTIFI_DATA } = this.props.navigation.state.params;
      if (PUSH_NOTIFI_DATA && PUSH_NOTIFI_DATA.news_id) {
        this.onPressNotificationItem(PUSH_NOTIFI_DATA)
      }

      this.getNotificationsData(this.page);
  }

  componentWillUnmount() {

  }

  async fetchNotification(isRefresh, page) {
    if (isRefresh) {
      this.setState({ isRefreshing: true });
    } else {
      this.setState({ loading: true });
    }

    const response = await getNotificationList(page).then(data => data)
    if (isRefresh) {
      let data = response
      this.setState({ isRefreshing: false, data: data })

    } else {
      let listData = [...this.state.data, ...response];
      this.setState({ loading: false, data: listData })

    }
  }

  getNotificationsData(page) {
    this.fetchNotification(false, page);
  }

  onRefresh() {
    this.fetchNotification(true, 1);
  }

  handleLoadMore = () => {
    if (!this.state.loading) {
      this.page = this.page + 1;
      this.getNotificationsData(this.page);
    }
  };

  onPressNotificationItem = (item) => {
    Alert.alert(
      item.news_id,
      item.name,
      [
        { text: "OK", onPress: () => {} }
      ],
      { cancelable: false }
    );
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator />
    );
  };

  renderSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    );
  };

  renderNotificationFlatListItem({ item, index }) {
    return (
      <NOTIFICATION_CARD KEY={index} NOTIFICATION={item} onPress={() => this.onPressNotificationItem(item)} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <HEADER />
        <View style={styles.centerContainer}>
          <FlatList
            style={styles.list}
            data={this.state.data}
            extraData={this.state}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            renderItem={this.renderNotificationFlatListItem.bind(this)}
            keyExtractor={(item, news_id) => `"id"${news_id}`}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter.bind(this)}
            onEndReachedThreshold={0.4}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        </View>
      </View>
    );
  }

}

export default App;