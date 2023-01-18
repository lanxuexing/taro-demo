// 配置交易系统插件页面
const ttPluginPages = [
  "ext://microapp-trade-plugin/order-confirm",
  "ext://microapp-trade-plugin/refund-apply",
  "ext://microapp-trade-plugin/refund-detail",
];

module.exports = (ctx) => {
  ctx.modifyBuildAssets(({ assets }) => {
    const appJsonStr = assets["app.json"].source();
    const appJsonParse = JSON.parse(appJsonStr);
    appJsonParse.pages = [...appJsonParse.pages, ...ttPluginPages];
    const newAppJsonParse = JSON.stringify(appJsonParse, null, 2);
    assets["app.json"] = {
      size: () => newAppJsonParse.length,
      source: () => newAppJsonParse
    }
  });
};


