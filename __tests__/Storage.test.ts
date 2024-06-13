import {storage, isJSON} from '../src/services/storage'; // Adjust the path

jest.mock('react-native-mmkv');

describe('storage module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set and get a string value', () => {
    storage.set('key1', 'value1');
    const value = storage.get('key1');
    expect(value).toBe('value1');
  });

  it('should set and get an object value', () => {
    const obj = {name: 'John', age: 30};
    storage.set('key2', obj);
    const value = storage.get('key2');
    expect(value).toEqual(obj);
  });

  it('should check if a key exists', () => {
    storage.set('key3', 'value3');
    const exists = storage.has('key3');
    expect(exists).toBe(true);
  });

  it('should delete a key', () => {
    storage.set('key4', 'value4');
    storage.delete('key4');
    const value = storage.get('key4');
    expect(value).toBeUndefined();
  });

  it('should delete all keys', () => {
    storage.set('key5', 'value5');
    storage.set('key6', 'value6');
    storage.deleteAll();
    expect(storage.get('key5')).toBeUndefined();
    expect(storage.get('key6')).toBeUndefined();
  });

  it('should set and get a value using setItem and getItem', async () => {
    await storage.setItem('key7', 'value7');
    const value = await storage.getItem('key7');
    expect(value).toBe('value7');
  });

  it('should remove an item using removeItem', async () => {
    await storage.setItem('key8', 'value8');
    await storage.removeItem('key8');
    const value = await storage.getItem('key8');
    expect(value).toBeUndefined();
  });

  it('should return true for valid JSON strings', () => {
    const jsonString = '{"name": "John", "age": 30}';
    expect(isJSON(jsonString)).toBe(true);
  });

  it('should return false for invalid JSON strings', () => {
    const invalidJsonString = '{"name": "John", "age": 30';
    expect(isJSON(invalidJsonString)).toBe(false);
  });
});
