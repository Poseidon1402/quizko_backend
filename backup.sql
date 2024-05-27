-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: quizko
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `question_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `answers_question_id_foreign` (`question_id`),
  CONSTRAINT `answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'Android est un navigateur web',0,1,'2024-05-26 17:31:00','2024-05-26 17:31:00'),(2,'Android est une application web',0,1,'2024-05-26 17:31:00','2024-05-26 17:31:00'),(3,'Android est un serveur web',0,1,'2024-05-26 17:31:00','2024-05-26 17:31:00'),(4,'Android est un système d’exploitation',1,1,'2024-05-26 17:31:00','2024-05-26 17:31:00'),(5,'Sourceforge',0,2,'2024-05-26 17:31:58','2024-05-26 17:31:58'),(6,'Apache/MIT',1,2,'2024-05-26 17:31:58','2024-05-26 17:31:58'),(7,'OSS',0,2,'2024-05-26 17:31:58','2024-05-26 17:31:58'),(8,'Aucune des catégories ci-dessus',0,2,'2024-05-26 17:31:58','2024-05-26 17:31:58'),(9,'Serveurs',0,3,'2024-05-26 17:33:16','2024-05-26 17:33:16'),(10,'Ordinateurs de bureau',0,3,'2024-05-26 17:33:16','2024-05-26 17:33:16'),(11,'Ordinateurs portables',0,3,'2024-05-26 17:33:16','2024-05-26 17:33:16'),(12,'Appareils mobiles',1,3,'2024-05-26 17:33:16','2024-05-26 17:33:16'),(13,'HTC Hero',0,4,'2024-05-26 17:34:12','2024-05-26 17:34:12'),(14,'Nokia',0,4,'2024-05-26 17:34:12','2024-05-26 17:34:12'),(15,'T-Mobile G1',1,4,'2024-05-26 17:34:12','2024-05-26 17:34:12'),(16,'Google gPhone',0,4,'2024-05-26 17:34:12','2024-05-26 17:34:12'),(17,'Machine virtuelle Dalvik',1,5,'2024-05-26 17:35:16','2024-05-26 17:35:16'),(18,'Machine virtuelle simple',0,5,'2024-05-26 17:35:16','2024-05-26 17:35:16'),(19,'JVM',0,5,'2024-05-26 17:35:16','2024-05-26 17:35:16'),(20,'VirtualBox',0,5,'2024-05-26 17:35:16','2024-05-26 17:35:16'),(21,'C',0,6,'2024-05-26 17:36:19','2024-05-26 17:36:19'),(22,'C++',0,6,'2024-05-26 17:36:19','2024-05-26 17:36:19'),(23,'C#',0,6,'2024-05-26 17:36:19','2024-05-26 17:36:19'),(24,'Java',1,6,'2024-05-26 17:36:19','2024-05-26 17:36:19'),(25,'Android Package Kit',1,7,'2024-05-26 17:37:31','2024-05-26 17:37:31'),(26,'Android Page Kit',0,7,'2024-05-26 17:37:31','2024-05-26 17:37:31'),(27,'Android Phone Kit',0,7,'2024-05-26 17:37:31','2024-05-26 17:37:31'),(28,'Aucune de ces réponses',0,7,'2024-05-26 17:37:31','2024-05-26 17:37:31'),(29,'Application Page Interface',0,8,'2024-05-26 17:38:35','2024-05-26 17:38:35'),(30,'Android Page Interface',0,8,'2024-05-26 17:38:35','2024-05-26 17:38:35'),(31,'Application Programming Interface',1,8,'2024-05-26 17:38:35','2024-05-26 17:38:35'),(32,'Android Programming Interface',0,8,'2024-05-26 17:38:35','2024-05-26 17:38:35'),(33,'Classe android',0,9,'2024-05-26 17:40:15','2024-05-26 17:40:15'),(34,'Package android',0,9,'2024-05-26 17:40:15','2024-05-26 17:40:15'),(35,'Représente un écran dans une application Android.',1,9,'2024-05-26 17:40:15','2024-05-26 17:40:15'),(36,'Aucune de ces réponses',0,9,'2024-05-26 17:40:15','2024-05-26 17:40:15'),(37,'En utilisant la méthode finish()',0,10,'2024-05-26 17:41:18','2024-05-26 17:41:18'),(38,'En utilisant la méthode finishActivity(int requestCode)',0,10,'2024-05-26 17:41:18','2024-05-26 17:41:18'),(39,'Les deux A et B',1,10,'2024-05-26 17:41:18','2024-05-26 17:41:18'),(40,'Aucune de ces réponses',0,10,'2024-05-26 17:41:18','2024-05-26 17:41:18'),(41,'En utilisant la méthode stopSelf() et stopService()',1,11,'2024-05-26 17:43:45','2024-05-26 17:43:45'),(42,'En utilisant la méthode finish()',0,11,'2024-05-26 17:43:45','2024-05-26 17:43:45'),(43,'En utilisant la méthode system.exit()',0,11,'2024-05-26 17:43:45','2024-05-26 17:43:45'),(44,'Aucune de ces méthodes',0,11,'2024-05-26 17:43:45','2024-05-26 17:43:45'),(45,'Compilateur Dex',1,12,'2024-05-26 17:44:28','2024-05-26 17:44:28'),(46,'Le convertisseur Dalvik',0,12,'2024-05-26 17:44:28','2024-05-26 17:44:28'),(47,'Android Studio',0,12,'2024-05-26 17:44:28','2024-05-26 17:44:28'),(48,'Compilateur MIC',0,12,'2024-05-26 17:44:28','2024-05-26 17:44:28'),(49,'Android Debug Bridge',1,13,'2024-05-26 17:45:24','2024-05-26 17:45:24'),(50,'Android Delete Bridge',0,13,'2024-05-26 17:45:24','2024-05-26 17:45:24'),(51,'Android Destroy Bridge',0,13,'2024-05-26 17:45:24','2024-05-26 17:45:24'),(52,'Aucune de ces réponses',0,13,'2024-05-26 17:45:24','2024-05-26 17:45:24'),(53,'Les émulateurs tiers',0,14,'2024-05-26 17:46:34','2024-05-26 17:46:34'),(54,'Emulateur inclus dans Android SDK',0,14,'2024-05-26 17:46:34','2024-05-26 17:46:34'),(55,'Téléphone androïde physique',0,14,'2024-05-26 17:46:34','2024-05-26 17:46:34'),(56,'Toutes les réponses sont vraies',1,14,'2024-05-26 17:46:34','2024-05-26 17:46:34'),(57,'MAC',0,15,'2024-05-26 17:47:27','2024-05-26 17:47:27'),(58,'Windows',0,15,'2024-05-26 17:47:27','2024-05-26 17:47:27'),(59,'Linux',1,15,'2024-05-26 17:47:27','2024-05-26 17:47:27'),(60,'Redhat',0,15,'2024-05-26 17:47:27','2024-05-26 17:47:27'),(61,'Méthode onRestart()',0,16,'2024-05-26 17:48:07','2024-05-26 17:48:07'),(62,'Méthode onStart()',0,16,'2024-05-26 17:48:07','2024-05-26 17:48:07'),(63,'Méthode onCreate()',1,16,'2024-05-26 17:48:07','2024-05-26 17:48:07'),(64,'Méthode onClick()',0,16,'2024-05-26 17:48:07','2024-05-26 17:48:07'),(65,'Méthode onClick()',0,17,'2024-05-26 17:48:51','2024-05-26 17:48:51'),(66,'Méthode onCreate()',0,17,'2024-05-26 17:48:51','2024-05-26 17:48:51'),(67,'Méthode onStart()',0,17,'2024-05-26 17:48:51','2024-05-26 17:48:51'),(68,'Méthode onBackPressed()',1,17,'2024-05-26 17:48:51','2024-05-26 17:48:51'),(69,'Android Virtual Display',0,18,'2024-05-26 17:49:25','2024-05-26 17:49:25'),(70,'Android Virtual Device',1,18,'2024-05-26 17:49:25','2024-05-26 17:49:25'),(71,'Active Virtual Device',0,18,'2024-05-26 17:49:25','2024-05-26 17:49:25'),(72,'Active Virtual Display',0,18,'2024-05-26 17:49:25','2024-05-26 17:49:25'),(73,'Oui',1,19,'2024-05-26 17:50:17','2024-05-26 17:50:17'),(74,'Non',0,19,'2024-05-26 17:50:17','2024-05-26 17:50:17'),(75,'Peut-être',0,19,'2024-05-26 17:50:17','2024-05-26 17:50:17'),(76,'Je ne sais pas !',0,19,'2024-05-26 17:50:17','2024-05-26 17:50:17'),(77,'Pour stocker les données dans la base de données',1,20,'2024-05-26 17:50:59','2024-05-26 17:50:59'),(78,'Pour partager les données entre les applications',0,20,'2024-05-26 17:50:59','2024-05-26 17:50:59'),(79,'Pour envoyer les données d’une application à une autre application.',0,20,'2024-05-26 17:50:59','2024-05-26 17:50:59'),(80,'Aucune de ces réponses.',0,20,'2024-05-26 17:50:59','2024-05-26 17:50:59');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_answer`
--

DROP TABLE IF EXISTS `candidate_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_answers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `point` int DEFAULT NULL,
  `answer_of_candidate` text COLLATE utf8mb4_unicode_ci,
  `interview_id` bigint unsigned NOT NULL,
  `candidate_id` bigint unsigned NOT NULL,
  `answer_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_answer_interview_id_foreign` (`interview_id`),
  KEY `candidate_answer_candidate_id_foreign` (`candidate_id`),
  KEY `candidate_answer_answer_id_foreign` (`answer_id`),
  CONSTRAINT `candidate_answer_answer_id_foreign` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_answer_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_answer_interview_id_foreign` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_answer`
--

LOCK TABLES `candidate_answers` WRITE;
/*!40000 ALTER TABLE `candidate_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidate_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_notes`
--

DROP TABLE IF EXISTS `candidate_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate_notes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `note` int DEFAULT NULL,
  `interim_note` int DEFAULT NULL,
  `interview_id` bigint unsigned NOT NULL,
  `candidate_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_notes_interview_id_foreign` (`interview_id`),
  KEY `candidate_notes_candidate_id_foreign` (`candidate_id`),
  CONSTRAINT `candidate_notes_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_notes_interview_id_foreign` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_notes`
--

LOCK TABLES `candidate_notes` WRITE;
/*!40000 ALTER TABLE `candidate_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidate_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `registration_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `post_id` bigint unsigned DEFAULT NULL,
  `status` enum('admitted','pending','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `gender` enum('masculine','feminine') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidates_registration_number_unique` (`registration_number`),
  KEY `candidates_user_id_foreign` (`user_id`),
  KEY `candidates_post_id_foreign` (`post_id`),
  CONSTRAINT `candidates_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidates_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (2,'ADMIN_123',2,NULL,'pending','feminine','2024-05-26 16:42:23','2024-05-26 16:42:23'),(5,'2310',5,1,'pending','masculine','2024-05-26 18:11:55','2024-05-26 18:11:55');
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews`
--

DROP TABLE IF EXISTS `interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `time` time NOT NULL,
  `is_expired` tinyint(1) NOT NULL DEFAULT '0',
  `post_id` bigint unsigned NOT NULL,
  `subject_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `interviews_post_id_foreign` (`post_id`),
  KEY `interviews_subject_id_foreign` (`subject_id`),
  CONSTRAINT `interviews_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `interviews_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews`
--

LOCK TABLES `interviews` WRITE;
/*!40000 ALTER TABLE `interviews` DISABLE KEYS */;
INSERT INTO `interviews` VALUES (1,'Test Android 1','2024-05-26 21:07:00','2024-05-26 21:30:00','00:30:00',0,1,1,'2024-05-26 18:07:43','2024-05-26 18:07:43');
/*!40000 ALTER TABLE `interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2024_03_13_062851_add_fields_to_users',1),(6,'2024_03_13_063907_create_departments_table',1),(7,'2024_03_13_064416_create_recruiters_table',1),(8,'2024_03_13_070059_create_posts_table',1),(9,'2024_03_13_070826_create_candidates_table',1),(10,'2024_03_13_072843_create_questions_table',1),(11,'2024_03_13_073026_create_answers_table',1),(12,'2024_03_13_073244_create_subjects_table',1),(13,'2024_03_13_081532_create_interviews_table',1),(14,'2024_03_13_094950_create_candidate_answer_table',1),(15,'2024_03_18_052309_add_timestamps_to_question_subjects',1),(16,'2024_03_22_114528_create_candidate_notes_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (4,'App\\Models\\User',2,'api-token','10089906ed8c812b6744e542d2cab5e62ef6abf6e87e8dca6dd05e6fc5819709','[\"*\"]',NULL,NULL,'2024-05-26 16:42:23','2024-05-26 16:42:23'),(5,'App\\Models\\User',3,'api-token','8c2869395a4165ce514800c055e2d1d62dd3efcc318886c27c840e829f03b038','[\"*\"]',NULL,NULL,'2024-05-26 18:03:12','2024-05-26 18:03:12'),(6,'App\\Models\\User',1,'api-token','f0bb0cd760558c5c4435ce996bde7951bc1111da68ed54a0604259520be4f361','[\"*\"]',NULL,NULL,'2024-05-26 18:03:41','2024-05-26 18:03:41'),(7,'App\\Models\\User',4,'api-token','a67bf69b82c377f226c01430bdad7b8d9b28669c80ab900a6547f1f1542ff849','[\"*\"]',NULL,NULL,'2024-05-26 18:03:59','2024-05-26 18:03:59'),(21,'App\\Models\\User',5,'api-token','ed74a378da78c79f1a05627d7ced58e88fbda3fc99f61002ba874c85f3150665','[\"*\"]','2024-05-27 12:58:04',NULL,'2024-05-27 12:58:04','2024-05-27 12:58:04');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `nb_allowed` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'1ère année de Master','Ecole Nationale d\'Informatique',1,NULL,'2024-05-26 17:59:23','2024-05-26 17:59:23');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_subjects`
--

DROP TABLE IF EXISTS `question_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_subjects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question_id` bigint unsigned NOT NULL,
  `subject_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_subjects_question_id_foreign` (`question_id`),
  KEY `question_subjects_subject_id_foreign` (`subject_id`),
  CONSTRAINT `question_subjects_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `question_subjects_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_subjects`
--

LOCK TABLES `question_subjects` WRITE;
/*!40000 ALTER TABLE `question_subjects` DISABLE KEYS */;
INSERT INTO `question_subjects` VALUES (1,1,1,NULL,NULL),(2,2,1,NULL,NULL),(3,3,1,NULL,NULL),(4,4,1,NULL,NULL),(5,5,1,NULL,NULL),(6,6,1,NULL,NULL),(7,7,1,NULL,NULL),(8,8,1,NULL,NULL),(9,9,1,NULL,NULL),(10,10,1,NULL,NULL),(11,11,1,NULL,NULL),(12,12,1,NULL,NULL),(13,13,1,NULL,NULL),(14,14,1,NULL,NULL),(15,15,1,NULL,NULL),(16,16,1,NULL,NULL),(17,17,1,NULL,NULL),(18,18,1,NULL,NULL),(19,19,1,NULL,NULL),(20,20,1,NULL,NULL);
/*!40000 ALTER TABLE `question_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `point` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Choisissez la bonne réponse concernant Android',1,'2024-05-26 17:31:00','2024-05-26 17:31:00'),(2,'Sous quelle licence Android se trouve-t-il ?',1,'2024-05-26 17:31:58','2024-05-26 17:31:58'),(3,'Pour qui Android est-il principalement développé ?',1,'2024-05-26 17:33:16','2024-05-26 17:33:16'),(4,'Lequel des produits suivants est le premier téléphone mobile fonctionnant avec le système d’exploitation Android ?',1,'2024-05-26 17:34:12','2024-05-26 17:34:12'),(5,'Laquelle des machines virtuelles suivantes est utilisée par le système d’exploitation Android ?',1,'2024-05-26 17:35:16','2024-05-26 17:35:16'),(6,'Android est basé sur quel langage ?',1,'2024-05-26 17:36:18','2024-05-26 17:36:45'),(7,'APK signifie _____ ______ ______',1,'2024-05-26 17:37:31','2024-05-26 17:37:31'),(8,'API signifie _____ ______ ______',1,'2024-05-26 17:38:35','2024-05-26 17:38:35'),(9,'Qu’est-ce qu’une activité en Android ?',1,'2024-05-26 17:40:15','2024-05-26 17:40:15'),(10,'Comment peut-on tuer une activité dans Android ?',1,'2024-05-26 17:41:18','2024-05-26 17:41:18'),(11,'Comment arrêter les services dans Android ?',1,'2024-05-26 17:43:45','2024-05-26 17:43:45'),(12,'Lequel des éléments suivants convertit le byte code Java en byte code Dalvik ?',1,'2024-05-26 17:44:28','2024-05-26 17:44:28'),(13,'ADB signifie _____ ______ ______',1,'2024-05-26 17:45:24','2024-05-26 17:45:24'),(14,'Sur lequel des éléments suivants les développeurs peuvent-ils tester l’application, pendant le développement des applications android ?',1,'2024-05-26 17:46:34','2024-05-26 17:46:34'),(15,'Lequel des noyaux suivants est utilisé dans Android ?',1,'2024-05-26 17:47:27','2024-05-26 17:47:27'),(16,'Laquelle des méthodes suivantes est la première méthode callback invoquée par le système au cours du cycle de vie d’une activité ?',1,'2024-05-26 17:48:07','2024-05-26 17:48:07'),(17,'Lequel des éléments suivants n’est pas une méthode callback du cycle de vie d’une activité ?',1,'2024-05-26 17:48:51','2024-05-26 17:48:51'),(18,'Nous avons besoin d’un AVD pour créer un émulateur. Que signifie AVD ?',1,'2024-05-26 17:49:25','2024-05-26 17:49:25'),(19,'Android supporte-t-il d’autres langages que Java ?',1,'2024-05-26 17:50:17','2024-05-26 17:50:17'),(20,'Quelle est l’utilité du fournisseur de contenu(ContentProvider) dans Android?',1,'2024-05-26 17:50:59','2024-05-26 17:50:59');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recruiters`
--

DROP TABLE IF EXISTS `recruiters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recruiters` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `department_id` bigint unsigned NOT NULL,
  `job_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recruiters_user_id_foreign` (`user_id`),
  KEY `recruiters_department_id_foreign` (`department_id`),
  CONSTRAINT `recruiters_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recruiters_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recruiters`
--

LOCK TABLES `recruiters` WRITE;
/*!40000 ALTER TABLE `recruiters` DISABLE KEYS */;
/*!40000 ALTER TABLE `recruiters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'QCM Android 1','2024-05-26 17:52:54','2024-05-26 17:52:54');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','recruiter','candidate') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'candidate',
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'John Doe','admin@gmail.com',NULL,'$2y$12$Aeo4LNJM2OTwdlj6cdSyM.BGuIxVhepQorZDQTGfao58Sc1kNBc.e','pngh5xXgU9Pc2daCx04MxnXuX0p9ppwM3frNhvdQ834JTCWt0Vu4IJwXaseo','2024-05-26 16:42:23','2024-05-26 16:42:23','admin',NULL,NULL,NULL,NULL,NULL),(5,'RAJOELISON Aina Tiavina','rjls.tiavina@gmail.com',NULL,'$2y$12$ixU81p5vg4BEU.p/D7aMeevUOHFYhRHVgPXnfFQ1LSaz0BsXidAJm',NULL,'2024-05-26 18:11:55','2024-05-26 18:11:55','candidate',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-27 13:01:32
