# Env Var Defaults

[![Build Status](https://travis-ci.org/Wiredcraft/env-var-defaults.svg?branch=master)](https://travis-ci.org/Wiredcraft/env-var-defaults) [![Coverage Status](https://coveralls.io/repos/github/Wiredcraft/env-var-defaults/badge.svg?branch=master)](https://coveralls.io/github/Wiredcraft/env-var-defaults?branch=master)

Give the env-var module different default values per current NODE_ENV. Can be also used independently.

## Why

First of all, there's a rule of thumb:

> Variables explicitly set in the environment [always have final say](https://12factor.net/config).

We often use a great module, [env-var](https://www.npmjs.com/package/env-var), to read the environment variables and parse them, and if a variable is missing we can set a default value for it.

Sometimes we want to have environment specific **defaults**, which shouldn't override the environment variables but shouldn't be overridden by the default value either. This can lead to confusion as which override which and when to set default values etc.

## How

```js
// Require.
const { builder, injected } = require('env-var-defaults');

// The injected/augmented env-var.
const env = injected();

// Use it, and give it a list of default values.
const logStream = env.get('LOG_STREAM', ['debug', 'debug', 'syslog', 'syslog']).asString();
```

### The "builder"

The `builder` is the base, and can be used independently. When invoked, it can give you a getter function:

```js
const defaults = builder([envList, [envName]]);
```

- `envList` is the list of ENV values, default to `['test', 'development', 'staging', 'production']`.
- `envName` is default to `NODE_ENV`.

Now you can use the function to get a value corresponding to the current ENV.

```js
const value = defaults(['valueA', 'valueB', 'valueC', 'valueD']);
```

- For example, with the default `envList`, and the ENV `development`, the `value` will be `valueB`.
- Note that the ENV is used at build-time (when you run `builder()`), and not at run-time.

If you give the `builder` an env list:

```js
const defaults = builder(['test', 'development', 'integration', 'staging', 'production']);
```

Then you must give the `defaults` a list of default values matches to it:

```js
const value = defaults(['valueA', 'valueB', 'valueC', 'valueD', 'valueE']);
```

- For example, with the ENV `integration`, the `value` will be `valueC`.

### The "injected" 

The `injected` can give you an augmented `env-var`:

```js
const env = injected([envList, [envName]]);
```

- It accepts the same arguments with `builder`.
- It returns what `env-var` would give you with just the `get()` function augmented.

And you use it like the initial example:

```js
const logStream = env.get('LOG_STREAM', ['debug', 'debug', 'syslog', 'syslog']).asString();
```

You can also use it in the original way, if you have just one default value:

```js
const logStream = env.get('LOG_STREAM', 'debug').asString();
```
