-- Crear un nuevo publisher
create or replace function create_publisher(p_name varchar, p_address varchar, p_phone varchar, p_email varchar)
returns void as $$
begin
    insert into PUBLISHER (PUBLISHER_NAME, PUBLISHER_ADDRESS, PUBLISHER_PHONE, PUBLISHER_EMAIL)
    values (p_name, p_address, p_phone, p_email);
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
returns void as $$
begin
    update PUBLISHER
    set PUBLISHER_NAME = p_name, PUBLISHER_ADDRESS = p_address, PUBLISHER_PHONE = p_phone, PUBLISHER_EMAIL = p_email
    where ID_PUBLISHER = p_id;
end;
$$ language plpgsql;

-- Eliminar un publisher
create or replace function delete_publisher(p_id int)
returns void as $$
begin
    delete from PUBLISHER where ID_PUBLISHER = p_id;
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