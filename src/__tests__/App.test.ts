test("hello world", () => {
    const str = "Hello, WORLD!";
    expect(typeof str).toBe("string");
    expect(str.toLocaleLowerCase()).toBe("hello, world!");
    expect(str.split(" ")[0]).toBe("Hello,");
    expect(str.split(" ")[1]).toBe("WORLD!");
});
