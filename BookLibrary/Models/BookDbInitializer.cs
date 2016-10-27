using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace BookLibrary.Models
{
    public class BookDbInitializer : DropCreateDatabaseIfModelChanges<BookContext>
    {
        protected override void Seed(BookContext db)
        {
            db.Books.Add(new Book { Name = "Война и мир", Author = "Л. Толстой" });
            db.Books.Add(new Book { Name = "Отцы и дети", Author = "И. Тургенев" });
            db.Books.Add(new Book { Name = "Чайка", Author = "А. Чехов", });

            base.Seed(db);
        }
    }
}