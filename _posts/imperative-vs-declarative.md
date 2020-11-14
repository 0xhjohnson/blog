---
title: Imperative vs Declarative 
excerpt: What is the difference between imperative and declarative paradigms? React is declarative, how so...
date: 2020-04-20
icon: /assets/icons/lambda.png
tags:
  - Paradigm
---

You often hear these terms tossed around when talking about software. React is often touted as being declarative, but what does this mean?

### Imperative
Imperative is the natural way that humans tend to think about things. Sequentially handling state to reach a predetermined goal/outcome. Let's imagine a personal chef catering to a customer. The personal chef must:
- Take the customer's order
- Go to the kitchen
- Find the items
- ...
- Serve to the customer (goal)

For those of you that find code more mentally stimulating, let's take a look at a simple button that turns grey with a loading indicator on click and green on completion:
```js
if (btn.isLoading()) {
  addGrayClass();
  showLoading();
  if (btn.isComplete()) {
    removeGrayClass();
    hideLoading();
    addGreenClass();
  }
}
```

### Declarative
This abstracts away the explicit steps and asks that you *declare* "the UI should look like this". It is safe to assume that React can handle your requests. This allows you to describe how you want your application to look in a specific state. Continuing with our chef analogy, since a chef knows how to cook chicken we can just ask for chicken parm. We are not required to outline every step of the process. This reduces the surface area of your code and helps reduce bugs.
```js
if (btn.isLoading) {
  return <LoadingBtn />;
} else {
  return <CompleteBtn />;
}
```