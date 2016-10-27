using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BookLibrary.Models;
using System.Data.SqlTypes;

namespace BookLibrary.Controllers
{
    public class HomeController : Controller
    {

        BookContext db = new BookContext();

        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public ActionResult CreateBook(Book book)
        {
            if (book == null || book.Name == null)
            {
                return Json(new { Success = false, Message = "Book is empty" });
            }

            db.Books.Add(book);
            db.SaveChanges();

            return Json(new { Success = true, Status = "Book added" });
        }

        [HttpPost]
        public ActionResult CreatePerson(Person person)
        {
            if (person == null || person.Name == string.Empty)
            {
                return Json(new { Success = false, Message = "Person is empty" });
            }

            db.Persons.Add(person);
            db.SaveChanges();

            return Json(new { Success = true, Status = "Person created" });
        }



        public ActionResult CreateDebt(LogEntry debt)
        {
            if (debt == null || debt.Person == 0 || debt.Book == 0)
            {
                return Json(new { Success = false, Message = "Error" });
            }
            var borrowBook = db.LogEntries.Where(a => a.Book == debt.Book).ToList().Where(a => (bool)(a.Returned == SqlDateTime.MinValue)).ToList();

            if (borrowBook.Count != 0)
            {
                return Json(new { Success = false, Message = "Книги нет" });
            }
            debt.Borrowed = DateTime.Now.Date;
            debt.Returned = (DateTime)SqlDateTime.MinValue;
            db.LogEntries.Add(debt);
            db.SaveChanges();

            return Json(new { Success = true, Status = "Debt created" });
        }


        [HttpPost]
        public ActionResult DeleteDept(Book book)
        {


            var log = db.LogEntries.SingleOrDefault(x => book.Id == x.Book && (bool)(x.Returned == (DateTime)SqlDateTime.MinValue));
            if (log == null)
            {
                return Json(new { Success = false});
            }
            db.LogEntries.Attach(log);
           log.Returned = DateTime.Now;
            db.Entry(log).Property(e => e.Returned).IsModified = true;
            db.SaveChanges();

            return Json(new { Success = true});
        }







        public ActionResult GetBooksData(int limit, int start = 0, int page = 1, string keyWord = "", string attribute = "",Boolean thereIs=false)
        {
            var books = db.Books.ToList();
            if (keyWord != "")
            {
                if (attribute == "Name" || attribute == null)
                {
                    books = db.Books.Where(a => a.Name.ToLower().Contains(keyWord.ToLower())).ToList<Book>();

                }
                if (attribute == "Author")
                {
                    books = db.Books.Where(a => a.Author.ToLower().Contains(keyWord.ToLower())).ToList<Book>();

                }
            }
            int pageSize = page * limit > books.Count ? books.Count - (page - 1) * limit : limit;
            var booksInSelection = books.GetRange(start, pageSize);
            
            if (thereIs)
            {
                
                for (int i = 0; i <  booksInSelection.Count;i++ )
                {
                    
                    Book book = booksInSelection[i];
                    LogEntry log = db.LogEntries.SingleOrDefault(x => book.Id == x.Book && (bool)(x.Returned == (DateTime)SqlDateTime.MinValue));
                    if (log != null)
                    {
                        booksInSelection.Remove(book);
                        i--;
                    }
                }
            }
            
            return Json(new { TotalCount = books.Count, books=booksInSelection }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPersonsData(int limit=10, int start = 0, int page = 1, string keyWord = "",string attribute="",Boolean deptorFlag=false)
        {
            var persons = db.Persons.ToList();
            var books = db.Books.ToList();
            var logs = db.LogEntries.ToList();
            if (keyWord != "")
            {
                if (attribute == "Name" || attribute == null)
                {
                    persons = db.Persons.Where(a => a.Name.ToLower().Contains(keyWord.ToLower())).ToList<Person>();
                    
                }
                if (attribute == "Surname")
                {
                    persons = db.Persons.Where(a => a.Surname.ToLower().Contains(keyWord.ToLower())).ToList<Person>();
                   
                }
            }
        

            int pageSize = page * limit > persons.Count ? persons.Count - (page - 1) * limit : limit; // количество объектов на страницу
            var personsInSelection = persons.GetRange(start, pageSize);
            foreach (var person in personsInSelection)
            {
                var personsBooksData = logs.Where(x => x.Person == person.Id && (bool)(x.Returned == SqlDateTime.MinValue)).ToList();
                var borrowedBooksId = personsBooksData.Select(x => x.Book).ToList();
                var personsBorrowedBooks = books.Where(b => borrowedBooksId.Contains(b.Id)).ToList();
                person.BooksData = personsBorrowedBooks;
            }
          
            if (deptorFlag)
            {
                for (int i = 0; i < personsInSelection.Count; i++)
                {
                    Person person = personsInSelection[i];
                    if (person.BooksData.Count == 0)
                    {
                        personsInSelection.Remove(person);
                        i--;
                    }
                }
            }

            return Json(new { TotalCount = persons.Count, persons =personsInSelection }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetLogData(int limit, int start = 0, int page = 1)
        {
            var log = db.LogEntries.ToList();
           
            int pageSize = page * limit >log.Count ? log.Count - (page - 1) * limit : limit;
            var logInSelection = log.GetRange(start, pageSize);
            return Json(new { TotalCount = log.Count, logEntry = logInSelection }, JsonRequestBehavior.AllowGet);
        }
    }
}
