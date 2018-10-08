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
        public string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public List<Hero> getAll()
        {
            List<Hero> heroList = new List<Hero>();

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
                        HeroMinimapIcon = (string)reader["HeroMinimapIcon"],
                        HeroWinRate = (decimal)reader["HeroWinRate"],
                        MidWinRate = (decimal)reader["MidWinRate"],
                        OffWinRate = (decimal)reader["OffWinRate"],
                        SafeWinRate = (decimal)reader["SafeWinRate"],
                        JungleWinRate = (decimal)reader["JungleWinRate"],
                        RoamingWinRate = (decimal)reader["RoamingWinRate"],
                };
                    List<string> abilityList = new List<string>
                    {
                        (string)reader["Ability1"],
                        (string)reader["Ability2"],
                        (string)reader["Ability3"],
                        (string)reader["Ability4"]
                    };

                    if (!reader["Ability5"].Equals(DBNull.Value))
                    {
                        abilityList.Add((string)reader["Ability5"]);
                    }
                    if (!reader["Ability6"].Equals(DBNull.Value))
                    {
                        abilityList.Add((string)reader["Ability6"]);
                    }

                    heroToAdd.Abilities = abilityList;

                    heroList.Add(heroToAdd);
                }

                sqlCon.Close();
            }

            return heroList;

        }

        public TeamWinRates GetTeamWinRates(Teams teamsToCompare)
        {
            TeamWinRates winPercentages = new TeamWinRates();

            SqlConnection sqlCon = new SqlConnection(connString);
            {
                sqlCon.Open();

                SqlCommand cmd = sqlCon.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "MatchOdds";

                cmd.Parameters.AddWithValue("@radiantHero1", teamsToCompare.RadiantHero1);
                cmd.Parameters.AddWithValue("@radiantHero1Position", teamsToCompare.RadiantHero1Position);
                cmd.Parameters.AddWithValue("@radiantHero2", teamsToCompare.RadiantHero2);
                cmd.Parameters.AddWithValue("@radiantHero2Position", teamsToCompare.RadiantHero2Position);
                cmd.Parameters.AddWithValue("@radiantHero3", teamsToCompare.RadiantHero3);
                cmd.Parameters.AddWithValue("@radiantHero3Position", teamsToCompare.RadiantHero3Position);
                cmd.Parameters.AddWithValue("@radiantHero4", teamsToCompare.RadiantHero4);
                cmd.Parameters.AddWithValue("@radiantHero4Position", teamsToCompare.RadiantHero4Position);
                cmd.Parameters.AddWithValue("@radiantHero5", teamsToCompare.RadiantHero5);
                cmd.Parameters.AddWithValue("@radiantHero5Position", teamsToCompare.RadiantHero5Position);
                cmd.Parameters.AddWithValue("@direHero1", teamsToCompare.DireHero1);
                cmd.Parameters.AddWithValue("@direHero1Position", teamsToCompare.DireHero1Position);
                cmd.Parameters.AddWithValue("@direHero2", teamsToCompare.DireHero2);
                cmd.Parameters.AddWithValue("@direHero2Position", teamsToCompare.DireHero2Position);
                cmd.Parameters.AddWithValue("@direHero3", teamsToCompare.DireHero3);
                cmd.Parameters.AddWithValue("@direHero3Position", teamsToCompare.DireHero3Position);
                cmd.Parameters.AddWithValue("@direHero4", teamsToCompare.DireHero4);
                cmd.Parameters.AddWithValue("@direHero4Position", teamsToCompare.DireHero4Position);
                cmd.Parameters.AddWithValue("@direHero5", teamsToCompare.DireHero5);
                cmd.Parameters.AddWithValue("@direHero5Position", teamsToCompare.DireHero5Position);

                SqlDataReader reader = cmd.ExecuteReader();

                while(reader.Read())
                {
                    if (reader["Radiant Win Rate"].Equals(DBNull.Value))
                    {
                        winPercentages.RadiantWinRate = 0;
                    }
                    else
                    {
                        winPercentages.RadiantWinRate = (decimal)reader["Radiant Win Rate"];
                    }

                    if (reader["Dire Win Rate"].Equals(DBNull.Value))
                    {
                        winPercentages.DireWinRate = 0;
                    }
                    else
                    {
                        winPercentages.DireWinRate = (decimal)reader["Dire Win Rate"];
                    }
                }

                sqlCon.Close();
            }

            winPercentages.ConvertTo100Descrepency();

            return winPercentages;
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

        public void UpdateMatchTemplate(UpdateTemplateInfo templateInfo)
        {
            SqlConnection sqlCon = new SqlConnection(connString);
            {
                sqlCon.Open();

                SqlCommand cmd = sqlCon.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "UpdateMatchup";

                cmd.Parameters.AddWithValue("@matchUp", JsonConvert.SerializeObject(templateInfo));

                cmd.ExecuteNonQuery();

                sqlCon.Close();
            }
        }

        public void DeleteMatchup(int templateId)
        {
            SqlConnection sqlCon = new SqlConnection(connString);
            {
                sqlCon.Open();

                SqlCommand cmd = sqlCon.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "DeleteMatchup";

                cmd.Parameters.AddWithValue("@templateId", templateId);

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

        public List<Hero> getMatchup(int templateId)
        {
            List<Hero> matchupList = new List<Hero>();

            SqlConnection sqlCon = new SqlConnection(connString);
            {
                sqlCon.Open();

                SqlCommand cmd = sqlCon.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetMatchup";

                cmd.Parameters.AddWithValue("@templateId", templateId);

                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Hero heroToAdd = new Hero()
                    {
                        HeroId = (int)reader["HeroId"],
                        IsRadiant = (bool)reader["RadiantTeam"],
                        HeroName = (string)reader["HeroName"],
                        PrimaryAttribute = (int)reader["PrimaryAttribute"],
                        Position = (int)reader["Position"],
                        HeroTier = (int)reader["HeroTier"],
                        HeroImage = (string)reader["HeroImage"],
                        HeroSelectedImage = (string)reader["HeroSelectedImage"],
                        HeroMinimapIcon = (string)reader["HeroMinimapIcon"],
                        HeroWinRate = (decimal)reader["HeroWinRate"],
                        MidWinRate = (decimal)reader["MidWinRate"],
                        OffWinRate = (decimal)reader["OffWinRate"],
                        SafeWinRate = (decimal)reader["SafeWinRate"],
                        JungleWinRate = (decimal)reader["JungleWinRate"],
                        RoamingWinRate = (decimal)reader["RoamingWinRate"]
                    };

                    matchupList.Add(heroToAdd);
                }

                sqlCon.Close();
            }

            return matchupList;
        }
    }

    
}
