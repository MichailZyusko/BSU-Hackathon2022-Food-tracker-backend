export default (description) => description
  .split(', ')
  .map((item) => ({
    name: item,
    quality: 0,
  }));
