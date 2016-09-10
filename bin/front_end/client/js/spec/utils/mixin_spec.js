import {module, inject} from 'angular-mocks';

describe('CollectionFilterConditions', function() {
  let mixin, target;

  beforeEach(module('adminfront', function($provide) {
    function MixinOne() {
      return {
        one: true
      };
    }

    function MixinTwo(mixin) {
      return {
        included() {
          mixin(this, 'MixinOne');
          this.two = true;
          this.age = 2;
        },
        greet() {
          return "greetings!";
        },
        yell() {
          return `${this.name}!!!`;
        }
      };
    }

    function MixinThree() {
      return {
        included(options={}) {
          this.three = true;
          this.age = 3;
          this.active = options.active;
        }
      };
    }

    function MixinFour() {
      return {
        included({id}) {
          this._id = id;
        },
        get id() {
          return this._id.trim();
        }
      };
    }
    $provide.factory('MixinOne', MixinOne);
    $provide.factory('MixinTwo', MixinTwo);
    $provide.factory('MixinThree', MixinThree);
    $provide.factory('MixinFour', MixinFour);
  }));

  beforeEach(inject(function(_mixin_) {
    mixin = _mixin_;
    target = {
      name: 'fred',
      greet() { return "hello"; }
    };
  }));

  it('applies mixin', function() {
    mixin(target, 'MixinOne');
    expect(target.one).toBe(true);
  });

  it('extends target with prototype', function() {
    mixin(target, 'MixinTwo');
    expect(target.greet()).toEqual('hello');
    expect(target.yell()).toEqual('fred!!!');
  });

  it('permits nesting mixins', function() {
    mixin(target, 'MixinTwo');
    expect(target.one).toBe(true);
    expect(target.age).toBe(2);
  });

  it('applies mixins in order', function() {
    mixin(target, 'MixinTwo');
    mixin(target, 'MixinThree');
    expect(target.age).toBe(3);
    expect(target.active).toBeUndefined();
  });

  it('passes options to mixins', function() {
    mixin(target, 'MixinThree', {active: true});
    expect(target.active).toBe(true);
  });

  it('copies properties', function() {
    mixin(target, 'MixinFour', {id: '  abc   '});
    expect(target.id).toEqual('abc');
  });

  describe("mixin.require", function() {
    it('blows up if a required mixin doesnt exist', function() {
      expect(() => mixin.require(target, 'MissingMixin')).toThrowError(/required/i);
    });

    it('succeeds if a required mixin is found', function() {
      mixin(target, 'MixinOne');
      expect(mixin.require(target, 'MixinOne')).toBe(true);
    });
  });
});
