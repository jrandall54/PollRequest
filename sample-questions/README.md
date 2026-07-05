# Question File Format Guide

PollRequest supports importing questions from **Markdown** (`.md`) and **JSON** (`.json`) files.

## Markdown Format

Each question starts with `## Question` followed by optional metadata and the question body.

### Structure

```markdown
# Session Title (ignored by parser, filename becomes Sub-Bank name)

## Question
title: Loop Fundamentals
type: Predict Output
tags: loops, syntax
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
title: Primitive Data Types
type: Conceptual
tags: primitives, memory
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
  - `title` - Optional short title (e.g., Loop Fundamentals)
  - `type` - The question type (e.g., Predict Output, Conceptual). This groups questions in the UI.
  - `tags` - Comma-separated list of searchable tags (e.g., loops, arrays)
  - `difficulty` - `easy`, `medium`, or `hard`
  - `timeLimit` - Seconds to answer (5-120, default 30)
  - `multiSelect` - `true` if multiple correct (auto-detected if multiple `[x]`)
- **Question text** - Any text lines after metadata
- **Code blocks** - Use fenced code blocks with language tag
- **Choices** - Markdown checkboxes: `- [ ]` for wrong, `- [x]` for correct
- **Explanation** - Blockquote starting with `> Explanation:`
- **`---`** (horizontal rule) - Separator between questions (optional)

*Note: The older `category` metadata tag is still parsed for backwards compatibility, but questions are now primarily organized by their `type` and their `Sub-Bank` (which is automatically derived from the filename of the imported file).*

## JSON Format

A JSON array of question objects:

```json
[
  {
    "title": "Division Truncation",
    "type": "Predict Output",
    "tags": ["math", "division"],
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
    "difficulty": "easy"
  }
]
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | Yes | The question text |
| `title` | string | No | Short title |
| `type` | string | No | Question type (default "Predict Output") |
| `tags` | array | No | Array of string tags |
| `codeSnippet` | string | No | Code to display (use `\n` for newlines) |
| `codeSnippetMain` | string | No | Optional secondary code block (e.g. for `main` method) |
| `codeLanguage` | string | No | Language for syntax highlighting |
| `choices` | array | Yes | 2-6 answer options |
| `choices[].text` | string | Yes | Answer text |
| `choices[].isCorrect` | boolean | Yes | Whether this is a correct answer |
| `multiSelect` | boolean | No | True for "select all that apply" |
| `timeLimit` | number | No | Seconds (default 30) |
| `explanation` | string | No | Shown after answering |
| `difficulty` | string | No | "easy", "medium", or "hard" |
