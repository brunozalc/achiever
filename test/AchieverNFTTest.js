const AchieverNFT = artifacts.require("AchieverNFT");

contract("AchieverNFT", (accounts) => {
  let contractInstance;
  const taxAmount = web3.utils.toWei("0.01", "ether");
  const gameId = 1;
  const description = "First Challenge";
  const difficulty = 3;
  const validPastTimestamp = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

  before(async () => {
    contractInstance = await AchieverNFT.new(taxAmount);
  });

  it("should mint a new NFT", async () => {
    const receipt = await contractInstance.mint(
      accounts[0],
      gameId,
      description,
      difficulty,
      validPastTimestamp,
      { from: accounts[0], value: taxAmount }
    );

    let eventEmitted = false;
    for (let i = 0; i < receipt.logs.length; i++) {
      if (receipt.logs[i].event === "GameChallengeMinted") {
        eventEmitted = true;
        break;
      }
    }

    assert.isTrue(eventEmitted, "GameChallengeMinted event should be emitted");
    const gameChallenge = await contractInstance.gameChallenges(0);
    assert.equal(gameChallenge.gameId, gameId, "Game ID should match");
    assert.equal(
      gameChallenge.description,
      description,
      "Description should match"
    );
    assert.equal(
      gameChallenge.difficulty,
      difficulty,
      "Difficulty should match"
    );
    assert.equal(
      gameChallenge.completionTimestamp.toNumber(),
      validPastTimestamp,
      "Completion timestamp should match"
    );
  });

  it("should allow owner to change the tax amount", async () => {
    const newTaxAmount = web3.utils.toWei("0.02", "ether");
    await contractInstance.setTaxAmount(newTaxAmount, { from: accounts[0] });
    const updatedTaxAmount = await contractInstance.taxAmount();
    assert.equal(
      updatedTaxAmount.toString(),
      newTaxAmount,
      "Tax amount should be updated"
    );
  });

  it("should fail to mint if not enough Ether is sent", async () => {
    const insufficientAmount = web3.utils.toWei("0.005", "ether");
    try {
      await contractInstance.mint(
        accounts[0],
        gameId,
        description,
        difficulty,
        validPastTimestamp,
        { from: accounts[0], value: insufficientAmount }
      );
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(
        err.message,
        "AchieverNFT: Not enough Ether provided.",
        "The error message should contain 'Not enough Ether provided.'"
      );
    }
  });

  it("should fail to mint if the description is empty", async () => {
    const currentTaxAmount = await contractInstance.taxAmount();
    try {
      await contractInstance.mint(
        accounts[0],
        gameId,
        "",
        difficulty,
        validPastTimestamp,
        { from: accounts[0], value: currentTaxAmount }
      );
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(
        err.message,
        "AchieverNFT: Description cannot be empty.",
        "The error message should contain 'Description cannot be empty.'"
      );
    }
  });

  it("should fail to mint if completion timestamp is too old", async () => {
    const currentTaxAmount = await contractInstance.taxAmount();
    const oneYearInSeconds = 365 * 24 * 60 * 60;
    const tooOldTimestamp =
      Math.floor(Date.now() / 1000) - oneYearInSeconds - 1000; // More than 365 days in the past

    try {
      await contractInstance.mint(
        accounts[0],
        gameId,
        description,
        difficulty,
        tooOldTimestamp,
        { from: accounts[0], value: currentTaxAmount }
      );
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(
        err.message,
        "Completion timestamp is too old",
        "The error message should contain 'Completion timestamp is too old.'"
      );
    }
  });
});
