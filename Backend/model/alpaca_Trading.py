from alpaca.trading.client import TradingClient
from alpaca.trading.requests import MarketOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce
import os
from dotenv import load_dotenv

load_dotenv()

trading_client = TradingClient(os.getenv('api_key'), os.getenv('secret'), paper=True)

market_order_data = MarketOrderRequest(
    symbol='SPY',
    qty=1,
    side=OrderSide.BUY,
    time_in_force=TimeInForce.DAY
)

market_order = trading_client.submit_order(
    order_data=market_order_data
)