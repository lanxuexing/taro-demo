import { Component } from "react";
import "./app.css";

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 挂载配置主题色 && 获取手机号的方法
  taroGlobalData = {
    /**
     * desc: 主题色配置
     * borderRadius：按钮圆角大小，默认 8rpx
     * backgroundColor：按钮背景色 + 退款原因选中背景色，默认 #FE2C55
     * fontColor：按钮字体颜色，默认 #ffffff
     */
    getThemeConfig() {
      return {
        borderRadius: "50rpx", // string
        backgroundColor: "black", // string
        fontColor: "#ffffff", // string
      };
    },

    /**
     * desc: 获取手机号
     * params：加密数据
     * success：成功回调
     * fail： 失败回调
     */
    getPhoneNumber({ params, success, fail }) {
      const { iv, encryptedData } = params;
      console.log(iv, encryptedData);
      // ...
      // 开发者服务端解密 encryptedData，得到手机号
      // ...
      const result = {
        phoneNumber: "13343421318",
      };
      // 回调交易模版
      success(result);
    },
  };

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
