using Dota.Models.Domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dota.Models.Requests;
using Newtonsoft.Json;

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
                        HeroImage = (string)reader["HeroImage"],
                        HeroSelectedImage = (string)reader["HeroSelectedImage"],
                        HeroMinimapIcon = (string)reader["HeroMinimapIcon"]
                    };

                    heroList.Add(heroToAdd);
                }

                sqlCon.Close();
            }

            return heroList;

        }

        public void InsertMatchTemplate(CreateTemplateInfo templateToInsert)
        {
            SqlConnection sqlCon = new SqlConnection(connString);
            {
                sqlCon.Open();

                SqlCommand cmd = sqlCon.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "CreateMatchup";

                cmd.Parameters.AddWithValue("@matchup", JsonConvert.SerializeObject(templateToInsert));

                cmd.ExecuteNonQuery();

                sqlCon.Close();
            }
        }

        public List<Template> getTemplates()
        {
            List<Template> templateList = new List<Template>();

            SqlConnection sqlCon = new SqlConnection(connString);
            {
                sqlCon.Open();

                SqlCommand cmd = sqlCon.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetTemplateNames";

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Template templateToAdd = new Template()
                    {
                        TemplateId = (int)reader["Id"],
                        TemplateName = (string)reader["TemplateName"],
                        SidesSwitched = (bool)reader["SidesSwitched"]
                    };

                    templateList.Add(templateToAdd);
                }

                sqlCon.Close();
            }

            return templateList;
        }

        public List<Hero> getMatchup()
        {
            List<Hero> matchupList = new List<Hero>();

            SqlConnection sqlCon = new SqlConnection(connString);
            {
                sqlCon.Open();

                SqlCommand cmd = sqlCon.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetMatchup";

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Hero heroToAdd = new Hero()
                    {
                        HeroId = (int)reader["HeroId"],
                        IsRadiant = (bool)reader["RadiantTeam"],
                        HeroName = (string)reader["HeroName"],
                        PrimaryAttribute = (int)reader["PrimaryAttribute"],
                        HeroTier = (int)reader["HeroTier"],
                        HeroImage = (string)reader["HeroImage"],
                        HeroSelectedImage = (string)reader["HeroSelectedImage"],
                        HeroMinimapIcon = (string)reader["HeroMinimapIcon"]
                    };

                    matchupList.Add(heroToAdd);
                }

                sqlCon.Close();
            }

            return matchupList;
        }
    }

    
}
