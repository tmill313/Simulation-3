insert into users(auth_id, first_name, last_name)
values($1, $2, $3)
returning *;