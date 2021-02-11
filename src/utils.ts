export const isEmptyObject = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const isSSR = typeof window === 'undefined';

/**
 * Removes object entries where the value equals to `undefined`
 *
 * @param obj The object to remove undefined values
 */
export const removeUndefined = (obj: any) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeUndefined(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

/**
 * Transform snake cased value to camel case
 *
 * @param value The camel case value
 */
const transformSnakeToCamelCase = (value: string) => {
  return value.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

/**
 * Transform camel cased value to snake case
 *
 * @param value The camel case value
 */
const transformCamelToSnakeCase = (value: string) => {
  return value.replace(
    /[A-Z]/g,
    (letter: string) => `_${letter.toLowerCase()}`,
  );
};

const isObject = (object: object) => {
  return (
    object === Object(object) &&
    !Array.isArray(object) &&
    typeof object !== 'function'
  );
};

/**
 * Transform an object with snake cased keys to an object with camel case keys
 *
 * @param object The camel case keys object
 */
export const transformSnakeObjectToCamelCase = (
  object: Record<string, string | number | object | any>,
): Record<string, any> => {
  if (isObject(object)) {
    const n: Record<string, any> = {};

    Object.keys(object).forEach(key => {
      n[transformSnakeToCamelCase(key)] = transformSnakeObjectToCamelCase(
        // @ts-ignore
        object[key],
      );
    });

    return n;
  } else if (Array.isArray(object)) {
    return object.map(i => {
      return transformSnakeObjectToCamelCase(i);
    });
  }

  return object;
};

/**
 * Transform an object with camel case keys to an object with snake case keys
 *
 * @param object The camel case keys object
 */
export const transformCamelObjectToSnakeCaseObject = (
  object: Record<string, any>,
): Record<string, any> => {
  if (isObject(object)) {
    const normalized: Record<string, any> = {};

    Object.keys(object).forEach(key => {
      if (key === 'customAttributes') {
        Object.keys(object[key]).forEach(k => {
          normalized[k] = object[key][k];
        });
      }
      normalized[
        transformCamelToSnakeCase(key)
      ] = transformCamelObjectToSnakeCaseObject(
        // @ts-ignore
        object[key],
      );
    });

    return normalized;
  } else if (Array.isArray(object)) {
    return object.map(i => {
      return transformCamelObjectToSnakeCaseObject(i);
    });
  }

  return object;
};
