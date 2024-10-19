import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const arr = [1, 2];
    const res = generateLinkedList(arr);
    const obj = {
      value: 1,
      next: {
        value: 2,
        next: {
          next: null,
          value: null,
        },
      },
    };
    expect(res).toStrictEqual(obj);
  });

  test('should generate linked list from values 2', () => {
    const arr = [1, 2, 3];
    const res = generateLinkedList(arr);
    expect(res).toMatchSnapshot();
  });
});
