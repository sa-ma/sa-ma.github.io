---
path: "/blog/testing-material-ui-form-components"
date: "2019-11-21"
title: "Testing Material UI form components"
published: true
description: testing material UI form components
---

I used [Material-UI](https://material-ui.com/) for a side project and I ran into problems when trying to write a test for form components, this article illustrates the problem and how it was solved.

[React Testing Library](https://www.npmjs.com/package/@testing-library/react) was used to write the tests which is a cool library for testing react components and also [jest-dom](https://github.com/testing-library/jest-dom) which provides custom matchers that can be used to extend that of jest.

This is my `App.js` file

```js
import React, { useState } from "react"
import {
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Send from "@material-ui/icons/Send"

const useStyle = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))
const App = () => {
  const classes = useStyle()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const handleChange = event => {
    setInput(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setOutput(`Hello ${input}`)
  }

  return (
    <div data-testid="form">
      <h3>Material Form</h3>
      <FormControl className={classes.root}>
        <InputLabel htmlFor="adornment-send-title" data-testid="label">
          Enter Name
        </InputLabel>
        <Input
          id="adornment-send-title"
          type="text"
          value={input}
          onChange={handleChange}
          data-testid="nameInput"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit answer"
                onClick={handleSubmit}
                data-testid="submit"
              >
                <Send className={classes.iconColor} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <p data-testid="output">{output}</p>
    </div>
  )
}

export default App
```

This is a screenshot of the App:

![Screenshot](https://res.cloudinary.com/dis3a42lz/image/upload/v1571756821/blog/material-form-test.png "Material Form")

It renders a simple form component that has a text field and a button. When an input is entered and the button is clicked it displays a message.

This is the test for the App component:

```js
import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import App from "./App"

it("check if form displays", () => {
  const { getByTestId } = render(<App />)
  const form = getByTestId("form")
  const output = getByTestId("output")
  const label = getByTestId("label")
  const nameInput = getByTestId("nameInput")
  const submit = getByTestId("submit")

  expect(form).toBeInTheDocument()
  expect(output).toBeEmpty("")
  expect(label).toHaveTextContent("Enter Name")
  expect(nameInput).toHaveValue("")
  expect(submit).toBeInTheDocument()
})

it("should check if message is displayed when button is clicked", () => {
  const { getByTestId } = render(<App />)
  const output = getByTestId("output")
  const nameInput = getByTestId("nameInput")
  const submit = getByTestId("submit")

  expect(output).toBeEmpty("")
  expect(nameInput).toHaveValue("")

  fireEvent.change(nameInput, { target: { value: "Sama" } })
  fireEvent.click(submit)
  expect(nameInput).toHaveValue("Sama")
  expect(output).not.toBeEmpty("")
})
```

There are two tests in the file, the first checks if the page renders correctly and the second checks if the button performs the actions it is expected to perform.

### Problem

When you run `npm test` you get the following errors:

![Material form test error 1 ](https://res.cloudinary.com/dis3a42lz/image/upload/v1571948354/blog/material-form-test-2.png "Material Form Test Error 1")

![Material form test error 2 ](https://res.cloudinary.com/dis3a42lz/image/upload/v1571948354/blog/material-form-test-3.png "Material Form Test Error 2")

From the test errors, we can clearly see that

```js
const nameInput = getByTestId("nameInput")
```

returns undefined which is odd considering the component value is supposed to be an empty string

```js
<Input
  required
  id="adornment-send-title"
  type="text"
  value={input}
  data-testid="nameInput"
  onChange={handleChange}
  endAdornment={
    <InputAdornment position="end">
      <IconButton type="submit" aria-label="submit answer" data-testid="submit">
        <Send className={classes.iconColor} />
      </IconButton>
    </InputAdornment>
  }
/>
```

### Solution

So after being stuck for a while I decided to inspect the input element in the browser and realized that the Material UI TextField has a `div` wrapped around the `input` so I further explored by checking the TextField API documentation which can be accessed [here](https://material-ui.com/components/text-fields/#text-fields). It confirmed my suspicion and further explained that to alter the props to the input element then `inputProps` has to be used so I moved the `data-testid` attribute to `inputProps` and it resulted in this:

```js
<Input
  id="adornment-send-title"
  type="text"
  value={input}
  onChange={handleChange}
  inputProps={{
    "data-testid": "nameInput",
  }}
  endAdornment={
    <InputAdornment position="end">
      <IconButton type="submit" aria-label="submit answer" data-testid="submit">
        <Send className={classes.iconColor} />
      </IconButton>
    </InputAdornment>
  }
/>
```

After that, I ran the tests again and viola the results of the tests were successful.

![Material form test error 4 ](https://res.cloudinary.com/dis3a42lz/image/upload/v1574365166/blog/material-form-test-4.png "Material Form Test Error 4")

So, shameless plug this is the [app](https://lyricplay.netlify.com/) created with Material UI, it is a lyric trivia app that tests knowledge of lyrics and this is the [repo](https://github.com/sa-ma/LyricPlay) for it.
