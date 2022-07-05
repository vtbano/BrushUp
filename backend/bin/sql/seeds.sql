INSERT INTO creators(username,email,first_name,last_name,password) 
VALUES
('Ophie_Husky','ophiehusky@gmail.com','Ophelia','husky','12345'),
('Matcha','matchatheShiba@gmail.com','Matcha','Shiba','678910');
('Whiskey','whiskeytheP@gmail.com','Whiskey','colliespy','898910');

INSERT INTO quizzes(creators_id,title) 
VALUES 
(1,'Ophie Test Quiz'),
(1,'Ophie Test 2'),
(2,'Matcha Test');

INSERT INTO questions(quizzes_id, question_text, image) 
VALUES
(1,'What is Ophie breed?','testing.img'),
(1,'How old is Ophie?','testing.img'),
(3,'What is Matcha breed?','testing.img'),
(3,'How old is Matcha?','testing.img'),
(3,'How old is Whiskey?','testing.img');

INSERT INTO answer_options(questions_id,correct, answer_text) 
VALUES
(1, 'true', 'Husky'),
(1, 'false', 'Nothing'),
(3, 'true', 'Shiba'),
(3, 'false', 'Cat');


INSERT INTO respondents(quizzes_id,email,secret) 
VALUES

(1, 'stella&chewy@gmail.com', '123qwe'),
(1, 'acana@hotmail.com', '456qwe'),
(2, 'dogchew@tibetan.org', '1099pkp'),
(3, 'cheerio@generamills.ca', 'thie989');

INSERT INTO responses (respondent_id,quizzes_id) 
VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(1,2),
(3,2),
(4,3);