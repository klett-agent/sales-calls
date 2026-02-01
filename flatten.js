const flattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + "_" : "";
    const value = obj[k];
    
    // Handle null and undefined explicitly
    if (value === null || value === undefined) {
      acc[pre + k] = null;
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      // If array is empty
      if (value.length === 0) {
        acc[pre + k] = null;
      }
      // If array contains objects, flatten each with index
      else if (typeof value[0] === "object" && value[0] !== null) {
        value.forEach((item, index) => {
          Object.assign(acc, flattenObject(item, `${pre}${k}_${index}`));
        });
      }
      // If array contains primitives, join as comma-separated string
      else {
        acc[pre + k] = value.join(", ");
      }
    }
    // Handle nested objects - flatten with underscore separator
    else if (typeof value === "object") {
      Object.assign(acc, flattenObject(value, pre + k));
    }
    // Handle primitives (string, number, boolean)
    else {
      acc[pre + k] = value;
    }
    
    return acc;
  }, {});
};

const items = $input.all();
const flattenedItems = items.map((item) => {
  const flattenedJson = flattenObject(item.json);
  return { json: flattenedJson };
});

return flattenedItems;
