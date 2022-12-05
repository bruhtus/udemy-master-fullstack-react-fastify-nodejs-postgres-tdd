console.log('outside describe block');

describe('describe outer a', () => {
  console.log('describe outer a1');

  beforeAll(() => console.log('beforeAll outer a1'));
  afterAll(() => console.log('afterAll outer a1'));

  beforeEach(() => console.log('beforeEach outer a1'));
  afterEach(() => console.log('afterEach outer a1'));

  describe('describe inner 1', () => {
    console.log('describe inner 1');

    beforeAll(() => console.log('beforeAll inner 1'));
    afterAll(() => console.log('afterAll inner 1'));

    beforeEach(() => console.log('beforeEach inner 1'));
    afterEach(() => console.log('afterEach inner 1'));

    it('is test inner 1', () => console.log('test inner 1'));
  });

  console.log('describe outer a2');

  it('is test outer a1', () => console.log('test outer a1'));

  describe('describe inner 2', () => {
    console.log('describe inner 2');

    beforeAll(() => console.log('beforeAll inner 2'));
    afterAll(() => console.log('afterAll inner 2'));

    beforeEach(() => console.log('beforeEach inner 2'));
    afterEach(() => console.log('afterEach inner 2'));

    it('is test inner 2', () => console.log('test inner 2'));
  });

  console.log('describe outer a3');
});

describe('describe outer b', () => {
  console.log('describe out b1');

  beforeAll(() => console.log('beforeAll outer b1'));
  afterAll(() => console.log('afterAll outer b1'));

  beforeEach(() => console.log('beforeEach outer b1'));
  afterEach(() => console.log('afterEach outer b1'));

  it('is test outer b1', () => console.log('test outer a1'));
});
