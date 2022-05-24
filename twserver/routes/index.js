var express = require('express');
var router = express.Router();
const TradingView = require('@mathieuc/tradingview');

const client = new TradingView.Client({
	token: 'u0g29q1aazjckerih5zl5vtdr0yawkqz'
});

const chart = new client.Session.Chart();
chart.setMarket('BINANCE:LTCUSDT', {
	timeframe: '15',
	range: 10000
});

let strategyReport = null;

const strategies = {
	ltc: 'u0g29q1aazjckerih5zl5vtdr0yawkqz'
};

router.get('/index', () => {
	console.log('index');
});

router.get('/:name', function(req, res, next) {
  console.log('loading', req.params.name);
	TradingView.getPrivateIndicators(strategies[req.params.name])
		.catch((e) => {
			console.error(e);
			res.sendStatus(400);
		})
		.finally(() => {
			console.log('completed');
		})
		.then((indicList) => {
			indicList.forEach(async (indic) => {
				// console.log('Loading indicator', indic);
				if (indic.name === 'Technical Ratings DCA Bot Strategy v.1.2 LTC') {
					const str = await TradingView.getIndicator(indic.id);
					const indicator = new chart.Study(str);
					indicator.onReady(() => {
						console.log('Indicator', indic.name, 'loaded !');
					});
					indicator.onUpdate(() => {
						strategyReport = indicator.strategyReport;
						// console.log('Plot values', indicator.periods);
            res.json(strategyReport);
					});
				}
			});
		});
});

module.exports = router;
