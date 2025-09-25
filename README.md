# 📚 Read Journey

Read Journey is a web application to track your reading journey. It allows you to manage your library, track reading progress, and view statistics through a reading diary and charts.

# 🚀 Features
**🔐 Authentication**
 - User login and registration.
 - Refresh user by refresh token

**📖 Recommended Books**
 - Display a list of recommended books.
 - Filter books by title or author.
 - Add books to your library with a single click via modal.

**📚 Library**
 - Add a new book using a form: title, author, number of pages
 - Delete books from your library.
 - Filter books by reading progress.
 - Clicking a book opens a modal to navigate to the reading page.

**📝 Reading Page**
 - Enter the current page to start reading.
 - Update the page where you stopped.
 - Reading diary showing progress: day, reading speed, reading time, number of pages read, persent of reading progress
 - Progress statistics displayed as a circular chart.
 - Notification when a book is completed.

**🌐 Routing**
```
/login	                    Login page
/register	                Registration page
/recommended	            List of recommended books - queryParams - page, title, author
/library	                Your library
/reading/:bookId	        Reading page for a specific book
```

**🛠️ Technologies Used**
 - React + TS
 - React Router
 - Redux Toolkit
 - Tailwind CSS

**👩‍💻 Author**
  Yelyzaveta Heorhiieva
  GitHub: @yelyzaveta-heorhiieva
  LinkedIn: yelyzaveta-heorhiieva
  Telegram: @heorhiieva_liza
  Email: heorhiieva.y@gmail.com
