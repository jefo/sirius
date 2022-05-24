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

let reports = {};

const strategies = {
	ltc: 'u0g29q1aazjckerih5zl5vtdr0yawkqz'
};

Object.keys(strategies).forEach((key) => {
	TradingView.getPrivateIndicators(strategies[key])
		.catch((e) => {
			console.error(e);
			res.sendStatus(400);
		})
		.finally(() => {
			console.log('completed');
		})
		.then((indicList) => {
			indicList.forEach(async (indic) => {
				if (indic.name === 'Technical Ratings DCA Bot Strategy v.1.2 LTC') {
					const str = await TradingView.getIndicator(indic.id);
					const indicator = new chart.Study(str);
					indicator.onReady(() => {
						console.log('Indicator', indic.name, 'loaded !');
					});
					indicator.onUpdate(() => {
						reports[key] = indicator.strategyReport;
						console.log(`Strategy ${key} is ready`);
					});
				}
			});
		});
});

router.get('/index', () => {
	console.log('index');
});

// todo: ANTISPAM PROTECTION BRUTFORCE ALARM!!!111
router.get('/:name', function(req, res, next) {
	if (!reports[req.params.name]) {
		res.status(400);
		res.send('Data not initialized yet. Trt later');
	} else {
		res.json(reports[req.params.name]);
	}
});

module.exports = router;
