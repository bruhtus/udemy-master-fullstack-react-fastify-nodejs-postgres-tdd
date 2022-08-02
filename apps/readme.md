# Trial Backend API for the Course

## Prerequisite

This project use `pnpm` as the node package manager, so make sure that `pnpm`
already installed by running this command on our terminal if we are on unix
like operating system and using the POSIX compliant shell such as bash or zsh:
```sh
command -v pnpm
```

If there's an output after running those command, then we're ready to go. If
there's no output, then we can install `pnpm` using this your operating
system package manager or using [volta](https://volta.sh/).

After we make sure that `pnpm` installed, install the dependencies using this
command:
```sh
pnpm install
```

Other than `pnpm`, this project using `docker-compose` for the database. So
make sure the `docker-compose` installed with the same command like this:
```sh
command -v docker-compose
```

## Step to Setup The Project

Before we start the apps, we need to spin up the docker compose for our
database and do the migration. We can do that using this command:
```sh
pnpm check-in-dance
```

**Please keep in mind that command `pnpm check-in-dance` does not install the
dependencies, so make sure we already installed all the dependencies using
`pnpm install` command**.

and then we can start the apps using this command:
```sh
pnpm start
```

## Testing

To test the app, we can use this command:
```sh
pnpm test:app
```

To check the jest example test, run the specific test file like this:
```sh
pnpm test jest-example/jest-example-spyon.spec.js
```

> For the `jest-example/jest-order-execution.js`, change the filename to
> `jest-example/jest-order-execution.spec.js` and then run the test file like
> above.
