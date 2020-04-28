// Unit testing frameworks
// Mocha Asynchronous (async/await)
const { expect } = require('chai')

describe('Suite Name', function() {
    describe('#method()', function() {
        it('should run without an error', async function(){
            const result = await answerToTheUltimateQuestion()
            expect(result).to.be.equal(42)
        })
    })
})


// Mocha synchronous
describe('Suite Name', function(){
    describe('#method()', function() {
        it('should run without an error', function(){
            expect([1, 2, 3].length).to.be.equal(3)
        })
    })
})


// Mocha asynchronous (callback)
const expect = require('chai').expect;

describe('Suite Name', function(){
    describe('#method()', function(){
        it('should run without an error', function(done){
            testSomething(err => {
                expect(err).to.not.be.equal(null)
                done()
            })
        })
    })
})