
export function mixin(...properties){
  properties = Object.assign({}, ...properties);

  const keys = Object.getOwnPropertyNames(properties)
                .concat(Object.getOwnPropertySymbols(properties));

  return function({__proto__}){
    keys.forEach(key => {
      const property = properties[key];
      if (typeof property === 'function') {
        __proto__[key] = function (...p) {
          return property.apply(this, p);
        }
        return;
      }

      __proto__[key] = property;
    });
  }
}

export function mixinSafe(...properties) {
  properties = Object.assign({}, ...properties);

  const keys = Object.getOwnPropertyNames(properties)
    .concat(Object.getOwnPropertySymbols(properties));

  return function({__proto__}){
    keys.forEach(key => {
      if (key in __proto__) return;

      const property = properties[key];


      if (typeof property === 'function') {
        __proto__[key] = function (...p) {
          return property.apply(this, p);
        }
        return;
      }

      __proto__[key] = property;
    });
  }

}
