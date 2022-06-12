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
})