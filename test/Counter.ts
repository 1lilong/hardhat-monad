import { expect } from "chai";
import hre from "hardhat";

describe("Counter", function () {
  it("starts at zero", async function () {
    const counter = await hre.viem.deployContract("Counter");

    expect(await counter.read.x()).to.equal(0n);
  });

  it("increments by one and emits Increment", async function () {
    const counter = await hre.viem.deployContract("Counter");
    const publicClient = await hre.viem.getPublicClient();

    const hash = await counter.write.inc();
    await publicClient.waitForTransactionReceipt({ hash });

    expect(await counter.read.x()).to.equal(1n);

    const events = await publicClient.getContractEvents({
      address: counter.address,
      abi: counter.abi,
      eventName: "Increment",
    });

    expect(events).to.have.length(1);
    expect(events[0].args.by).to.equal(1n);
  });
});
