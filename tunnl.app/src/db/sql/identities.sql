/* @name insertIdentity */
INSERT INTO identities (
    user_id,
    name,
    slug,
    ziti_id
) VALUES (
    :user_id,
    :name,
    :slug,
    :ziti_id
);

/* @name insertIdentityByEmail */
INSERT INTO identities (
    user_id,
    name,
    slug,
    ziti_id
) VALUES (
    (SELECT id FROM users WHERE email = :email),
    :name,
    :slug,
    :ziti_id
);

/* @name getIdentityById */
SELECT * FROM identities WHERE id = :id;

/* @name getIdentitiesByEmail */
SELECT * 
FROM identities 
WHERE user_id = (
    SELECT id
    FROM users
    WHERE email = :email
)
ORDER BY created DESC;

/* @name getIdentityByNameAndEmail */
SELECT * 
FROM identities 
WHERE user_id = (
    SELECT id
    FROM users
    WHERE email = :email
) AND name = :name;

/* @name deleteIdentityByEmail */
DELETE FROM identities
WHERE user_id = (
    SELECT id
    FROM users
    WHERE email = :email
) AND name = :name;

/* @name getIdentityBySlug */
SELECT * 
FROM identities 
WHERE slug = :slug
LIMIT 1;

/* @name getUserIdentities */
SELECT *
FROM identities
WHERE user_id = :user_id;

/* @name getIdentityByZitiId */
SELECT *
FROM identities
WHERE ziti_id = :ziti_id;
