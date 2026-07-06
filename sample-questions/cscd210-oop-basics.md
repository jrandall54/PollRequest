# CSCD 210: Object-Oriented Basics

## Question
title: Class vs Object
type: Conceptual
tags: oop, classes, instances
difficulty: easy
timeLimit: 30

Which of the following best describes the relationship between a class and an object?

- [ ] A class is an instance of an object in memory.
- [x] A class is a blueprint, and an object is a specific instance created from that blueprint.
- [ ] A class and an object are the exact same thing.
- [ ] Objects are used to compile classes into bytecode.

> Explanation: In OOP, a class defines the structure and behaviors (blueprint), while an object is a realized, concrete instance of that class existing in memory during runtime.

---

## Question
title: Default Constructors
type: True / False
tags: constructors, syntax
difficulty: medium
timeLimit: 30

True or False: If you write a class without explicitly defining a constructor, Java will NOT provide a default constructor for you, resulting in a compilation error if you try to instantiate it.

- [ ] True
- [x] False

> Explanation: If you do not provide any constructor, the Java compiler automatically inserts a no-argument default constructor for you.

---

## Question
title: Encapsulation Basics
type: Conceptual
tags: encapsulation, access-modifiers
difficulty: medium
timeLimit: 40

What is the primary purpose of marking instance variables as `private` and providing `public` getter and setter methods?

- [ ] It makes the code run significantly faster in the JVM.
- [ ] It is required by the compiler for all variables.
- [x] It allows the class to enforce control over how its data is accessed and modified.
- [ ] It prevents other developers from ever seeing the data.

> Explanation: This is the core of Encapsulation. By hiding the raw fields (`private`) and exposing them via methods (`public`), the class can validate input or control read-only access.

---

## Question
title: Static Keyword
type: Predict Output
tags: static, variables, state
difficulty: hard
timeLimit: 60

What is the output of the following code?

```java
class Counter {
    static int count = 0;
    public Counter() {
        count++;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        System.out.println(Counter.count);
    }
}
```

- [ ] 0
- [ ] 1
- [x] 2
- [ ] Compilation Error

> Explanation: The `count` variable is `static`, meaning it belongs to the class itself, not individual instances. Every time a new `Counter` is created, the single shared `count` variable is incremented.
