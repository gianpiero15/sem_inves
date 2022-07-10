const GunsContract = artifacts.require('GunsContract');
contract("GunsContract",()=>{
    before(async()=>{
        this.gunBounty = await GunsContract.deployed()
    })
    it('migrate deployed successfully',async()=>{
        const address =await this.gunBounty.address
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it("get GunsContract", async () => {
        const tasksCounter = await this.GunsContract.dealsCounter();
        const task = await this.GunsContract.gunBounty(tasksCounter);
    
        assert.equal(task.id.toNumber(), tasksCounter.toNumber());
        assert.equal(task.title, "my first task");
        assert.equal(task.description, "my first description");
        assert.equal(task.done, false);
        assert.equal(tasksCounter, 1);
      });
})