# Question File Format Guide

PollRequest supports importing questions from **Markdown** (`.md`) and **JSON** (`.json`) files.

## Markdown Format

Each question starts with `## Question` followed by optional metadata and the question body.

### Structure

```markdown
# Session Title (ignored by parser)

## Question
category: loops
difficulty: medium
timeLimit: 30

What will this code print?

\```java
for (int i = 0; i < 5; i++) {
    if (i % 2 == 0) {
        System.out.print(i + " ");
    }
}
\```

- [ ] 1 3 5
- [x] 0 2 4
- [ ] 0 1 2 3 4
- [ ] 2 4

> Explanation: The modulo operator `%` returns the remainder of division. Even numbers have a remainder of 0 when divided by 2.

---

## Question
category: basics
difficulty: easy
timeLimit: 20
multiSelect: true

Which of the following are primitive types in Java?

- [x] int
- [x] boolean
- [ ] String
- [x] double
- [ ] Integer

> Explanation: String and Integer are reference types (classes), not primitives.
```

### Rules

- **`## Question`** - Starts a new question
- **Metadata** lines come right after, in `key: value` format:
  - `category` - Topic tag (e.g., loops, oop, arrays)
  - `difficulty` - `easy`, `medium`, or `hard`
  - `timeLimit` - Seconds to answer (5-120, default 30)
  - `multiSelect` - `true` if multiple correct (auto-detected if multiple `[x]`)
- **Question text** - Any text lines after metadata
- **Code blocks** - Use fenced code blocks with language tag
- **Choices** - Markdown checkboxes: `- [ ]` for wrong, `- [x]` for correct
- **Explanation** - Blockquote starting with `> Explanation:`
- **`---`** (horizontal rule) - Separator between questions (optional)

## JSON Format

A JSON array of question objects:

```json
[
  {
    "text": "What is the output?",
    "codeSnippet": "System.out.println(5 / 2);",
    "codeLanguage": "java",
    "choices": [
      { "text": "2.5", "isCorrect": false },
      { "text": "2", "isCorrect": true },
      { "text": "3", "isCorrect": false },
      { "text": "2.0", "isCorrect": false }
    ],
    "multiSelect": false,
    "timeLimit": 30,
    "explanation": "Integer division in Java truncates the decimal.",
    "category": "basics",
    "difficulty": "easy"
  }
]
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | Yes | The question text |
| `codeSnippet` | string | No | Code to display (use `\n` for newlines) |
| `codeLanguage` | string | No | Language for syntax highlighting |
| `choices` | array | Yes | 2-6 answer options |
| `choices[].text` | string | Yes | Answer text |
| `choices[].isCorrect` | boolean | Yes | Whether this is a correct answer |
| `multiSelect` | boolean | No | True for "select all that apply" |
| `timeLimit` | number | No | Seconds (default 30) |
| `explanation` | string | No | Shown after answering |
| `category` | string | No | Topic tag (default "general") |
| `difficulty` | string | No | "easy", "medium", or "hard" |
