-- MySQL dump 10.19  Distrib 10.3.29-MariaDB, for debian-linux-gnueabihf (armv7l)
--
-- Host: localhost    Database: danieldoescocktails
-- ------------------------------------------------------
-- Server version	10.3.29-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cabinet`
--

DROP TABLE IF EXISTS `cabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabinet` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(1024) NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabinet`
--

LOCK TABLES `cabinet` WRITE;
/*!40000 ALTER TABLE `cabinet` DISABLE KEYS */;
/*!40000 ALTER TABLE `cabinet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cocktail`
--

DROP TABLE IF EXISTS `cocktail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cocktail` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `ingredients` varchar(1024) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `date` char(8) NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cocktail`
--

LOCK TABLES `cocktail` WRITE;
/*!40000 ALTER TABLE `cocktail` DISABLE KEYS */;
INSERT INTO `cocktail` VALUES (54,'Bloody Mary','./images/bloodyMary.jpg','200ml tomato juice/40ml vodka/15ml lemon juice/1 teaspoon of hot sauce/couple of dried chilli peppers/couple of drops of worcestershire sauce/pinch of black pepper/Stirred','Actually really nice. People seem to be scared to try out a bloody mary but just go for it! The story behind this one is that I won a Nandos giveaway and they gave me the stuff to make it - though I don\'t owe them anything, I just thought it\'s funny.','04/04/21'),(52,'Aku Aku','./images/akuAku.jpg','30ml light rum/15ml peach snapps/15ml simple syrup/22.5ml lime juice/45ml pineapple juice/8 mint leaves/Shaken','This is delicious - wow! I had never heard of it and it went completely under the radar until I made it during a cocktail mixo with some friends. The combination of peach snapps, pineapple juice and everything else works so well, I would definitely recommend it.','16/03/21'),(51,'Strawberry Daiquiri','./images/strawberryDaiquiri.jpg','7 muddled strawberries/60ml white rum/15ml lime juice/7.5ml simple syrup/Shaken','Recently even more popular than the original daiquiri, this drink is good for summer thanks to the addition of fresh strawberries. Personally, I actually prefer the original Daiquiri more but it\'s best to try out variations here and there.','09/03/21'),(50,'Daiquiri','./images/daiquiri.jpg','50ml white rum/15ml lime juice/10ml sugar syrup/2 dashes of Angostura Bitters/Shaken','Just like the Gin Martini, somehow it took me way too long to get around to this one. It\'s ratios are well-optimised and it\'s famous for that very reason. Super refreshing and super tasty! To make this on the rocks, just x1.25 the quantities.','07/03/21'),(49,'Batida Rosa','./images/batidaRose.jpg','60ml white rum/30ml pineapple juice/30ml lemon juice/20ml grenadine/Shaken and topped with soda water','A good cocktail for people that like their drinks sweet and fruity.','16/02/21'),(48,'Gin Martini','./images/ginMartini.jpg','60ml really nice dry gin/30ml dry vermouth/Stirred in a mixing glass','Wowee it took me way too long to get around to this one! The dry martini is a deceptively complex drink that can have many different ratios to suit different people. I go with 2:1 (as stated in this recipe) but try it and see what works for you. Fun fact - Winston Churchill used to have his Martini\'s with just gin and a tiny drop of vermouth, so a shot of gin is really a Churchill Martini if you think about it.','15/02/21'),(27,'Tommy\'s Margarita','./images/tommysMargarita.jpg','50ml Blanco tequila/10ml Agave syrup/20ml lime juice/Shaken (salted glass optional)','This cocktail brings a sweet edge to the classic Margarita. Tequila is made from the Agave plant, so the addition of the Agave syrup seriously compliments the drink and brings out that flavour. If you like Tequila then this is a must-try!','21/06/20'),(26,'Margarita','./images/margarita.jpg','50ml Blanco or Reposado tequila/20ml lime juice/20ml triple sec/dash of simple syrup (optional)/Shaken into a salted glass','The Margarita is an absolute classic and one of my all-time favourites. I really like tequila and this recipe really brings out the agave notes of the spirit and is balanced really well with the lime juice and triple sec. It\'s a satisfying cocktail in many settings, whether it be after a long day of hard word or at a wild and intense party. I love to drink this one often.','16/06/20'),(19,'Bennett','./images/bennett.jpg','60ml London Dry Gin/30ml lime juice/22.5ml simple syrup/2-3 dashes of Angostura bitters/Shaken','Cousin to the Gimlet, the Bennett adds both sweetness and bitter aromatics. It\'s basically the much cooler version, though it still retains a dorky name.','19/04/20'),(15,'Honeysuckle Daiquiri','./images/honeysuckleDaiquiri.jpg','60ml White Rum/22.5ml lemon juice/22.5 honey syrup (2:1)/Shaken','A twist on a classic daiquiri. It has subtle honey notes that I really like and it is another recipe that will help me use up my honey syrup.','03/03/20'),(13,'Midori Sour','./images/midoriSour.jpg','60ml Midori Liqueur/30ml lime juice/&frac34; egg white/Dry then wet shaken','Has a wonderful melon taste and a nice foam. Midori seems to make a good base by itself as no other spirit is used in this drink and also it\'s impressive colour means that it is a great one to make for other people.','03/03/20'),(8,'Espresso Martini','./images/espressoMartini.jpg','60ml vodka/50ml Kahlúa Coffee Liqueur/50ml espresso/Shaken','An iconic recipe that seems to be on the menu at every bar and club I\'ve ever walked into. If you want to be fancy then get the espresso fresh from a coffee machine, though if you are like me and don\'t have one then use 36g of fine ground coffee in a french press. I even managed to get instant coffee working at a friends house but I wouldn\'t recommend it as much.','04/12/19'),(43,'Rum Eggnog','./images/eggnog.jpg','(For 1, though best in batches)/1 egg/2tsp sugar/30ml double cream/45ml dark rum/&half; tsp vanilla extract','<span style=\"margin-bottom:auto; font-family: merriweather, Georgia, serif;\">Beat the egg white with 1 tsp of sugar until there are stiff peaks. Whisk the egg yolk seperately then fold into the main mixture, set aside. Beat the double cream, vanilla extract and the rest of the sugar seperately before folding in to the egg mixture. Finish by gently mixing in the rum and refrigerating for a couple hours.</span><br/>This takes a little bit of effort to make, but is an elegant foamy recipe.','24/12/20'),(16,'Paddington Bear','./images/paddingtonBear.jpg','50ml London Dry Gin/25ml Campari/37.5ml orange juice/37.5ml lemon juice/2 teaspoons of marmalade/dash of Angostura orange bitters/Lightly shaken','A local recipe made with local gin <a href=\"https://www.archangel-distilleries.co.uk/\" target=\"_blank\">from Archangel Distilleries.</a> It has a fantastic balance of bitterness from the Campari and the sweetness from the orange components. It\'s really good to get another recipe to use up the Campari, since I don\'t use it that much.','27/03/20'),(12,'Gin Fizz','./images/ginFizz.jpg','60ml London Dry Gin/22.5ml lemon juice/22.5ml simple syrup/&half; egg white/top with soda water/Dry then wet shaken','This recipe has very simple ingredients and is very easy to make. It is a great introduction to sours because it is lengthened by the soda water, and the combination of fizz and egg white can lead to some impressive foaming if done right. Of course this was my first try so it didn\'t quite stand up on it\'s own in this photo.','08/02/20'),(11,'Fireman Sour','./images/firemanSour.jpg','60ml white rum/30ml lime juice/15ml grenadine/&half; egg white/Dry then wet shaken','An unusal cocktail that makes use of grenadine. It has a great combination of the sweet and the sour elements and has a really impressive colour.','08/02/20'),(9,'White Russian','./images/whiteRussian.jpg','35ml vodka/35 Kahlua Coffee Liqueur/Top with milk or half-and-half/Stirred','My favourite cocktail at the moment! This one is a bit like marmite, you either love it or you hate it. Most times I suggest this to people I get lots of \"milk and alcohol - wuuuuuh!?\" but trust me atleast try it once. It\'s like an iced coffee but with alcohol, what more could you ask for? Give this one a go, I keep coming back to it and I can\'t wait to try some variations on it when I get more ingredients.','15/12/19'),(5,'Bramble','./images/bramble.jpg','60ml London Dry Gin/Handful of fresh blackberries/15ml lemon juice/dash of simple syrup/dash of Crème de Mure*/Muddle then stir','Though it sort of looks like Ribena, I can tell you it tastes a lot better than it and has the added bonus of getting you drunker. If you have blackberries then be sure to give this cocktail a try. *The creme de mure is not massively important in this version.','24/10/19'),(1,'Negroni','./images/negroni.jpg','25ml London Dry Gin/25ml Campari/25ml Sweet Vermouth/Stirred for about 20 seconds','The first proper cocktail I\'ve ever made. The negroni is very famous in Italy and elsewhere and they say that you need to drink it thrice before you start to like it. It is very bitter but has a distinct taste. This cocktail is very respectable and there are many different variants on it to check out. I wouldn\'t recommend it as your first cocktail because of the bitterness and potency and the fact you have to buy 3 expensive spirits, but I would definitely recommend it once you get things moving.','25/09/19'),(2,'Bee\'s Knees','./images/beesKnees.jpg','50ml London Dry Gin/20ml honey syrup (2:1)/20ml lemon juice/Shaken','Considering theres only 3 ingredients, this cocktail is wild! I\'d recommend making a big bottle of honey syrup because you\'re going to want to make this often. It has perfect sweetness and allows your chosen gin to take center stage whilst maintaining a noticable note of honey and lemon.','29/09/19'),(3,'Tom Collins','./images/tomCollins.jpg','50ml Old Tom Gin (London Dry works fine)/25ml lemon juice/25ml simple syrup/top with soda water/Shaken','Super easy to make and a pretty famous cocktail. The Tom Collins is probably the most popular Collins recipe and is good at adding a bit of sweetness to your gin and lengthening with soda. It\'s easy to see why it\'s so popular when you taste it, can\'t really go wrong.','06/10/19'),(4,'Cucumber Lemonade','./images/cucumberLemonade.jpg','60ml Londo Dry Gin/30ml cucumber juice/15ml lemon juice/dash of simple syrup/top with soda water/Shaken','Honestly this cocktail is strange. It tastes alright and if you really like cucumber then give it a go but I\'m not completely sold on the concept of cucumber together with alcohol yet.','14/10/19'),(6,'Gin and Jam','./images/ginAndJam.jpg','60ml London Dry Gin/30ml lemon juice/2tsp raspberry jam/15ml (or to taste) simple syrup/Shaken with 1 tsp of jam, stirred in the glass with the other.','Sounds super weird right? Well... it\'s delicious, has a wonderful sweetness and has a beautiful colour. This one has been especially popular with my friends who seem to love the combination so it\'s a real crowd-pleaser. This cocktail is also very entry-level, no liqueurs needed!','30/10/19'),(7,'Cosmopolitan','./images/cosmopolitan.jpg','50ml vodka/25ml cranberry juice*/25ml triple sec/squeeze of lime/Shaken','Everyone knows about the Cosmo as it\'s a super popular drink, this recipe makes a tasty cosmo just like you could get on a night out. *The amount of cranberry juice can be varied depending on how concentrated or diluted it is. Looking back, 25ml was a bit too much for the cocktail I made in the picture, so look for a lighter colour ideally.','21/11/19'),(10,'Kamikaze','./images/kamikaze.jpg','30ml vodka/30ml lime juice/30ml triple sec/Shaken','The kamikaze definitely lives up to it\'s name in it\'s sourness. Despite this, it\'s a pleasing cocktail that has a clean citrusy taste.','15/12/19'),(14,'Moscow Mule','./images/moscowMule.jpg','60ml vodka/Juice from half of a lime/30ml simple syrup/top with ginger beer/Shaken','An explosive drink that is easy to make and has a strong gingery punch. Typically you\'d put this in a copper mule mug but I didn\'t have one of those so I just used regular mugs - still works just less flashy.','03/03/20'),(17,'Breakfast Martini','./images/breakfastMartini.jpg','40ml London Dry Gin/20ml triple sec/10ml lemon juice/1 barspoon of marmalade/Shaken','Lots of my recent cocktail have been very citrusy and here\'s another to add to that trend. This cocktail (and the last) is great if you have some orange marmalade lying around, it adds sweetness and a unique flavour to an otherwise standard cocktail.','29/03/20'),(18,'Gimlet','./images/gimlet.jpg','60ml London Dry Gin/15ml lime juice/Shaken','If you\'re running extremely low on ingredients, why not have your gin almost neat! This is an iconic cocktail from all the way back in the 1930s. Theres not much to say about this one, it\'s gin and juice, it works.','15/04/20'),(20,'Angostura Sour','./images/angosturaSour.jpg','30ml Angostura Bitters/30ml lime juice/30ml simple syrup/Dry then wet shaken','Most recipes only use a couple dashes of bitters, but have you ever wondered what would happen if you used a whole shot of it? Well it\'s actually very delicious, rich and of-course has Angostura\'s signature notes of cinnamon and other herbs and spices. It\'s also balanced really well with the sour and sweet components and worked much better than I thought it would. Note: Yes it should normally be in a martini glass.','26/04/20'),(21,'Gin Rickey','./images/ginRickey.jpg','60ml London Dry Gin/1tbsp lime juice/1tbsp simple syrup/top with soda water/Stirred','If you are low on ingredients like myself, then here is another one for you. Similiar to the Tom Collins but with more of a kick, this recipe makes a triumphantly sharp, zingy and refreshing cocktail. It\'s very simple and would be great on a hot day.','10/05/20'),(22,'Gilbert Grape','./images/gilbertGrape.jpg','Handful seedless green grapes/2-3 thyme sprigs (+ garnish)/1 tbsp brown sugar/60ml London Dry Gin/30ml brown sugar syrup (2:1,W:S)/15ml lime juice/top with soda water/Heat the grapes and thyme -/then muddle with sugar before shaking altogether.','This cocktail tastes as golden as it looks. While I expected the sugar and grapes to overpower the rest, I was suprised with how wonderfully balanced and mellow the drink is. This one is definitely another favourite.','17/05/20'),(23,'French Martini','./images/frenchMartini.jpg','60ml vodka/15ml Crème de Cassis (or Chambord)/45ml pineapple juice/Shaken','A wonderful drink that is nicely fruity and boozy and that is also neither French nor a Martini. Usually this cocktail is done with Chambord (raspberry liqueur), but Crème de Cassis (blackcurrant liqueur) substitutes nicely if you happen to have that on-hand instead, providing a slightly sharper taste.','24/05/20'),(24,'Pina Colada','./images/pinaColada.jpg','60ml white rum/90ml pineapple juice/35ml coconut milk/6 pineapple chunks/Blended (with ~10 ice cubes)','Aery and delicious. This cocktail packs a summer punch that is sure to take anyone who drinks it straight to the Carribean, even those like me in dreary old England. This cocktail is a very popular classic so there are many variations; for example if you do not have access to a blender, change the recipe to 45ml of both lime juice and coconut milk and 15ml of lime juice and shake into a glass full of crushed ice. That is just one variation of many.','07/06/20'),(25,'Americano','./images/americano.jpg','45ml Campari/45ml Sweet Vermouth/top with soda water/Lightly stirred','The predecessor to the Negroni, all the way from the 1860s. This cocktail packs the same punch as the afore-mentioned cocktail, but with a bit of fizz as-well.','14/06/20'),(28,'Paloma','./images/paloma.jpg','50ml Blanco or Reposado tequila/20ml lime juice/Cap shaken then topped with grapefruit soda','Continuing with my recent tequila themed recipes, this is a popular cocktail that mixes grapefruit with tequila and lime juice, granting the perfect amount of acidity and taste. There are multiple different variations of this recipe, this one being probably the most simpliest and easiest to make. The grapefruit soda can be switched for pure grapefruit juice and soda water to make another variation on this recipe.','28/06/20'),(29,'El Diablo','./images/elDiablo.jpg','45ml Blanco or Reposado tequila/15ml Crème de Cassis/22.5ml lime juice/Shaken then topped with Ginger Beer','All the different components combine very well to create this well-known cocktail. Each flavour is very distinctive and delicious.','05/07/20'),(30,'Enzoni','./images/enzoni.jpg','30ml London Dry Gin/30ml Campari/22.5ml lemon juice/15ml simple syrup/5 white grapes, muddled/Shaken','All the flavours from this cocktail balance so there is a perfect combination of sweetness and bitterness, leading to a sublime taste, especially with the muddled grapes. This is a riff on the Negroni, and it is much more approachable because it is sweeter and less potent. I definitely recommend giving this one a go as it is a brilliant Campari cocktail.','12/07/20'),(31,'Tequila Sunrise','./images/tequilaSunrise.jpg','5ml grenadine/5ml Crème de Cassis/45ml Reposado tequila/22.5ml triple sec/75ml orange juice/Pour the grenadine and creme de cassis in a glass with ice, shake the other ingredients.','Very well known and for good reason. Not only does this drink look absolutely stunning, it\'s flavour-profile changes to become sweeter as you get further into the drink. I definitely recommend this drink but be careful because it\'ll be downed before you know it.','02/08/20'),(32,'Sea Breeze','./images/seaBreeze.jpg','60ml vodka/90ml cranberry juice/60ml grapefruit juice/Shaken','I don\'t know if I\'m being overly poetic, but the drink does feel like the sea breeze. It starts with a sweet taste before you are immediately hit with the dryness of the vodka, sort of like when the wind picks up at the beach. Not only does it taste great, this one will also get you drunk very quickly.','02/08/20'),(33,'Dark and Stormy','./images/darkAndStormy.jpg','50ml dark rum/20ml lime juice/10ml sugar syrup/2 dashes of Angostura Bitters/top with ginger beer/Shaken','This is a national drink of Bermuda! It\'s like the cooler older-brother of the Moscow Mule. The dark rum lends itself well to the ginger beer and I think it tastes a little less dry than the mule. I recommend giving this one a try.','10/08/20'),(34,'Conquistador','./images/conquistador.jpg','30ml dark rum/30ml Blanco tequila/22.5ml simple syrup/15ml lemon juice/15ml lime juice/2 dashes of orange bitters/1 egg white/Dry then wet shaken','A boozy sour cocktail with a satisfying flavour profile. Each mouthful gives a distinct taste of tequila, quickly followed by the power of aged rum.','16/08/20'),(35,'Salty Bird','./images/saltyBird.jpg','45ml white rum/22.5ml Campari/45ml pineapple juice/15ml lime juice/15ml simple syrup/pinch of salt/Shaken','A bittersweet cocktail with tasty notes of pineapple and Campari, delicious.','30/08/20'),(36,'Russian Spring Punch','./images/russianSpringPunch.jpg','45ml vodka/7.5ml Crème de Framboise/7.5ml Crème de Cassis/22.5ml lemon juice/7.5ml simple syrup/Shaken then topped with Prosecco or Champagne','A classic 80s cocktail that is very boozy. The story behind this one is that it\'s creator, Dick Bradsell, had a friend who wanted to host a cocktail party but didn\'t have much money so wanted something cost-effective. They told guests to bring their own prosecco or champagne and they would mix the rest, meaning guests who brought an expensive bottle would still get an expensive-tasting cocktail.','11/09/20'),(37,'Blood and Smoke','./images/bloodAndSmoke.jpg','30ml Blanco or Reposado tequila/30ml Mezcal/30ml lime juice/30ml blood orange juice/10ml agave syrup/pinch of salt/Shaken','Tart and citrusy, this drink is a great blend of flavours and is a great variation of a margarita. The smokeyness from the Mezcal is also a great addition - but the cocktail works just as well with double tequila if you don\'t have any with you. I found this unique cocktail from <a href=\"https://www.instagram.com/houseofhogo/\" target=\"_blank\">@houseofhogo</a>.','26/09/20'),(38,'Blackberry Margarita','./images/blackberryMargarita.jpg','60ml Blanco tequila/30ml triple sec/8 muddled blackberries/5ml agave syrup/Shaken','Another variation on the classic margarita, this time making the cocktail sharp and tangy. These kind of recipes are great if you are low on spirits and want to do a lot with less.','29/09/20'),(39,'Pornstar Martini','./images/pornstarMartini.jpg','60ml Vanilla Vodka/15ml simple syrup/15ml lime juice/25ml passionfruit liqueur/Shaken','One of the first cocktails I have made with my <a href=\"https://www.instagram.com/nuflairsoc/\" target=\"_blank\">university\'s cocktail society</a>! Everyone knows this cocktail, it\'s probably one of the most popular in Britain right now. Defintiely try this out, it\'s well-loved for a reason!','14/10/20'),(40,'Amaretto Sour','./images/amarettoSour.jpg','50ml Amaretto/25ml lemon juice/&half; egg white/Dry then wet shaken','A very delicious nutty, sweet and sour cocktail that I absolutely adore. The balance of these simple flavours mean it\'s probably my favourite sour so far! I could have it again and again which is great considering Amaretto is so much cheaper than lots of other alcohol.','29/11/20'),(41,'Bacardi Special','./images/bacardiSpecial.jpg','45ml white rum/22.5ml gin/15ml lime juice/7.5ml grenadine/5ml sugar syrup/Shaken','The perfect combination of gin and rum that will surely get you drunk very quickly.','13/12/20'),(42,'Christmas Daiquiri','./images/christmasDaiquiri.jpg','50ml aged rum/15ml lime juice/15ml Velvet Falernum/15ml cranberry juice/4 dashes of Angostura bitters/Shaken','This is a wonderful addition to christmas as it has warm notes from the rum and is elevated by the use of Falernum instead of sugar syrup and by the sharp taste of cranberry. I definitely recommend giving this one a try during the festive season.','20/12/20'),(44,'Hot Mexicano','images/hotMexicano.jpg','35ml tequila (any)/15ml triple sec/Nearly topped with hot coffee/Finish with cream','A great winter-warmer for when you want a coffee but you also want alcohol. It has a strong sharp tequila flavour mixed with that of coffee.','28/12/20'),(45,'Bella Donna','./images/bellaDonna.jpg','45ml dark rum/45ml Amaretto/15ml lemon juice/7.5ml sugar syrup/Shaken','Tastes delicious and is a great use of amaretto.','04/01/21'),(46,'Floradora','images/floradora.jpg','52.5ml gin/22.5ml lime juice/22.5ml raspberry liqueur/Shaken and topped with ginger ale','Definitely a favourite of late, this cocktail has a perfect sweet blend of flavours. The raspberry and the ginger go very well together and I recommend giving this a try.','26/01/21'),(47,'Old Fashioned','./images/oldFashioned.jpg','60ml whiskey/10ml sugar syrup/2 dashes of Angostura Bitters/Stirred','A super simple cocktail that can sweeten a whiskey and bring out it\'s flavour.','11/02/21'),(53,'Bermuda Cocktail','./images/bermudaCocktail.jpg','60ml gin/15ml peach snapps/15ml orange juice/7.5ml grenadine/Shaken','Bermuda sure has a lot of cocktails. THis one is very refresing and has a perfect balance of dryness and sweetness. Another good one for summer.','21/03/21'),(55,'Merchant of Venice','./images/merchantOfVenice.jpg','60ml vodka/10ml honey/15ml Aperol/15ml lemon juice/15ml egg white/Dry then wet shaken','The first Aperol cocktail I\'ve made for the site. It\'s a nicely balanced sour cocktail with healthy serving of vodka.','28/04/21'),(56,'The Casino','./images/casino.jpg','45ml gin/22.5ml maraschino liqueur/1 dash of orange bitters/Shaken','Okay, I finally coughed up the dough for some Maraschino liqueur. It tastes of money, aswell as cherries that have been well rested. I made this particular cocktail while watching the Monaco Grand Prix and as expected from Monaco, the cocktail was way better than the race.','23/05/21'),(57,'King\'s Jubilee','./images/kingsJubilee.jpg','40ml white rum/15ml maraschino liqueur/10ml lemon juice/Shaken','Similiar to \'the Casino\', this cocktail uses rum instead of gin and works very well with the cherry liqueur.','30/05/21'),(58,'Rum Swizzle','./images/rumSwizzle.jpg','50ml dark rum/25ml lime juice/20ml sugar syrup/10ml velvet falernum/2 dashes of Angostura bitters/Swizzled (or stirred) with crushed ice','Another beautiful cocktail hailing from Bermuda. This one showcases your choice of dark rum and simply balances it. That being said, be careful if you use overproof rum like we did haha.','04/06/21'),(59,'Mojito','./images/mojito.jpg','14 mint leaves/60ml white rum/15ml lime juice/10ml sugar syrup/15ml soda water/First 4 ingredients stirred with crushed ice,/then topped with soda.','Despite the hype, originally I wasn\'t huge on this drink. The more I\'ve had it though, the more I\'ve liked it. The focus on mint means that it is probably the most refreshing and palate cleansing drink there is.','28/06/21');
/*!40000 ALTER TABLE `cocktail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel`
--

DROP TABLE IF EXISTS `travel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travel` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `image` varchar(255) NOT NULL,
  `location` varchar(256) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `date` char(8) NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel`
--

LOCK TABLES `travel` WRITE;
/*!40000 ALTER TABLE `travel` DISABLE KEYS */;
INSERT INTO `travel` VALUES (5,'Zombie','./images/zombie.jpg','Coco Tang Nottingham','Rum, rum and more rum! This cocktail is one of the booziest I\'ve ever had and it still manages to taste beautifully fruity. Coco Tang is also a great oriental themed bar in Nottingham with live music and lots of original cocktails to try. Only thing is it is really damn expensive so makesure you don\'t forget your wallet.','28/05/21'),(2,'Tuk Tuk Riksaw','./images/tukTukRiksaw.jpg','Kama Vineet London','This cocktail was really nice with notes of apple and citrus, it was very good in accompanying the Indian currys served at the restaurant. I\'ll admit this one is a bit of a flex but I don\'t do fancy stuff like this all the time.','12/12/19'),(1,'Tokyo Iced Tea','./images/tokyoIcedTea.jpg','Mr Postles Norwich','While most people know the Long Island Iced Tea, which uses cola and a bunch of different spirits, the Tokyo Iced Tea swaps out the cola for Midori, a melon based liqueur from Japan. It was great, it has a brilliant sweet and fruity taste. Mr Postles is also a punchy and loud bar near Norwich\'s city center which is good for either pre-drinks or the main event.','17/11/19'),(3,'Singapore Sling','./images/singaporeSling.jpg','Changi Airport','A nicely sweet and refreshing cocktail. This one will always bring great memories to me as I had it when transiting on my way back from my holiday in New Zealand. If you ever pass through this airport, make sure to visit the cactus garden and enjoy a Singapore Sling in Singapore.','23/01/20'),(4,'Tiki Punch','./images/tikiPunch.jpg','Pepperrocks Nottingham','A rum cocktail that\'s very boozy and tastes of pineapple and burnt sugar. This was one of the many fantastic cotkails I\'ve had at Pepperrocks and I highly recommend visiting there. The atmosphere of this bar is very cozy and it\'s just an awesome place to be.','19/10/20');
/*!40000 ALTER TABLE `travel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-19 18:51:41
