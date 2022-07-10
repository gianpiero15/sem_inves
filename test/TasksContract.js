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
        const dealsCounter = await this.gunBounty.dealsCounter();
        const bounty = await this.gunBounty.gunBounty(dealsCounter+1);
    
        assert.equal(bounty.id.toNumber(), dealsCounter.toNumber());
        assert.equal(bounty.vendedor, "");
        assert.equal(bounty.dniVendedor, 0 );
      });
})