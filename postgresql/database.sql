create database traversify;

create table users(
    user_id uuid primary key default 
    uuid_generate_v4(),
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    username varchar(20) not null,
    email varchar(100) not null,
    passkey varchar(255) not null
);

create table books(
    book_id uuid primary key default
    uuid_generate_v4(),
    title varchar(100) not null,
    authors text [] not null,
    coverlink varchar,
    descript varchar,
    genres text [],
    pages int not null,
    publishedDate varchar,
    startDate date,
    endDate date
);

insert into books(title, authors, coverlink, descript, genres, pages, publisheddate, publisher, startdate, enddate, user_id) values('A game of thrones', ARRAY['George R.R. Martin'], 'http://books.google.com/books/content?id=3Wf_ffkFQmgC&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'A tale of court intrigues in the land of Seven Kingdoms, a country blessed by golden summers that go on for years, and cursed by cruel winters that can last a generation. Treachery, murder, incest.', ARRAY['Fiction'], 801, '2011', 'HarperCollinsUK', null, null, '4b201558-ffa7-4898-90cd-443e164c089f');