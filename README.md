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
const { OnChainPay } = require('onchainpay-sdk');

const client = new OnChainPay('__PUBLIC_KEY__', '__PRIVATE_KEY__');
```

### Check signature

You can test your signature within this method.

```js
const checkSignature = await client.base.checkSignature();

if(!checkSignature.success) {
    console.error('Request error', checkSignature.error);
    
    process.exit(1);
}

if(!checkSignature.response.checkSignatureResult) {
    console.error('Signature incorrect', checkSignature.response.errors);

    process.exit(1);
}

console.log('Signature correct');
```

### Fetch available currencies

Get list of available currencies for depositing/withdrawing

```js
const availableCurrencies = await client.base.availableCurrencies();

if(!availableCurrencies.success) {
    console.error('Request error', availableCurrencies.error);

    process.exit(1);
}

for(const currency of availableCurrencies.response) {
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
const price = await client.base.priceRate('ETH', 'USDT');

if(!price.success) {
    console.error('Request error', price.error);

    process.exit(1);
}

console.log('Price', price.response);
```

### Get advanced balances info

Get info about advanced balance by its id

```js
const balance = await client.account.getBalance();

if(!balance.success) {
    console.error('Request error', balance.error);

    process.exit(1);
}

console.log(`[${balance.response.advancedBalanceId}] (${balance.response.currency}) \n\tAvalable for deposit: ${balance.response.availableCurrenciesForDeposit.join(', ')}`);
```

Or get list of advanced balances of user

```js
const balances = await client.account.getBalances();

if(!balances.success) {
    console.error('Request error', balances.error);

    process.exit(1);
}

for(const balance of balances.response) {
    console.log(`[${balance.advancedBalanceId}] (${balance.currency}) \n\tAvalable for deposit: ${balance.availableCurrenciesForDeposit.join(', ')}`);
}
```

### Create order

```js
const { OnChainPay } = require('onchainpay-sdk');

const client = new OnChainPay("__PUBLIC_KEY__", "__PRIVATE_KEY__");

const createOrder = async (currency, network, amount) => {
    const order = await client.order.makeOrder({
        currency: currency,
        network: network,
        amount: amount,
        order: 'Order #1234567',
        errorWebhook: 'https://merchant.domain/webhook-url',
        successWebhook: 'https://merchant.domain/webhook-url',
        returnUrl: 'https://merchant.domain',
        description: 'Buy some item',
    });
    
    if(!order.success) {
        throw new Error(order.error.message);
    }

    return order.response.link;
};

(async () => {
    // your code
    
    const orderLink = await createOrder("USDT", "tron", "1000")

    // your code
})();
```

### Auto-swap to external address

```js
const { OnChainPay } = require('onchainpay-sdk');

const client = new OnChainPay("__PUBLIC_KEY__", "__PRIVATE_KEY__");

const makeWithdrawal = async (currency, network, address, amount) => {
    const swap = await client.autoSwap.createAutoSwaps({
        address: address,
        currency: currency,
        network: network,
        amountTo: amount,
        webhookUrl: 'https://merchant.domain/webhook-url',
    });

    if(!swap.success) {
        throw new Error(swap.error.message);
    }

    return swap.id;
};

(async () => {
    // your code 
    
    const autoSwapId = await makeWithdrawal("USDT", "tron", "TUfVHn...DDC", "100")

    // your code 
})();
```
