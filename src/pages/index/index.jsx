import { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.css";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
        <zijie-pay-button goodsId="12345"></zijie-pay-button>
      </View>
    );
  }
}
