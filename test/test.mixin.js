
import { expect } from 'chai';

import { mixin, mixinSafe } from "../src"


const AF = Symbol('AF');

const helloWorld = {
  hello(){
    return "hello world"
  }
}

const hiWorld = {
  hello(){
    return "hi world"
  }
}

const byeWorld = {
  bye(){
    return "bye world"
  }
}

const callbackWorld = {
  callback(fn){
    fn()
  }
}

const callback2World = {
  callback(fn){
    fn()
  }
}

const whyWorld = { 
  [AF]() { 
    return "AF";
  }
}


// mixin
describe('mixin', function(){

  it('should mix a function with a symbol for a name into a class',
    () => {

    @mixin(whyWorld)
    class TestClass{
      world() {}
    }

    const instance = new TestClass();
    expect(typeof instance[AF]).to.equal('function');
    expect(instance[AF]()).to.equal('AF');
  });

  it('should mix a function with a string for a name into a class',
    () => {

    @mixin(helloWorld)
    class TestClass{}

    const instance = new TestClass();
    expect(typeof instance.hello).to.equal('function');
    expect(instance.hello()).to.equal('hello world');

  });

  it(`should allow multiple mixins to be applied if none of the method names
      are the same`,
    () => {
    @mixin(helloWorld)
    @mixin(byeWorld)
    class TestClass{}

    var instance = new TestClass();

    expect(instance.hello()).to.equal(helloWorld.hello());
    expect(instance.bye()).to.equal(byeWorld.bye());


    @mixin(helloWorld, byeWorld)
    class TestClass2{}

    var instance2 = new TestClass2();
    expect(instance2.hello()).to.equal(helloWorld.hello());
    expect(instance2.bye()).to.equal(byeWorld.bye())

  });

  it(`mixed in methods should affect variables outside their scope from callbacks`,
    () => {

    @mixin(callbackWorld)
    class TestClass{}

    const instance = new TestClass();
    let x = 0;

    instance.callback(function (){
      x++
    });

    expect(x).to.equal(1);

    @mixin(callbackWorld, callback2World)
    class TestClass2{}

    var instance2 = new TestClass2()

    instance2.callback(function(){
      x++
    });

    expect(x).to.equal(2);
  });


});
