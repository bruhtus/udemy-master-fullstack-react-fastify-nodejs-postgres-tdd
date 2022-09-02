describe('array contain object', () => {
  const array = [
    { name: 'Anu', gender: 'MALE' },
    { name: 'Itu', gender: 'FEMALE' },
    { name: 'Nganu', gender: 'FEMALE' },
    { name: 'Ngitu', gender: 'MALE' },
  ];

  const expected = [{ name: 'Ngitu', gender: 'MALE' }];

  const expectedTwo = [
    { name: 'Ngitu', gender: 'MALE' },
    { name: 'Nganu', gender: 'FEMALE' },
  ];

  const expectedThree = [
    { name: 'Ngitu', gender: 'MALE' },
    { name: 'Ngini', gender: 'MALE' },
  ];

  it('check if the expected array is a subset of received array', () => {
    expect(array).toEqual(expect.arrayContaining(expected));
    expect(array).toEqual(expect.arrayContaining(expectedTwo));
  });

  it('check if the expected array is not a subset of received array', () => {
    // if there is at least one object not a part of the received array,
    // the equal assertion will failed. that's why we use `not` in here.
    expect(array).not.toEqual(expect.arrayContaining(expectedThree));
  });
});
