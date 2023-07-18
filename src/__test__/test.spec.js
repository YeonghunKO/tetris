function add(a,b) {
    return a+b
}

describe('test jest', () => { 
   test('add number', () => { 
    expect(add(1,2)).toBe(3)
    })
 })