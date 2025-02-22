CREATE OR REPLACE FUNCTION get_books_purchased_by_user(p_id_user INT)
RETURNS TABLE (
    id_book INT,
    book_title VARCHAR(200),
    book_author VARCHAR(100),
    book_sale_date TIMESTAMP,
    book_sale_quantity_sold INT,
    book_sale_unit_price NUMERIC(10,2),
    book_total_sale NUMERIC(10,2)
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        b.id_book, 
        b.book_title, 
        b.book_author, 
        bs.book_sale_date, 
        bs.book_sale_quantity_sold, 
        bs.book_sale_unit_price, 
        bs.book_total_sale
    FROM sales_and_books sb
    JOIN book_sale bs ON sb.id_book_sale = bs.id_book_sale
    JOIN book b ON sb.id_book = b.id_book
    WHERE bs.id_user = p_id_user;
END;
$$;



/*
 * Books_sales
 */

CREATE OR REPLACE PROCEDURE insert_sales_and_books(
    p_id_book INT,
    p_id_book_sale INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO sales_and_books (id_book, id_book_sale)
    VALUES (p_id_book, p_id_book_sale);
END;
$$;

CREATE OR REPLACE FUNCTION get_sales_and_books()
RETURNS TABLE (
    id_book INT,
    book_title VARCHAR(200),
    id_book_sale INT,
    book_sale_quantity_sold INT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT sb.id_book, b.book_title, sb.id_book_sale, bs.book_sale_quantity_sold
    FROM sales_and_books sb
    JOIN book b ON sb.id_book = b.id_book
    JOIN book_sale bs ON sb.id_book_sale = bs.id_book_sale;
END;
$$;

CREATE OR REPLACE PROCEDURE delete_sales_and_books(
    p_id_book INT,
    p_id_book_sale INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM sales_and_books
    WHERE id_book = p_id_book AND id_book_sale = p_id_book_sale;
END;
$$;

CREATE OR REPLACE PROCEDURE update_sales_and_books(
    p_old_id_book INT,
    p_old_id_book_sale INT,
    p_new_id_book INT,
    p_new_id_book_sale INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verifica si la nueva relación ya existe
    IF EXISTS (
        SELECT 1 FROM sales_and_books 
        WHERE id_book = p_new_id_book AND id_book_sale = p_new_id_book_sale
    ) THEN
        RAISE EXCEPTION 'La nueva relación ya existe en la base de datos.';
    END IF;

    -- Actualiza la relación
    UPDATE sales_and_books 
    SET id_book = p_new_id_book, id_book_sale = p_new_id_book_sale
    WHERE id_book = p_old_id_book AND id_book_sale = p_old_id_book_sale;
END;
$$;

CREATE OR REPLACE FUNCTION get_sales_by_book(p_id_book INT)
RETURNS TABLE (
    id_book_sale INT,
    book_sale_date TIMESTAMP,
    book_sale_quantity_sold INT,
    book_sale_unit_price NUMERIC(10,2),
    book_total_sale NUMERIC(10,2)
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT bs.id_book_sale, bs.book_sale_date, bs.book_sale_quantity_sold, 
           bs.book_sale_unit_price, bs.book_total_sale
    FROM sales_and_books sb
    JOIN book_sale bs ON sb.id_book_sale = bs.id_book_sale
    WHERE sb.id_book = p_id_book;
END;
$$;


CREATE OR REPLACE FUNCTION get_books_by_sale(p_id_book_sale INT)
RETURNS TABLE (
    id_book INT,
    book_title VARCHAR(200),
    book_author VARCHAR(100)
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT b.id_book, b.book_title, b.book_author
    FROM sales_and_books sb
    JOIN book b ON sb.id_book = b.id_book
    WHERE sb.id_book_sale = p_id_book_sale;
END;
$$;



/*
 * Books_Sales
 */
select * from book_sale;

ALTER TABLE book_sale DROP COLUMN IF EXISTS book_total_sale;

ALTER TABLE book_sale 
ADD COLUMN book_total_sale NUMERIC(10,2) 
GENERATED ALWAYS AS (book_sale_quantity_sold * book_sale_unit_price) STORED;

CREATE OR REPLACE FUNCTION get_all_book_sales()
RETURNS TABLE (
    id_book_sale INT,
    id_user INT,
    book_sale_date TIMESTAMP,
    book_sale_quantity_sold INT,
    book_sale_unit_price NUMERIC(10,2),
    book_total_sale NUMERIC(10,2)
) AS $$
BEGIN
    RETURN QUERY SELECT * FROM book_sale;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_book_sale_by_id(p_id_book_sale INT)
RETURNS TABLE (
    id_book_sale INT,
    id_user INT,
    book_sale_date TIMESTAMP,
    book_sale_quantity_sold INT,
    book_sale_unit_price NUMERIC(10,2),
    book_total_sale NUMERIC(10,2)
) AS $$
BEGIN
    RETURN QUERY SELECT * FROM book_sale WHERE id_book_sale = p_id_book_sale;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE insert_book_sale(
    p_id_user INT,
    p_book_sale_quantity_sold INT,
    p_book_sale_unit_price NUMERIC(10,2)
)
AS $$
BEGIN
    -- Validaciones
    IF NOT EXISTS (SELECT 1 FROM users WHERE id_user = p_id_user) THEN
        RAISE EXCEPTION 'El usuario con ID % no existe', p_id_user;
    END IF;

    IF p_book_sale_quantity_sold <= 0 THEN
        RAISE EXCEPTION 'La cantidad vendida debe ser mayor a 0';
    END IF;

    IF p_book_sale_unit_price <= 0 THEN
        RAISE EXCEPTION 'El precio unitario debe ser mayor a 0';
    END IF;

    -- Insertar la venta
    INSERT INTO book_sale (id_user, book_sale_quantity_sold, book_sale_unit_price)
    VALUES (p_id_user, p_book_sale_quantity_sold, p_book_sale_unit_price);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE update_book_sale(
    p_id_book_sale INT,
    p_book_sale_quantity_sold INT,
    p_book_sale_unit_price NUMERIC(10,2)
)
AS $$
BEGIN
    -- Validaciones
    IF NOT EXISTS (SELECT 1 FROM book_sale WHERE id_book_sale = p_id_book_sale) THEN
        RAISE EXCEPTION 'La venta con ID % no existe', p_id_book_sale;
    END IF;

    IF p_book_sale_quantity_sold <= 0 THEN
        RAISE EXCEPTION 'La cantidad vendida debe ser mayor a 0';
    END IF;

    IF p_book_sale_unit_price <= 0 THEN
        RAISE EXCEPTION 'El precio unitario debe ser mayor a 0';
    END IF;

    -- Actualizar la venta
    UPDATE book_sale
    SET book_sale_quantity_sold = p_book_sale_quantity_sold,
        book_sale_unit_price = p_book_sale_unit_price
    WHERE id_book_sale = p_id_book_sale;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE delete_book_sale(p_id_book_sale INT)
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM book_sale WHERE id_book_sale = p_id_book_sale) THEN
        RAISE EXCEPTION 'La venta con ID % no existe', p_id_book_sale;
    END IF;

    DELETE FROM book_sale WHERE id_book_sale = p_id_book_sale;
END;
$$ LANGUAGE plpgsql;




/*
 * Unir Categorias Libro
 */

CREATE OR REPLACE FUNCTION get_books_categories()
RETURNS TABLE (
    id_category INT,
    category_name VARCHAR(255),
    id_book INT,
    book_title VARCHAR(200)
) AS $$
BEGIN
    RETURN QUERY
    SELECT bc.id_category, c.category_name, bc.id_book, b.book_title
    FROM books_category bc
    JOIN category c ON bc.id_category = c.id_category
    JOIN book b ON bc.id_book = b.id_book;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_categories_by_book(p_id_book INT)
RETURNS TABLE (
    id_category INT,
    category_name VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id_category, c.category_name
    FROM books_category bc
    JOIN category c ON bc.id_category = c.id_category
    WHERE bc.id_book = p_id_book;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_books_by_category(p_id_category INT)
RETURNS TABLE (
    id_book INT,
    book_title VARCHAR(200)
) AS $$
BEGIN
    RETURN QUERY
    SELECT b.id_book, b.book_title
    FROM books_category bc
    JOIN book b ON bc.id_book = b.id_book
    WHERE bc.id_category = p_id_category;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE insert_book_category(p_id_category INT, p_id_book INT)
AS $$
BEGIN
    -- Verificar si la categoría y el libro existen
    IF NOT EXISTS (SELECT 1 FROM category WHERE id_category = p_id_category) THEN
        RAISE EXCEPTION 'La categoría con ID % no existe', p_id_category;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM book WHERE id_book = p_id_book) THEN
        RAISE EXCEPTION 'El libro con ID % no existe', p_id_book;
    END IF;

    -- Insertar la relación
    INSERT INTO books_category (id_category, id_book) VALUES (p_id_category, p_id_book);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE delete_book_category(p_id_category INT, p_id_book INT)
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM books_category WHERE id_category = p_id_category AND id_book = p_id_book) THEN
        RAISE EXCEPTION 'La relación categoría % - libro % no existe', p_id_category, p_id_book;
    END IF;

    DELETE FROM books_category WHERE id_category = p_id_category AND id_book = p_id_book;
END;
$$ LANGUAGE plpgsql;


/*
 * categoria
 */
CREATE OR REPLACE FUNCTION get_categories()
RETURNS TABLE (
    id_category INT,
    category_name VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY SELECT c.id_category, c.category_name FROM category c;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_category_by_id(p_id_category INT)
RETURNS TABLE (
    id_category INT,
    category_name VARCHAR(255)
) AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM category WHERE id_category = p_id_category) THEN
        RAISE EXCEPTION 'No se encontró una categoría con el ID %', p_id_category;
    END IF;

    RETURN QUERY SELECT c.id_category, c.category_name FROM category c WHERE c.id_category = p_id_category;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_category_by_id(p_id_category INT)
RETURNS TABLE (
    id_category INT,
    category_name VARCHAR(255)
) AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM category WHERE id_category = p_id_category) THEN
        RAISE EXCEPTION 'No se encontró una categoría con el ID %', p_id_category;
    END IF;

    RETURN QUERY SELECT c.id_category, c.category_name FROM category c WHERE c.id_category = p_id_category;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE insert_category(p_category_name VARCHAR(255))
AS $$
BEGIN
    IF p_category_name IS NULL OR p_category_name = '' THEN
        RAISE EXCEPTION 'El nombre de la categoría no puede estar vacío';
    END IF;

    INSERT INTO category (category_name) VALUES (p_category_name);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE update_category(p_id_category INT, p_category_name VARCHAR(255))
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM category WHERE id_category = p_id_category) THEN
        RAISE EXCEPTION 'No se encontró una categoría con el ID %', p_id_category;
    END IF;

    IF p_category_name IS NULL OR p_category_name = '' THEN
        RAISE EXCEPTION 'El nombre de la categoría no puede estar vacío';
    END IF;

    UPDATE category SET category_name = p_category_name WHERE id_category = p_id_category;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE delete_category(p_id_category INT)
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM category WHERE id_category = p_id_category) THEN
        RAISE EXCEPTION 'No se encontró una categoría con el ID %', p_id_category;
    END IF;

    DELETE FROM category WHERE id_category = p_id_category;
END;
$$ LANGUAGE plpgsql;




/*
 * books
 */


ALTER TABLE book 
ALTER COLUMN id_book SET DATA TYPE INTEGER;


CREATE OR REPLACE FUNCTION get_books()
RETURNS TABLE (
    id_book INT,
    id_publisher INT,
    book_title VARCHAR(200),
    book_author VARCHAR(100),
    book_isbn VARCHAR(13),
    book_publication_year INT,
    book_quantity_available INT,
    book_status VARCHAR(12),
    book_cover_image VARCHAR(500)
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT * FROM book ORDER BY book_title;
END;
$$;

 DROP FUNCTION get_book_by_id(integer)


CREATE OR REPLACE FUNCTION get_book_by_id(p_id_book INT)
RETURNS TABLE (
    id_book INT,
    id_publisher INT,
    book_title VARCHAR(200),
    book_author VARCHAR(100),
    book_isbn VARCHAR(13),
    book_publication_year INT,
    book_quantity_available INT,
    book_status VARCHAR(12),
    book_cover_image VARCHAR(500)
) AS $$
BEGIN
    -- Verifica si el libro existe
    IF NOT EXISTS (SELECT 1 FROM book b WHERE b.id_book = p_id_book) THEN
        RAISE EXCEPTION 'No se encontró un libro con el ID %', p_id_book;
    END IF;

    -- Retorna el libro encontrado
    RETURN QUERY 
    SELECT 
        b.id_book, 
        b.id_publisher, 
        b.book_title, 
        b.book_author, 
        b.book_isbn, 
        b.book_publication_year, 
        b.book_quantity_available, 
        b.book_status, 
        b.book_cover_image
    FROM book b
    WHERE b.id_book = p_id_book;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE PROCEDURE create_book(
    p_id_publisher INT,
    p_book_title VARCHAR(200),
    p_book_author VARCHAR(100),
    p_book_isbn VARCHAR(13),
    p_book_publication_year INT,
    p_book_quantity_available INT,
    p_book_status VARCHAR(12),
    p_book_cover_image VARCHAR(500)
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Validaciones
    IF p_id_publisher IS NULL THEN
        RAISE EXCEPTION 'El ID del publisher no puede ser NULL';
    END IF;
    
    IF p_book_title IS NULL OR TRIM(p_book_title) = '' THEN
        RAISE EXCEPTION 'El título del libro es obligatorio';
    END IF;

    IF p_book_author IS NULL OR TRIM(p_book_author) = '' THEN
        RAISE EXCEPTION 'El autor del libro es obligatorio';
    END IF;

    IF LENGTH(p_book_isbn) > 13 THEN
        RAISE EXCEPTION 'El ISBN no puede tener más de 13 caracteres';
    END IF;

    IF p_book_quantity_available < 0 THEN
        RAISE EXCEPTION 'La cantidad disponible no puede ser negativa';
    END IF;

    -- Inserción de datos SIN id_book (lo genera automáticamente)
    INSERT INTO book (
        id_publisher, book_title, book_author, book_isbn, 
        book_publication_year, book_quantity_available, 
        book_status, book_cover_image
    ) VALUES (
        p_id_publisher, p_book_title, p_book_author, p_book_isbn, 
        p_book_publication_year, p_book_quantity_available, 
        p_book_status, p_book_cover_image
    );
END;
$$;

CREATE OR REPLACE PROCEDURE update_book(
    p_id_book INT,
    p_id_publisher INT,
    p_book_title VARCHAR(200),
    p_book_author VARCHAR(100),
    p_book_isbn VARCHAR(13),
    p_book_publication_year INT,
    p_book_quantity_available INT,
    p_book_status VARCHAR(12),
    p_book_cover_image VARCHAR(500)
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar si el libro existe
    IF NOT EXISTS (SELECT 1 FROM book WHERE id_book = p_id_book) THEN
        RAISE EXCEPTION 'El libro con ID % no existe', p_id_book;
    END IF;

    -- Validaciones
    IF p_id_publisher IS NULL THEN
        RAISE EXCEPTION 'El ID del publisher no puede ser NULL';
    END IF;

    IF p_book_title IS NULL OR TRIM(p_book_title) = '' THEN
        RAISE EXCEPTION 'El título del libro es obligatorio';
    END IF;

    IF p_book_author IS NULL OR TRIM(p_book_author) = '' THEN
        RAISE EXCEPTION 'El autor del libro es obligatorio';
    END IF;

    IF LENGTH(p_book_isbn) > 13 THEN
        RAISE EXCEPTION 'El ISBN no puede tener más de 13 caracteres';
    END IF;

    IF p_book_quantity_available < 0 THEN
        RAISE EXCEPTION 'La cantidad disponible no puede ser negativa';
    END IF;

    -- Actualización de datos
    UPDATE book
    SET 
        id_publisher = p_id_publisher,
        book_title = p_book_title,
        book_author = p_book_author,
        book_isbn = p_book_isbn,
        book_publication_year = p_book_publication_year,
        book_quantity_available = p_book_quantity_available,
        book_status = p_book_status,
        book_cover_image = p_book_cover_image
    WHERE id_book = p_id_book;
END;
$$;

CREATE OR REPLACE PROCEDURE delete_book(p_id_book INT)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Verificar si el libro existe
    IF NOT EXISTS (SELECT 1 FROM book WHERE id_book = p_id_book) THEN
        RAISE EXCEPTION 'El libro con ID % no existe', p_id_book;
    END IF;

    -- Eliminar el libro
    DELETE FROM book WHERE id_book = p_id_book;
END;
$$;


/*
 * Publisher
 */

-- Crear un nuevo publisher
create or replace function create_publisher(p_name varchar, p_address varchar, p_phone varchar, p_email varchar)
returns table (ID_PUBLISHER int, PUBLISHER_NAME varchar, PUBLISHER_ADDRESS varchar, PUBLISHER_PHONE varchar, PUBLISHER_EMAIL varchar) as $$
begin
    -- Verificar si ya existe un publisher con el mismo nombre
    if exists(select 1 from PUBLISHER p where p.PUBLISHER_NAME = p_name) then
        raise exception 'Publisher with the name "%" already exists', p_name;
    end if;

    -- Insertar el nuevo publisher
    insert into PUBLISHER (PUBLISHER_NAME, PUBLISHER_ADDRESS, PUBLISHER_PHONE, PUBLISHER_EMAIL)
    values (p_name, p_address, p_phone, p_email);

    -- Devolver el publisher recién insertado utilizando una referencia explícita
    return query
    select p.ID_PUBLISHER, p.PUBLISHER_NAME, p.PUBLISHER_ADDRESS, p.PUBLISHER_PHONE, p.PUBLISHER_EMAIL
    from PUBLISHER p
    where p.PUBLISHER_NAME = p_name  -- Usar explícitamente el parámetro p_name aquí
    and p.PUBLISHER_ADDRESS = p_address 
    and p.PUBLISHER_PHONE = p_phone 
    and p.PUBLISHER_EMAIL = p_email;
end;
$$ language plpgsql;

-- Obtener todos los publishers
create or replace function get_all_publishers()
returns table (ID_PUBLISHER int, PUBLISHER_NAME varchar, PUBLISHER_ADDRESS varchar, PUBLISHER_PHONE varchar, PUBLISHER_EMAIL varchar) as $$
begin
    return query select * from PUBLISHER;
end;
$$ language plpgsql;

-- Obtener un publisher por su ID
create or replace function get_publisher_by_id(p_id int)
returns table (ID_PUBLISHER int, PUBLISHER_NAME varchar, PUBLISHER_ADDRESS varchar, PUBLISHER_PHONE varchar, PUBLISHER_EMAIL varchar) as $$
begin
    return query 
    select p.ID_PUBLISHER, p.PUBLISHER_NAME, p.PUBLISHER_ADDRESS, p.PUBLISHER_PHONE, p.PUBLISHER_EMAIL
    from PUBLISHER p 
    where p.ID_PUBLISHER = get_publisher_by_id.p_id;
end;
$$ language plpgsql;

-- Actualizar un publisher

create or replace function update_publisher(p_id int, p_name varchar, p_address varchar, p_phone varchar, p_email varchar)
returns table (ID_PUBLISHER int, PUBLISHER_NAME varchar, PUBLISHER_ADDRESS varchar, PUBLISHER_PHONE varchar, PUBLISHER_EMAIL varchar) as $$
begin
    -- Verificar si ya existe otro publisher con el mismo nombre
    if exists(select 1 from PUBLISHER p where p.PUBLISHER_NAME = p_name and p.ID_PUBLISHER != p_id) then
        raise exception 'Publisher with the name "%" already exists', p_name;
    end if;

    -- Actualizar los datos del publisher
    update PUBLISHER p
    set PUBLISHER_NAME = p_name, PUBLISHER_ADDRESS = p_address, PUBLISHER_PHONE = p_phone, PUBLISHER_EMAIL = p_email
    where p.ID_PUBLISHER = p_id;

    -- Devolver el publisher actualizado utilizando referencias explícitas
    return query
    select p.ID_PUBLISHER, p.PUBLISHER_NAME, p.PUBLISHER_ADDRESS, p.PUBLISHER_PHONE, p.PUBLISHER_EMAIL
    from PUBLISHER p
    where p.ID_PUBLISHER = p_id;
end;
$$ language plpgsql;


-- Eliminar un publisher
create or replace function delete_publisher(p_id int)
returns table (ID_PUBLISHER int, PUBLISHER_NAME varchar, PUBLISHER_ADDRESS varchar, PUBLISHER_PHONE varchar, PUBLISHER_EMAIL varchar) as $$
declare
    publisher_record PUBLISHER%rowtype;
begin
    -- Obtener los datos del publisher antes de eliminarlo
    select * into publisher_record
    from PUBLISHER p
    where p.ID_PUBLISHER = p_id;

    -- Verificar si el publisher existe
    if not found then
        raise exception 'Publisher with ID "%" not found', p_id;
    end if;

    -- Verificar si el publisher tiene libros asociados
    if exists(select 1 from BOOK b where b.ID_PUBLISHER = p_id) then
        raise exception 'Cannot delete publisher with associated books';
    end if;

    -- Eliminar el publisher
    delete from PUBLISHER p where p.ID_PUBLISHER = p_id;

    -- Devolver el publisher eliminado
    return query
    select publisher_record.ID_PUBLISHER, publisher_record.PUBLISHER_NAME, publisher_record.PUBLISHER_ADDRESS, publisher_record.PUBLISHER_PHONE, publisher_record.PUBLISHER_EMAIL;
end;
$$ language plpgsql;

-- Verificar si existe algún libro asociado a un publisher específico
create or replace function check_books_for_publisher(p_id int)
returns boolean as $$
declare
    book_count int;
begin
    select count(*) into book_count from BOOK where ID_PUBLISHER = p_id;
    return book_count > 0;
end;
$$ language plpgsql;




















/*
 * Usuarios
 */


create or replace function get_data_users()
returns table(id_user int, id_user_role int,user_fullname varchar,user_email varchar,user_password varchar, user_phone varchar, user_registration_date date, id_firebase varchar)
language plpgsql
as $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM  "USER";
END;
$$;

create or replace procedure insert_data_user(new_id_user_role int,new_user_fullname varchar,new_user_email varchar,new_user_password varchar, new_user_phone varchar, new_id_firebase VARCHAR)
language sql 
as $$
	Insert into "USER"(id_user_role,user_fullname,user_email,user_password,user_phone,user_registration_date,ID_Firebase)
	values (new_id_user_role,new_user_fullname,new_user_email,new_user_password,new_user_phone,NOW(),new_id_firebase);
$$;


Insert into "USER"(id_user_role,user_fullname,user_email,user_password,user_phone,user_registration_date)
	values (1,'admin','admin@admin.com','adminadmin123','0987654321',NOW());


ALTER TABLE "USER"
ADD CONSTRAINT user_password_unique UNIQUE (user_password);

create or replace procedure update_data_user(id int, new_id_user_role int,new_user_fullname varchar,new_user_password varchar, new_user_phone varchar)
language sql 
as $$
	UPDATE "USER"
	SET 
	    id_user_role = new_id_user_role,
	    user_fullname = new_user_fullname,
	    user_password = new_user_password,
	    user_phone = new_user_phone
	WHERE id_user = id;
$$;

create or replace function does_user_exist(id INT) 
returns BOOLEAN 
language plpgsql 
as $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM "USER" 
        WHERE id_user = id
    );
END;
$$;

ALTER TABLE "USER" DROP CONSTRAINT user_password_unique;

create or replace procedure delete_data_user(id int)
language sql 
as $$
	delete from "USER"
	where id_user=id;
$$;

select * from "USER"


ALTER TABLE "USER" ADD CONSTRAINT unique_user_email UNIQUE (user_email);


ALTER TABLE "USER" ADD COLUMN ID_Firebase VARCHAR(255);

ALTER TABLE "USER" ADD CONSTRAINT unique_id_firebase UNIQUE (ID_Firebase);

DROP FUNCTION get_user_by_id(integer)

CREATE OR REPLACE FUNCTION get_user_by_id(p_user_id INT)
RETURNS TABLE(
    id_user INT, 
    id_user_role INT, 
    user_fullname VARCHAR, 
    user_email VARCHAR, 
    user_password VARCHAR, 
    user_phone VARCHAR, 
    user_registration_date DATE, 
    ID_Firebase VARCHAR
) 
LANGUAGE plpgsql
AS $$  
BEGIN  
    RETURN QUERY  
    SELECT  *
    FROM "USER" u
    WHERE u.id_user = p_user_id;
END;  
$$;


select * from get_user_by_firebase_id('123');

CREATE OR REPLACE FUNCTION get_user_by_firebase_id(firebase_id VARCHAR)
RETURNS TABLE(
    id_user INT, 
    id_user_role INT, 
    user_fullname VARCHAR, 
    user_email VARCHAR, 
    user_password VARCHAR, 
    user_phone VARCHAR, 
    user_registration_date DATE, 
    ID_Firebase VARCHAR
) 
LANGUAGE plpgsql
AS $$  
BEGIN  
    RETURN QUERY  
    SELECT *
    FROM "USER" u
    WHERE u.id_firebase = firebase_id;
END;  
$$;


create database banca_movil;
























/*
 * 
 * Usuario Roles
 * 
 */
create or replace procedure insert_data_role(role_name varchar)
language sql 
as $$
	Insert into user_role(user_role_name) values (role_name);
$$;

create or replace procedure update_data(id int,newRole varchar)
language sql 
as $$
	update user_role
	set user_role_name=newRole
	where id_user_role=id;
$$;

create or replace procedure delete_data(id int)
language sql 
as $$
	delete from user_role
	where id_user_role=id;
$$;

create or replace function does_user_role_exist(role_id INT) 
returns BOOLEAN 
language plpgsql 
as $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM user_role 
        WHERE id_user_role = role_id
    );
END;
$$;

create or replace function get_data_roles()
returns table(id_user_role int, user_role_name varchar)
language plpgsql
as $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM  user_role;
END;
$$;

call insert_data('administrador');
call insert_data('bibliotecario');
call insert_data('usuario');






