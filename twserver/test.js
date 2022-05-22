import TradingView from '@mathieuc/tradingview';

const client = new TradingView.Client({
  token: 'u0g29q1aazjckerih5zl5vtdr0yawkqz',
});

const chart = new client.Session.Chart();
chart.setMarket('BINANCE:LTCUSDT', {
	timeframe: '15',
  range: 10000,
});

TradingView.getPrivateIndicators('u0g29q1aazjckerih5zl5vtdr0yawkqz')
	.catch((e) => {
		console.error(e);
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
					// console.log('Plot values', indicator.periods);
					console.log('Strategy report', indicator.strategyReport);
				});
			}
		});
	});
