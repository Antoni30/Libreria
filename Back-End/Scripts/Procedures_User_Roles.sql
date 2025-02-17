create or replace procedure insert_data(role_name varchar)
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

