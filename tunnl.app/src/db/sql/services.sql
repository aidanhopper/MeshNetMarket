/* @name getServicesByEmail */
SELECT *
FROM services
WHERE user_id = (
    SELECT user_id
    FROM users
    WHERE email = :email
)
ORDER BY created DESC;

/* @name insertServiceByEmail */
INSERT INTO services (
    user_id,
    slug, 
    name,
    ziti_id,
    protocol 
) VALUES (
    (SELECT id FROM users WHERE email = :email),
    :slug,
    :name,
    :ziti_id,
    :protocol
);

/* @name deleteServiceByNameAndEmail */
DELETE FROM services
WHERE user_id = (
    SELECT id
    FROM users 
    WHERE email = :email
) AND name = :name;

/* @name getServiceBySlug */
SELECT *
FROM services
WHERE slug = :slug;

/* @name getServiceByNameAndEmail */
SELECT *
FROM services
WHERE user_id = (
    SELECT id
    FROM users
    WHERE email = :email
) AND name = :name;

/* @name getUserAndServiceByServiceSlug */
SELECT
    users.id AS user_id,
    services.id AS service_id,
    services.slug AS service_slug,
    users.email AS email
FROM services
JOIN users ON users.id = services.user_id
WHERE services.slug = :slug
LIMIT 1;
