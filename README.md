# Blogspot Project

## Requirements:

Home Page

- Welcome message
- Login/Sign-in link
- Sign up link
- Last posted 10 blogs sorted by datetime (details)
  ...

Page --> /api/blogs/blog/.../blogid

Action
Login link---> show Login page
Sign up link ---> show sign-up page

Login Page

- Fields: username, password inputs
- Abilities: username password wrong/error message
- Link: I don't have account ---> jump to "Sign Up page"
- Action: Successful login ---> show "Personal Home Page"
  ...

Sign up Page

- Fields: name, email, password, confirmPassword
- Abilities: error message/instruction
- Link: I already have an account ---> jump to "Login Page"
- Successful signup ---> jump to "Login Page"
  ...

Personal Home Page/Template matched...

- Create blog button/link ----> show Create blog Page/dialog
- List of own blogs
- Paging/Load more...

Action: Click on a blog, ---> show blog with full content on Blog Page

Blog Page

- Title
- Content
- Created date
- Author

Additional Capabilities of the blog system

- Like
- Comment
- Whatever...
- Filter
- Search

User, Blog, Author,

Blog - schema

- Pic
- Title
- Content
- CreatedAt
- Tag/category
