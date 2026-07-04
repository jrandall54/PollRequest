# Week 1 - Variables and Data Types

## Question
category: variables
difficulty: easy
timeLimit: 20

What is the correct way to declare an integer variable in Java?

- [ ] integer x = 5;
- [x] int x = 5;
- [ ] var x = 5;
- [ ] Int x = 5;

> Explanation: In Java, the primitive integer type is `int` (lowercase). `Integer` is the wrapper class, and `integer` is not a valid type.

---

## Question
category: variables
difficulty: easy
timeLimit: 25

What will this code print?

```java
int x = 10;
double y = x;
System.out.println(y);
```

- [ ] 10
- [x] 10.0
- [ ] Error: incompatible types
- [ ] 10.00

> Explanation: When you assign an int to a double, Java performs automatic widening conversion. The double value includes a decimal point, so it prints 10.0.

---

## Question
category: variables
difficulty: medium
timeLimit: 30

What is the output of this code?

```java
String a = "Hello";
String b = "Hello";
String c = new String("Hello");
System.out.println(a == b);
System.out.println(a == c);
```

- [ ] true and true
- [x] true and false
- [ ] false and false
- [ ] false and true

> Explanation: String literals are interned in Java, so `a` and `b` point to the same object (== is true). `new String()` creates a new object on the heap, so `a == c` compares references and is false. Use `.equals()` for content comparison.

---

## Question
category: variables
difficulty: easy
timeLimit: 20
multiSelect: true

Which of the following are valid primitive data types in Java?

- [x] boolean
- [x] char
- [ ] String
- [x] double
- [ ] Integer
- [x] int

> Explanation: Java has 8 primitive types: byte, short, int, long, float, double, boolean, and char. String and Integer are reference types (classes).

---

## Question
category: variables
difficulty: medium
timeLimit: 30

What is the output?

```java
int a = 5;
int b = 2;
System.out.println(a / b);
System.out.println(a % b);
```

- [ ] 2.5 and 1
- [x] 2 and 1
- [ ] 2 and 0.5
- [ ] 3 and 1

> Explanation: Integer division truncates the decimal part (5/2 = 2, not 2.5). The modulo operator % returns the remainder (5 % 2 = 1).

---

## Question
category: variables
difficulty: hard
timeLimit: 35

What will be printed?

```java
int x = 127;
int y = 127;
Integer a = 127;
Integer b = 127;
Integer c = 128;
Integer d = 128;
System.out.println(x == y);
System.out.println(a == b);
System.out.println(c == d);
```

- [ ] true, true, true
- [x] true, true, false
- [ ] true, false, false
- [ ] true, false, true

> Explanation: Primitive int comparison (x == y) always compares values. Integer caching means values from -128 to 127 are cached, so a and b reference the same cached object. Values outside that range (128) create new objects, so c == d is false.
