from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import time
import base64
import hmac
import hashlib
import json
from decouple import config

app = Flask(__name__)
CORS(app)

api_key = config('API_KEY')
api_secret = config('API_SECRET')
api_passphrase = config('API_PASSPHRASE')

base_path = 'https://api.exchange.coinbase.com'


@app.route("/trade_pairs")
def getAllProducts():
    #     timestamp = str(time.time())
    #     message = timestamp + 'GET' + '/products'
    #     signature = base64.b64encode(hmac.new(api_secret.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).digest())
    #     headers = {
    #         'CB-ACCESS-KEY': api_key,
    #         'CB-ACCESS-SIGN': signature,
    #         'CB-ACCESS-TIMESTAMP': timestamp,
    #         'CB-ACCESS-PASSPHRASE': api_passphrase,
    #         'Content-Type': 'application/json',
    #     }
    url = base_path + "/products"
    response = requests.get(url)
    if response.status_code == 200:
        products = json.loads(response.text)
        return jsonify(products)
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return 0


@app.route("/trade_pairs/stats")
def getProductStats():
    product_id = request.args.get('product_id')
    url = base_path + "/products/{}/stats".format(product_id)
    response = requests.get(url)
    if response.status_code == 200:
        products = json.loads(response.text)
        return jsonify(products)
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return 0


@app.route("/trade_pairs/candles")
def getProductCandle():
    product_id = request.args.get('product_id')
    granularity = int(request.args.get('granularity'))
    start = int(request.args.get('start'))
    end = int(request.args.get('end'))
    url = base_path + "/products/{}/candles".format(product_id)
    candles = []

    # Calculate the number of requests needed
    time_range = end - start
    # Number of data points expected
    data_points = int(time_range / granularity)
    max_data_points_per_request = 300

    num_requests = data_points // max_data_points_per_request + 1

    for i in range(num_requests):
        # Calculate the time range for this request
        request_start = start + i * max_data_points_per_request * granularity
        request_end = min(end, request_start +
                          max_data_points_per_request * granularity)

        params = {
            'granularity': granularity,
            'start': request_start,
            'end': request_end
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            new_candles = response.json()
            candles.extend(new_candles)
        else:
            print(f"Error: {response.status_code}, {response.text}")
            break

    return jsonify(candles)


@app.route("/")
def hello_world():
    return "Hello world!"
