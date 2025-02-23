-- public."USER" definition

-- Drop table

-- DROP TABLE public."USER";

CREATE TABLE public."USER" (
	id_user serial4 NOT NULL,
	id_user_role int4 NOT NULL,
	user_fullname varchar(150) NOT NULL,
	user_email varchar(100) NOT NULL,
	user_password varchar(16) NOT NULL,
	user_phone varchar(10) NULL,
	user_registration_date date NOT NULL,
	id_firebase varchar(255) NULL,
	CONSTRAINT pk_user PRIMARY KEY (id_user),
	CONSTRAINT unique_id_firebase UNIQUE (id_firebase),
	CONSTRAINT unique_user_email UNIQUE (user_email),
	CONSTRAINT fk_user_has3_user_rol FOREIGN KEY (id_user_role) REFERENCES public.user_role(id_user_role) ON DELETE RESTRICT ON UPDATE RESTRICT
);
CREATE INDEX has3_fk ON public."USER" USING btree (id_user_role);
CREATE UNIQUE INDEX user_pk ON public."USER" USING btree (id_user);


-- public.book definition

-- Drop table

-- DROP TABLE public.book;

CREATE TABLE public.book (
	id_book serial4 NOT NULL,
	id_publisher int4 NOT NULL,
	book_title varchar(200) NOT NULL,
	book_author varchar(100) NOT NULL,
	book_isbn varchar(13) NOT NULL,
	book_publication_year int4 NULL,
	book_quantity_available int4 NOT NULL,
	book_status varchar(12) NOT NULL,
	book_cover_image varchar(500) NOT NULL,
	book_price numeric(10, 2) NOT NULL,
	CONSTRAINT pk_book primary key (id_book),
	CONSTRAINT fk_book_possess2_publishe FOREIGN KEY (id_publisher) REFERENCES public.publisher(id_publisher) ON DELETE RESTRICT ON UPDATE RESTRICT
);
CREATE UNIQUE INDEX book_pk ON public.book (id_book int4_ops);
CREATE INDEX possess2_fk ON public.book USING btree (id_publisher);

-- public.book_sale definition

-- Drop table

-- DROP TABLE public.book_sale;

CREATE TABLE public.book_sale (
	id_book_sale serial4 NOT NULL,
	id_user int4 NOT NULL,
	book_sale_date date NOT NULL,
	book_sale_quantity_sold int4 NOT NULL,
	book_sale_unit_price money NOT NULL,
	book_total_sale money NOT NULL,
	CONSTRAINT pk_book_sale PRIMARY KEY (id_book_sale),
	CONSTRAINT fk_book_sal_has2_user FOREIGN KEY (id_user) REFERENCES public."USER"(id_user) ON DELETE RESTRICT ON UPDATE RESTRICT
);
CREATE UNIQUE INDEX book_sale_pk ON public.book_sale USING btree (id_book_sale);
CREATE INDEX has2_fk ON public.book_sale USING btree (id_user);


-- public.books_category definition

-- Drop table

-- DROP TABLE public.books_category;

CREATE TABLE public.books_category (
	id_category int4 NOT NULL,
	id_book int4 NOT NULL,
	CONSTRAINT pk_books_category PRIMARY KEY (id_category, id_book),
	CONSTRAINT fk_books_ca_possess3_book FOREIGN KEY (id_book) REFERENCES public.book(id_book) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_books_ca_possess_category FOREIGN KEY (id_category) REFERENCES public.category(id_category) ON DELETE RESTRICT ON UPDATE RESTRICT
);
CREATE UNIQUE INDEX books_category_pk ON public.books_category USING btree (id_category, id_book);
CREATE INDEX possess3_fk ON public.books_category USING btree (id_book);
CREATE INDEX possess_fk ON public.books_category USING btree (id_category);


-- public.category definition

-- Drop table

-- DROP TABLE public.category;

CREATE TABLE public.category (
	id_category serial4 NOT NULL,
	category_name varchar(50) NOT NULL,
	CONSTRAINT pk_category PRIMARY KEY (id_category)
);
CREATE UNIQUE INDEX category_pk ON public.category USING btree (id_category);


-- public.publisher definition

-- Drop table

-- DROP TABLE public.publisher;

CREATE TABLE public.publisher (
	id_publisher serial4 NOT NULL,
	publisher_name varchar(100) NOT NULL,
	publisher_address varchar(200) NOT NULL,
	publisher_phone varchar(15) NULL,
	publisher_email varchar(100) NULL,
	CONSTRAINT pk_publisher PRIMARY KEY (id_publisher)
);
CREATE UNIQUE INDEX publisher_pk ON public.publisher USING btree (id_publisher);

-- public.sales_and_books definition

-- Drop table

-- DROP TABLE public.sales_and_books;

CREATE TABLE public.sales_and_books (
	id_book int4 NOT NULL,
	id_book_sale int4 NOT NULL,
	CONSTRAINT pk_sales_and_books PRIMARY KEY (id_book, id_book_sale),
	CONSTRAINT fk_sales_an_has4_book_sal FOREIGN KEY (id_book_sale) REFERENCES public.book_sale(id_book_sale) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_sales_an_has_book FOREIGN KEY (id_book) REFERENCES public.book(id_book) ON DELETE RESTRICT ON UPDATE RESTRICT
);
CREATE INDEX has4_fk ON public.sales_and_books USING btree (id_book_sale);
CREATE INDEX has_fk ON public.sales_and_books USING btree (id_book);
CREATE UNIQUE INDEX sales_and_books_pk ON public.sales_and_books USING btree (id_book, id_book_sale);


-- public.user_role definition

-- Drop table

-- DROP TABLE public.user_role;

CREATE TABLE public.user_role (
	id_user_role serial4 NOT NULL,
	user_role_name varchar(50) NOT NULL,
	CONSTRAINT pk_user_role PRIMARY KEY (id_user_role)
);
CREATE UNIQUE INDEX user_role_pk ON public.user_role USING btree (id_user_role);