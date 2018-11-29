module.exports = {
    'env': {
        'browser': true,
    },
    'extends': [
        'airbnb'
    ],
    "rules": {
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement", "BinaryExpression[operator='in']"],
        "brace-style": ["error", "stroustrup", { "allowSingleLine": true }]
    }
};