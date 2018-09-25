using Dota.Models.Domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dota.Services
{
    public class HeroService
    {
        public string connString = "Data Source=DAN-LAPTOP;Initial Catalog=DotaWin;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public List<Hero> getAll()
        {
            List<Hero> heroList = new List<Hero>();

            //string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            SqlConnection sqlCon = new SqlConnection(connString);
            {
                sqlCon.Open();

                SqlCommand cmd = sqlCon.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Hero_SelectAll";

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Hero heroToAdd = new Hero
                    {
                        HeroId = (int)reader["HeroId"],
                        HeroName = (string)reader["HeroName"],
                        PrimaryAttribute = (int)reader["PrimaryAttribute"],
                        HeroTier = (int)reader["HeroTier"],
                        HeroImage = (string)reader["HeroImage"]
                    };

                    heroList.Add(heroToAdd);
                }
            }

            return heroList;

        }

        //public Hero getHeroById(int id)
        //{

        //}
    }
}
