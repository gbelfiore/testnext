const addIncrementalPositionIdOnProducts = (sa: any) => {
  let position = 0;

  for (let i = 0; i < sa.sections.length; i++) {
    const section = sa.sections[i];
    for (let k = 0; k < section.products?.length; k++) {
      const product = section.products[k];
      product.position = position++;
    }
  }

  return sa;
};

export { addIncrementalPositionIdOnProducts };
