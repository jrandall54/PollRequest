# CSCD 210: Control Flow

## Question
title: Switch Statement Fallthrough
type: Predict Output
tags: switch, control flow, tricky
difficulty: hard
timeLimit: 45

What will this code print?

```java
int x = 2;
switch (x) {
    case 1:
        System.out.print("One ");
    case 2:
        System.out.print("Two ");
    case 3:
        System.out.print("Three ");
        break;
    default:
        System.out.print("Default ");
}
```

- [ ] Two 
- [x] Two Three 
- [ ] Two Three Default
- [ ] It won't compile

> Explanation: Because there is no `break` statement after `case 2:`, execution "falls through" to `case 3:`, printing both "Two " and "Three " before hitting a `break`.

---

## Question
title: Valid Loop Conditions
type: Select All That Apply
tags: loops, boolean, syntax
difficulty: medium
timeLimit: 30
multiSelect: true

Which of the following are valid loop constructs in Java? (Select all that apply)

- [x] `while (true) {}`
- [ ] `while (1) {}`
- [x] `for (;;) {}`
- [x] `do {} while (false);`

> Explanation: Java requires boolean expressions for loop conditions. `while(1)` is valid in C/C++ but not in Java. `for(;;)` is a valid infinite loop. `do {} while (false);` is syntactically valid and executes exactly once.

---

## Question
title: Short-Circuit Evaluation
type: True / False
tags: boolean, logic, short-circuit
difficulty: medium
timeLimit: 20

True or False: In the expression `(a && b)`, if `a` is evaluated to `false`, `b` is never evaluated.

- [x] True
- [ ] False

> Explanation: Java uses short-circuit evaluation for `&&` and `||`. If the left operand of `&&` is false, the overall expression cannot be true, so the right operand is skipped.

---

## Question
title: Infinite Loop Identification
type: Conceptual
tags: loops, debugging
difficulty: easy
timeLimit: 30

Why does the following loop run infinitely?

```java
int count = 0;
while (count < 10) {
    System.out.println("Counting...");
}
```

- [ ] The condition is backward.
- [ ] You cannot use `<` in a while loop.
- [x] The `count` variable is never updated inside the loop body.
- [ ] The string "Counting..." is too long.

> Explanation: Because `count` is initialized to `0` and never incremented, the condition `count < 10` will always evaluate to `true`.
