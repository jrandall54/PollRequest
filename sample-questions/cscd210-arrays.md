# CSCD 210: Arrays

## Question
title: Default Array Values
type: Predict Output
tags: arrays, primitives, default values
difficulty: easy
timeLimit: 30

What will be printed by this code?

```java
int[] arr = new int[3];
System.out.println(arr[1]);
```

- [ ] null
- [x] 0
- [ ] An exception is thrown
- [ ] Garbage memory value

> Explanation: When an array of primitive integers is created using the `new` keyword, all elements are automatically initialized to their default value, which is `0`.

---

## Question
title: 2D Array Length
type: Predict Output
tags: arrays, 2d-arrays, length
difficulty: medium
timeLimit: 45

What is the output of the following code?

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5},
    {6, 7, 8, 9}
};
System.out.println(matrix[1].length);
```

- [ ] 3
- [x] 2
- [ ] 4
- [ ] 9

> Explanation: `matrix[1]` refers to the second row in the 2D array, which is `{4, 5}`. The length of this specific sub-array is `2`.

---

## Question
title: Array Reference Semantics
type: True / False
tags: arrays, references, memory
difficulty: hard
timeLimit: 40

True or False: If you write `int[] a = {1, 2};` and then `int[] b = a;`, modifying `b[0]` will also change the value of `a[0]`.

- [x] True
- [ ] False

> Explanation: Arrays are objects in Java. Assigning `b = a` copies the *reference* to the array in memory, not the array itself. Both variables point to the exact same array.

---

## Question
title: Array Declarations
type: Select All That Apply
tags: syntax, arrays
difficulty: easy
timeLimit: 30
multiSelect: true

Which of the following are valid ways to declare an array in Java? (Select all that apply)

- [x] `int[] arr = new int[5];`
- [x] `int arr[] = new int[5];`
- [ ] `int[5] arr = new int[];`
- [x] `int[] arr = {1, 2, 3};`

> Explanation: You can place the brackets after the type (`int[] arr`) or after the variable name (`int arr[]`). You cannot specify the size inside the declaration brackets on the left side of the assignment.
