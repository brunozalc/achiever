# achiever

## Description

Complete game achievements and earn tokens.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.j, npm and/or pnpm](https://nodejs.org/en/download/).
- You have installed [Truffle](https://www.trufflesuite.com/truffle) globally. If not, install it using `npm install -g truffle`.
- You have installed [Ganache](https://www.trufflesuite.com/ganache) for a personal blockchain for Ethereum development.

## Running the Project Locally

Follow these steps to get up and running:

### Clone the repository

First, clone this repository to your local machine using `git`:

```sh
git clone <repository_url>
```

### Install the dependencies

Navigate to the project directory and install all of the dependencies:

```sh
cd <project_directory>
npm install
```

### Start Ganache

Start your Ganache. You can use the Ganache GUI or the Ganache CLI:

```sh
ganache
```

### Compile and migrate the smart contracts

Next, use truffle to compile and migrate your contracts to the Ganache network

```sh
truffle compile
truffle migrate --network development
```

### Start the development server

Finally, start the development server:

```sh
npm install -g pnpm
pnpm i
pnpm dev
```
