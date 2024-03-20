# Konyagi - task runner

Task runner. Built with file (markdown document) processing in mind.

## Programatic usage

```bash
npm i konyagi
```

See [example/index.ts](example/index.ts)

Typescript usage examples in [example/utils/types.ts](example/utils/types.ts) and [example/tasks/md-html.ts](example/tasks/md-html.ts)

## cli usage

```bash
$ npm install -g konyagi
$ konyagi --help

$ konyagi [task directory] [first task] [--state-file]
$ konyagi ./tasks start --state-file state.json

# or with tasks written in typescript via tsx (included as dep)
NODE_OPTIONS='--import tsx' konyagi [task directory] [first task] [--state-file]
```

---

## Developing

```bash
npm install

npm run dev

npm run build

# Publish
npm run push

# Testing

cd example

npm install
npm test

# test cli build
npm run build && NODE_ENV=development npx tsx src/cli.ts example/tasks load-docs
```

## Konyagi

In another chapter of my life, I worked as a control system engineer. The first machine I programmed was a production line in [South Sudan](https://en.wikipedia.org/wiki/Southern_Sudan_Beverages_Limited) that bottled alcoholic spirits.

The last spirit to run through the production cycle was a gin product called Konyagi.

The name felt fitting as this is a "production line" of tasks and jobs that are run.
