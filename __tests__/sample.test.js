// Sample test file to verify Jest is working
describe('Sample Tests', () => {
  test('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should test string operations', () => {
    const greeting = 'Hello World';
    expect(greeting).toContain('World');
    expect(greeting.length).toBe(11);
  });

  test('should test array operations', () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits).toHaveLength(3);
    expect(fruits).toContain('banana');
  });
});
