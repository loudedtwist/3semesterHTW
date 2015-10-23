CREATE TABLE FACH(
ID INT PRIMARY KEY NOT NULL,
KURZBEZ CHAR(10) NOT NULL,
FACH TEXT NOT NULL,
LINK TEXT NOT NULL,
LOGIN TEXT NOT NULL,
PASSWORD TEXT NOT NULL);

INSERT INTO FACH VALUES 
(4,
'DBS II', 
'Datenbanksysteme II', 
'http://www.informatik.htw-dresden.de/~toll/dbs2/', 
'dbs2015',
'dresden'
 );

UPDATE FACH 
SET LINK = 'https://bildungsportal.sachsen.de/opal/auth/RepositoryEntry/5774409730/CourseNode/92416759259280' 
WHERE ID = 3;
´
CREATE TABLE KalenderGerade(
ID INT PRIMARY KEY NOT NULL,
Zeit TEXT  NULL,
Montag TEXT  NULL,
Dienstag TEXT  NULL,
Mittwoch TEXT  NULL,
Donnerstag TEXT NULL,
Freitag TEXT NULL
);
CREATE TABLE KalenderUngerade(
ID INT PRIMARY KEY NOT NULL,
Zeit TEXT  NULL,
Montag TEXT  NULL,
Dienstag TEXT  NULL,
Mittwoch TEXT  NULL,
Donnerstag TEXT NULL,
Freitag TEXT NULL
);

INSERT INTO KalenderUngerade VALUES 
(1,
'7.30 - 9.00', 
' ', 
'CG/V Pr, 
Z 701', 
' ',
' ',
'DBS Pr, 
Z 354 - Toll'
 );
INSERT INTO KalenderUngerade VALUES 
(2,
'7.30 - 9.00', 
' ', 
'DBS V,  
Z 107', 
'RN/KS Pr, 
S 311.',
'CG/V Ü, 
S 128',
'RN/KS V'
 );



//blablablaTEsTEST