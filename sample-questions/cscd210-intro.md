# CSCD 210: Intro to Java Programming

## Question
title: Division Truncation
type: Predict Output
tags: math, division, primitives
difficulty: easy
timeLimit: 30

What will this code print to the console?

```java
int a = 7;
int b = 2;
double result = a / b;
System.out.println(result);
```

- [ ] 3.5
- [x] 3.0
- [ ] 3
- [ ] 4.0

> Explanation: In Java, integer division `a / b` truncates the decimal part, resulting in `3`. That `3` is then implicitly cast to a double (`3.0`) when assigned to `result`.

---

## Question
title: Valid Identifiers
type: Select All That Apply
tags: syntax, identifiers, basics
difficulty: medium
timeLimit: 45
multiSelect: true

Which of the following are **valid** variable names (identifiers) in Java? (Select all that apply)

- [x] `_myVariable`
- [ ] `2ndValue`
- [x] `$currency`
- [ ] `class`
- [x] `myVariable2`

> Explanation: Java identifiers can start with a letter, underscore `_`, or dollar sign `$`. They cannot start with a number or be a reserved keyword like `class`.

---

## Question
title: Static Typing
type: True / False
tags: typing, variables
difficulty: easy
timeLimit: 20

True or False: In Java, a variable declared as an `int` can later be assigned a `String` value without causing a compilation error.

- [ ] True
- [x] False

> Explanation: Java is statically typed. Once a variable is declared with a specific type, it can only hold values of that type or compatible types.

---

## Question
title: Compiler vs Interpreter
type: Conceptual
tags: jvm, execution
difficulty: medium
timeLimit: 30

What is the primary role of the Java Compiler (`javac`)?

- [ ] It executes the Java program line by line on the host operating system.
- [ ] It translates Java source code directly into machine code for the target CPU.
- [x] It translates Java source code into platform-independent bytecode.
- [ ] It manages memory and garbage collection during runtime.

> Explanation: The Java Compiler translates `.java` files into `.class` files containing bytecode. The Java Virtual Machine (JVM) later interprets/compiles this bytecode during execution.

---

## Question
title: Array Bounds
type: Predict Output
tags: arrays, loops, exceptions
difficulty: hard
timeLimit: 45

What happens when the following code is executed?

```java
int[] numbers = {10, 20, 30};
for (int i = 0; i <= 3; i++) {
    System.out.print(numbers[i] + " ");
}
```

- [ ] It prints: `10 20 30`
- [ ] It prints: `10 20 30 0`
- [ ] It won't compile because the loop condition is invalid.
- [x] It prints `10 20 30` and then throws an `ArrayIndexOutOfBoundsException`.

> Explanation: The array has a length of 3 (indices 0, 1, 2). The loop condition `i <= 3` causes the loop to run when `i` is 3, attempting to access `numbers[3]`, which throws a runtime exception.
