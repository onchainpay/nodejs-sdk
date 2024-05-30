# OnchainPay SDK

OnchainPay SDK is a comprehensive JavaScript library designed to streamline the integration of blockchain-based payment solutions into various applications. This SDK provides developers with the tools necessary to facilitate secure, transparent, and efficient transactions on supported blockchain networks.

Key Features:

- **Ease of Integration**: Simplifies the process of adding blockchain payment capabilities to your applications.
- **Security**: Ensures high-level security for all transactions using blockchain technology.
- **Transparency**: Leverages the transparency of blockchain networks to provide clear and verifiable transaction records.
- **Multi-Network Support**: Supports multiple blockchain networks, providing flexibility and scalability.

For detailed documentation, installation guides, and API references, please visit OnchainPay Documentation.

This package makes it easy [OnChainPay Api](https://docs.onchainpay.io/).

## Installation

`npm i onchainpay-sdk`

## Use

Go to your personal account
[https://ocp.onchainpay.io/api-keys](https://ocp.onchainpay.io/api-keys)
and get api-keys.

*Substitute keys in class call:*

```js
const OnChainPay = require('onchainpay-sdk');

const client = new OnChainPay('__PUBLIC_KEY__', '__PRIVATE_KEY__');
```

### Check signature

You can test your signature within this method.

```js
try {
    await client.base.checkSignature();
    
    console.log('Signature correct');
} catch (error) {
    console.error('Signature incorrect', error);
}
```

### Fetch available currencies

Get list of available currencies for depositing/withdrawing

```js
let availableCurrencies = [];

try {
    availableCurrencies = client.base.availableCurrencies();
} catch (error) {
    console.log('Request error', error);
}

for(const currency of availableCurrencies) {
    console.log(`${currency.currency} (${currency.alias}) = ${currency.priceUSD}`);

    if (currency.networks) {
        console.log('\tnetworks:');

        for (const network of currency.networks) {
            console.log(`\t\t ${network.name} (${network.alias})`);
        }
    }
}
```

### Get currencies price-rate

Get price rate from one currency to another


```js
try {
    const price = client.base.priceRate('ETH', 'USDT');
    
    console.log('Price', price);
} catch (error) {
    console.log('Request error', error);
}
```

### Get advanced balances info

Get info about advanced balance by its id

```js
let balance;

try {
    balance = client.account.getBalanceById(balanceId);
} catch (error) {
    console.log('Request error', error);
}

console.log(`[${balance.advancedBalanceId}] (${balance.currency}) \n\tAvalable for deposit: ${balance.availableCurrenciesForDeposit.join(', ')}`);
```

Or get list of advanced balances of user

```js
let balances = [];

try {
    balances = client.account.getBalances();
} catch (error) {
    console.log('Request error', error);
}

for(const balance of balances) {
    console.log(`[${balance.advancedBalanceId}] (${balance.currency}) \n\tAvalable for deposit: ${balance.availableCurrenciesForDeposit.join(', ')}`);
}
```

### Create order

```js
const OnChainPay = require('onchainpay-sdk');

(async () => {
    const orderLink = await createOrder("USDT", "tron", "1000")

    //
})();

const createOrder = async (currency, network, amount) => {
    const client = new OnChainPay("__PUBLIC_KEY__", "__PRIVATE_KEY__");

    const advancedBalances = await client.account.getBalances();

    const advancedBalance = advancedBalances[0];

    const order = await client.order.makeOrder({
        advancedBalanceId: advancedBalance.advancedBalanceId,
        currency: currency,
        network: network,
        amount: amount,
        order: 'Order #1234567',
        errorWebhook: 'https://merchant.domain/webhook-url',
        successWebhook: 'https://merchant.domain/webhook-url',
        returnUrl: 'https://merchant.domain',
        description: 'Buy some item',
    });

    return order.link;
};
```

### Auto-swap to external address

```js
const OnChainPay = require('onchainpay-sdk');

(async () => {
    const autoSwapId = await makeWithdrawal("USDT", "tron", "TUfVHn...DDC", "100")

    //
})();

const makeWithdrawal = async (currency, network, address, amount) => {
    const client = new OnChainPay("__PUBLIC_KEY__", "__PRIVATE_KEY__");

    const swap = await client.autoSwap.createAutoSwaps({
        address: address,
        currency: currency,
        network: network,
        amountTo: amount,
        webhookUrl: 'https://merchant.domain/webhook-url',
    });

    return swap.id;
};
```
