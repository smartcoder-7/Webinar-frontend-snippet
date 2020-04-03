const tz = require('./tz.json');

const timeZones = [{ text: 'Local timezone of registrant', value: 'client', key: 'client' }].concat(
  Object.keys(tz).map((k: any) => {
    return { value: k, text: tz[k], key: k };
  })
);

export default timeZones;
