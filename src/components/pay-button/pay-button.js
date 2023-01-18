Component({
  properties: {
    mode: Number,
    goodsId: {
      type: String,
      value: "",
    },
  },
  data: {},

  methods: {
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
    },

    onError(e) {
      console.log(e.detail);
      const { errNo, errMsg } = e.detail;
      console.log("errNo", errNo, "errMsg", errMsg);
      if (errNo === 21514) {
        tt.showToast({
          title: "失败", // 内容
          icon: "none", // 图标
        });
      } else if (errNo === 21513) {
        tt.showToast({
          title: "获取中", // 内容
          icon: "none", // 图标
        });
      }
    },

    onPay(options) {
      const { status, orderId, outOrderNo, result } = options.detail;
      console.log("onPay", status, orderId, outOrderNo, result);
      tt.navigateBack();
    },

    handleRefund(event) {
      const { status, result } = event.detail;
      if (status === 'success') {
        const { refundId, outRefundNo } = result;
        console.log('发起退款成功', refundId, outRefundNo);
      } else {
        const { errMsg } = result;
        console.log('发起退款失败', errMsg);
      }
    },

    userLogin(event) {
      console.log("place order", event);
      return new Promise((resolve) => {
        tt.login({
          success() {
            tt.getUserInfo({
              success(res) {
                console.log("login success", res);
                resolve();
              },
              fail(res) {
                console.log("fail", res);
                tt.openSetting({
                  success: (res) => {
                    console.log("打开设置页面成功: ", res.errMsg);
                  },
                  fail: (res) => {
                    console.log("打开设置页面失败: ", res.errMsg);
                  },
                  complete: (res) => {
                    console.log("接口已调用: ", res.errMsg);
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
    },
  },
});
