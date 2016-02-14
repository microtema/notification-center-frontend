describe('simple test module', function(){
    it('should be true', function(){
        expect(true).toBe(true);
    });
    it('should not be true', function(){
        expect(false).not.toBe(true);
    })
});