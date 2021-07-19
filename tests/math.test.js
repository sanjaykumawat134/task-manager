const {
  calculateTip,
  celsiusToFarenheights,
  farenheightToCelsius,
} = require("../src/math");

test("should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
  // if(total!==13){
  //     throw new Error('Total tip should be 13. Got'+total)
  // }
});

test("Should convert 32 F to 0 C", () => {
  const cTemp = farenheightToCelsius(32);
  expect(cTemp).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const fTemp = celsiusToFarenheights(0);
  expect(fTemp).toBe(32);
});

test("A async demo", (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 2000);
});
