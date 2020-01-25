using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataLayer.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "varchar(150)")]
        public string FullName { get; set; }
    }
}
