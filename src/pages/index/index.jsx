import { PayButton, Text, View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { Component } from "react";
import "./index.css";

export default class Index extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getGoodsInfo(goodsId) {
    return new Promise((resolve) => {
      console.log("user goodsId", goodsId);
      resolve({
        currentPrice: 1,
        minLimits: 2,
        maxLimits: 10,
        dateRule: "",
        goodsName: "循礼门M+丨【释集烤肉】99元  原价206.4元超值套餐",
        goodsPhoto:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.ibaotu.com%2Fgif%2F19%2F48%2F47%2F76Z888piCd6W.gif%21fwpaa50%2Ffw%2F700&refer=http%3A%2F%2Fpic.ibaotu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644654365&t=5fc9b5fdad0a16264a9a9c09c14b3af9",
        goodsLabels: [
          { type: "REFUND_ANYTIME" },
          { type: "BOOK_IN_ADVANCE", value: 98 },
        ],
        extra: { test: 123 },
      });
    });
  }

  onError(e) {
    console.log(e.detail);
    const { errNo, errMsg } = e.detail;
    console.log("errNo", errNo, "errMsg", errMsg);
    if (errNo === 21514) {
      Taro.showToast({
        title: "失败", // 内容
        icon: "none", // 图标
      });
    } else if (errNo === 21513) {
      Taro.showToast({
        title: "获取中", // 内容
        icon: "none", // 图标
      });
    }
  }

  onPay(options) {
    const { status, orderId, outOrderNo, result } = options.detail;
    console.log("onPay", status, orderId, outOrderNo, result);
    Taro.navigateBack();
  }

  handleRefund(event) {
    const { status, result } = event.detail;
    if (status === 'success') {
      const { refundId, outRefundNo } = result;
      console.log('发起退款成功', refundId, outRefundNo);
    } else {
      const { errMsg } = result;
      console.log('发起退款失败', errMsg);
    }
  }

  userLogin(event) {
    console.log("place order", event);
    return new Promise((resolve) => {
      Taro.login({
        success() {
          Taro.getUserInfo({
            success(res) {
              console.log("login success", res);
              resolve();
            },
            fail(res) {
              console.log("fail", res);
              Taro.openSetting({
                success: (res2) => {
                  console.log("打开设置页面成功: ", res2.errMsg);
                },
                fail: (res2) => {
                  console.log("打开设置页面失败: ", res2.errMsg);
                },
                complete: (res2) => {
                  console.log("接口已调用: ", res2.errMsg);
                },
              });
            },
          });
        },
        // setTimeout(() => {
        //   resolve();
        // }, 0);
      });
    });
  }

  render() {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        {/* ✅正常：这个是自己封装的字节的pay-button组件，可以正常唤起 */}
        {/* <zijie-pay-button goodsId='12345'></zijie-pay-button> */}

        {/* ❌错误：这个是Taro官方在3.5.7之后说已经支持了pay-button组件之后，不好使，报错 */}
        <PayButton
          goodsId='12345'
          mode={2}
          goodsType={2}
          onGetgoodsinfo={this.getGoodsInfo}
          onPlaceOrder={this.userLogin}
          onPay={this.onPay}
          onError={this.onError}
        />
      </View>
    );
  }
}
