export interface Instrument {
  instrumentId: string,
  name: string,
  symbol: string,
  type: string;
  uId:string;

}

export enum InstrumentTypes {
  CURRENCY = 'currency',
  INDICE = 'indice',
  ETF = 'etf',
  COMMODITY = 'commodity',
  EQUITIES = "equities"
}


const test = [{
  'instrumentId': 1,
  'name': 'Euro US Dollar',
  'symbol': 'EUR/USD',
  'instrumentType': 'currency',
}, {
  'instrumentId': 10,
  'name': 'Euro Swiss Franc',
  'symbol': 'EUR/CHF',
  'instrumentType': 'currency',
}, {
  'instrumentId': 9,
  'name': 'Euro JapaneseYen',
  'symbol': 'EUR/JPY',
  'instrumentType': 'currency',
}, {
  'instrumentId': 956731,
  'name': 'Investing.com EuroIndex',
  'symbol': 'inveur',
  'instrumentType': 'indice',
}, {
  'instrumentId': 2124,
  'name': 'US DollarEuro',
  'symbol': 'USD/EUR',
  'instrumentType': 'currency',
}, {
  'instrumentId': 976573,
  'name': 'Sygnia Itrix Euro Stoxx 50ETF',
  'symbol': 'SYGEUJ',
  'instrumentType': 'etf',
}, {
  'instrumentId': 997393,
  'name': 'NewWave EUR Currency Exchange TradedNote',
  'symbol': 'NEWEURJ',
  'instrumentType': 'etf',
}, {
  'instrumentId': 998227,
  'name': 'Diesel European GasoilFutures',
  'symbol': 'DSEL1c1',
  'instrumentType': 'commodity',
}, {
  'instrumentId': 175,
  'name': 'Euro Stoxx50',
  'symbol': 'STOXX50',
  'instrumentType': 'indice',
}, {
  'instrumentId': 15978,
  'name': 'Euronet WorldwideInc',
  'symbol': 'EEFT',
  'instrumentType': 'equities',
}, {
  'instrumentId': 6,
  'name': 'Euro BritishPound',
  'symbol': 'EUR/GBP',
  'instrumentType': 'currency',
}, {
  'instrumentId': 15,
  'name': 'Euro AustralianDollar',
  'symbol': 'EUR/AUD',
  'instrumentType': 'currency',
}, {
  'instrumentId': 16,
  'name': 'Euro CanadianDollar',
  'symbol': 'EUR/CAD',
  'instrumentType': 'currency',
}, {
  'instrumentId': 52,
  'name': 'Euro New ZealandDollar',
  'symbol': 'EUR/NZD',
  'instrumentType': 'currency',
}, {
  'instrumentId': 1487,
  'name': 'Australian Dollar Euro',
  'symbol': 'AUD/EUR',
  'instrumentType': 'currency',
}, { 'instrumentId': 1525, 'name': 'Canadian DollarEuro', 'symbol': 'CAD/EUR', 'instrumentType': 'currency' }];
