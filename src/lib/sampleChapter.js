export const chapter = {
    chapterNumber: 1,
    chapterTitle: "Introduction to JavaScript",
    chapterDescription:
        "This chapter introduces the core concepts of JavaScript and its role in web development.",
    learningObjectives: [
        "Define JavaScript and its purpose in web development.",
        "Identify the different ways to include JavaScript in HTML documents.",
        "Explain the basic syntax and data types in JavaScript.",
        "Execute simple JavaScript code using browser developer tools.",
    ],
    subtopics: [
        {
            title: "What is JavaScript?",
            content: [
                {
                    type: "header2",
                    content: "History and Purpose",
                },
                {
                    type: "para",
                    content:
                        "JavaScript is a high-level, interpreted programming language primarily used to add interactivity to websites. Initially developed by Brendan Eich at Netscape, it was first released in 1995 under the name 'LiveScript'. It was soon renamed JavaScript to capitalize on the popularity of Java at the time.",
                },
                {
                    type: "para",
                    content:
                        "Over the years, JavaScript has evolved significantly and is now used not only for front-end web development but also for back-end development (Node.js), mobile app development (React Native), and more.",
                },
                {
                    type: "para",
                    content:
                        "JavaScript's primary purpose is to enhance user interfaces, create dynamic content, and enable features that make websites more engaging and responsive.",
                },
            ],
            videoSuggestions: [
                "https://www.youtube.com/watch?v=khJlrj3Y6Rk",
                "https://www.youtube.com/watch?v=fkhTL8I3wvg",
            ],
        },
        {
            title: "JavaScript's Role in Development",
            content: [
                {
                    type: "header2",
                    content: "Front-End Development",
                },
                {
                    type: "para",
                    content:
                        "In front-end development, JavaScript is used to manipulate the Document Object Model (DOM), handle events, create animations, and manage user interactions. Frameworks like React, Angular, and Vue.js are built on JavaScript and provide structures for building complex user interfaces.",
                },
                {
                    type: "header2",
                    content: "Back-End Development",
                },
                {
                    type: "para",
                    content:
                        "With the advent of Node.js, JavaScript can also be used for server-side programming. Node.js allows developers to use JavaScript to build scalable and efficient back-end applications, APIs, and real-time applications.",
                },
                {
                    type: "header2",
                    content: "Other Uses",
                },
                {
                    type: "para",
                    content:
                        "JavaScript's versatility extends to mobile app development (React Native, Ionic), desktop applications (Electron), and even game development.",
                },
            ],
            videoSuggestions: [
                "https://www.youtube.com/watch?v=uQe9aX3TyRY",
                "https://www.youtube.com/watch?v=Ukg_U3CnqWA",
            ],
        },
        {
            title: "Setting Up a Development Environment",
            content: [
                {
                    type: "header2",
                    content: "Browser Developer Tools",
                },
                {
                    type: "para",
                    content:
                        "Modern web browsers come with built-in developer tools that are essential for debugging and testing JavaScript code. These tools typically include a console for logging messages and errors, a debugger for stepping through code, and elements inspector for examining the DOM.",
                },
                {
                    type: "para",
                    content:
                        "To access developer tools, right-click on a web page and select 'Inspect' or 'Inspect Element'. Alternatively, you can use keyboard shortcuts like F12 or Ctrl+Shift+I (Cmd+Option+I on Mac).",
                },
                {
                    type: "header3",
                    content: "Using the Console",
                },
                {
                    type: "para",
                    content:
                        "The console is primarily used for logging output from your JavaScript code. You can use `console.log()`, `console.warn()`, `console.error()`, and `console.table()` to display different types of messages.",
                },
                {
                    type: "code",
                    content:
                        "console.log('Hello, JavaScript!');\nconsole.warn('This is a warning message.');\nconsole.error('This is an error message.');",
                },
            ],
            videoSuggestions: [
                "https://www.youtube.com/watch?v=x4q86IjJFag",
                "https://www.youtube.com/watch?v=a9989Y_PYYY",
            ],
        },
        {
            title: "Including JavaScript in HTML",
            content: [
                {
                    type: "header2",
                    content: "Inline Scripts",
                },
                {
                    type: "para",
                    content:
                        "Inline scripts are embedded directly within HTML elements using event attributes like `onclick`, `onload`, etc. This method is generally discouraged for larger scripts but can be useful for small snippets of code.",
                },
                {
                    type: "code",
                    content:
                        "<button onclick=\"alert('Button clicked!')\">Click Me</button>",
                },
                {
                    type: "header2",
                    content: "Internal Scripts",
                },
                {
                    type: "para",
                    content:
                        "Internal scripts are placed within `<script>` tags inside the `<head>` or `<body>` of an HTML document. This is suitable for scripts that are specific to a single page.",
                },
                {
                    type: "code",
                    content:
                        "<script>\n  function sayHello() {\n    alert('Hello!');\n  }\n</script>",
                },
                {
                    type: "header2",
                    content: "External Scripts",
                },
                {
                    type: "para",
                    content:
                        "External scripts are stored in separate `.js` files and linked to the HTML document using the `<script>` tag with the `src` attribute. This is the recommended approach for larger projects as it promotes code reusability and maintainability.",
                },
                {
                    type: "code",
                    content: '<script src="script.js"></script>',
                },
            ],
            videoSuggestions: [
                "https://www.youtube.com/watch?v=fGqzV04mHxE",
                "https://www.youtube.com/watch?v=LNrGGTpHj9E",
            ],
        },
        {
            title: "Basic Syntax and Data Types",
            content: [
                {
                    type: "header2",
                    content: "Variables",
                },
                {
                    type: "para",
                    content:
                        "Variables are used to store data values. In JavaScript, you can declare variables using `var`, `let`, or `const`. `let` and `const` were introduced in ES6 and provide block scope, while `var` has function scope.",
                },
                {
                    type: "code",
                    content:
                        "let age = 30;\nconst PI = 3.14;\nvar name = 'John';",
                },
                {
                    type: "header2",
                    content: "Data Types",
                },
                {
                    type: "points",
                    content: [
                        "**String:** Represents textual data. Example: `'Hello'`",
                        "**Number:** Represents numeric values. Example: `42`, `3.14`",
                        "**Boolean:** Represents true or false values. Example: `true`, `false`",
                        "**Array:** Represents an ordered list of values. Example: `[1, 2, 3]`",
                        "**Object:** Represents a collection of key-value pairs. Example: `{name: 'John', age: 30}`",
                        "**Undefined:** Represents a variable that has been declared but not assigned a value.",
                        "**Null:** Represents the intentional absence of a value.",
                    ],
                },
                {
                    type: "header2",
                    content: "Operators",
                },
                {
                    type: "para",
                    content:
                        "JavaScript supports various operators for performing arithmetic, comparison, and logical operations.",
                },
                {
                    type: "points",
                    content: [
                        "**Arithmetic Operators:** `+`, `-`, `*`, `/`, `%`",
                        "**Comparison Operators:** `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`",
                        "**Logical Operators:** `&&` (AND), `||` (OR), `!` (NOT)",
                        "**Assignment Operators:** `=`, `+=`, `-=`, `*=`, `/=`, `%=`",
                    ],
                },
            ],
            videoSuggestions: [
                "https://www.youtube.com/watch?v=k2Y6qBWMq4E",
                "https://www.youtube.com/watch?v=mx6JwLGnSZk",
            ],
        },
    ],
    task: {
        type: "fill-in-the-blank",
        question: "JavaScript was initially developed by ______ at Netscape.",
        options: [],
        answer: "brendan eich",
        explanation:
            "Brendan Eich created JavaScript (originally LiveScript) at Netscape in 1995.",
    },
};
