# CSCD 210: Methods

## Question
title: Method Signatures
type: Conceptual
tags: methods, signature, overloading
difficulty: medium
timeLimit: 45

In Java, a method's "signature" consists of which of the following?

- [ ] The method name and return type.
- [x] The method name and the parameter list (types, order, and number).
- [ ] The method name, return type, and parameter list.
- [ ] The parameter list and the access modifier.

> Explanation: The Java compiler uses the method name and its parameter list to distinguish methods (method overloading). The return type is NOT part of the method signature.

---

## Question
title: Pass by Value
type: Predict Output
tags: parameters, primitives, scope
difficulty: hard
timeLimit: 60

What is the output of the following code?

```java
public static void modify(int x) {
    x = 10;
}

public static void main(String[] args) {
    int x = 5;
    modify(x);
    System.out.println(x);
}
```

- [ ] 10
- [x] 5
- [ ] 0
- [ ] Compilation Error

> Explanation: Java is strictly "pass-by-value". A copy of the value `5` is passed to the `modify` method. Changing `x` inside `modify` only changes the local copy, not the original variable in `main`.

---

## Question
title: Return Statements
type: True / False
tags: methods, return
difficulty: easy
timeLimit: 20

True or False: A method with a `void` return type cannot contain a `return;` statement.

- [ ] True
- [x] False

> Explanation: A `void` method can use the `return;` statement (with no value) to exit the method early.

---

## Question
title: Valid Method Overloads
type: Select All That Apply
tags: overloading, syntax
difficulty: medium
timeLimit: 45
multiSelect: true

Given the method `public void doMath(int a, double b) {}`, which of the following are valid overloaded versions of this method in the same class? (Select all that apply)

- [x] `public void doMath(double a, int b) {}`
- [ ] `public int doMath(int a, double b) { return 0; }`
- [x] `public void doMath(int a) {}`
- [x] `public void doMath(int a, double b, String c) {}`

> Explanation: Overloaded methods must have different parameter lists (different types, order, or number of parameters). Changing ONLY the return type is not allowed.
