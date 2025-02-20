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